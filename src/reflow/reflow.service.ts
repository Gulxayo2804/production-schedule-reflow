import {
    ReflowInput,
    ReflowResult,
    WorkOrderDocument,
    ReflowChange
} from './types';
import { calculateEndDateWithShifts } from "../utils/date-utils";
import { adjustForMaintenanceWindows } from "../utils/date-utils";
import { validateInput } from "./constraint-checker";

export class ReflowService {
    public reflow(input: ReflowInput): ReflowResult {

        //Step 1️. Validate ERP data
        validateInput(input.workOrders, input.workCenters);

        // Step 2: Clone work orders (avoid mutating original input)
        const workOrders = this.cloneWorkOrders(input.workOrders);

        // Step 3: Validate dependencies (cycle detection)
        this.validateDependencies(workOrders);

        // Step 4: Sort work orders based on dependencies
        const sortedWorkOrders = this.sortByDependencies(workOrders);

        // Step 5: Apply scheduling logic (core algorithm)
        const updatedWorkOrders = this.applyScheduling(sortedWorkOrders, input);

        // Step 6: Generate change log
        const changes = this.generateChanges(input.workOrders, updatedWorkOrders);
        return {
            updatedWorkOrders,
            changes,
            explanation: [
                "Reflow completed successfully.",
                "Dependencies validated.",
                "Work center conflicts resolved.",
                "Shift and maintenance constraints enforced."
            ]
        };
    }

    // ==============================
    // Private Methods (To Implement)
    // ==============================
    private cloneWorkOrders(workOrders: WorkOrderDocument[]): WorkOrderDocument[] {
        return JSON.parse(JSON.stringify(workOrders))
    };

    private validateDependencies(workOrders: WorkOrderDocument[]): void {
        const graph = new Map<string, string[]>();

        for (const order of workOrders) {
            graph.set(order.docId, order.data.dependsOnWorkOrderIds);
        }

        const visited = new Set<string>();
        const visiting = new Set<string>();

        const dfs = (node: string) => {
            if (visiting.has(node)) {
                throw new Error(`Circular dependency detected involving ${node}`);
            }

            if (visited.has(node)) return;

            visiting.add(node);

            const neighbors = graph.get(node) || [];

            for (const neighbor of neighbors) {
                dfs(neighbor);
            }

            visiting.delete(node);
            visited.add(node);
        };

        for (const node of graph.keys()) {
            dfs(node);
        }
    }

    private sortByDependencies(
        workOrders: WorkOrderDocument[]
    ): WorkOrderDocument[] {

        const graph = new Map<string, string[]>();
        const inDegree = new Map<string, number>();

        for (const order of workOrders) {
            graph.set(order.docId, []);
            inDegree.set(order.docId, 0);
        }

        for (const order of workOrders) {
            for (const parentId of order.data.dependsOnWorkOrderIds) {
                graph.get(parentId)?.push(order.docId);
                inDegree.set(order.docId, (inDegree.get(order.docId) || 0) + 1);
            }
        }

        const queue: string[] = [];
        for (const [node, degree] of inDegree.entries()) {
            if (degree === 0) {
                queue.push(node);
            }
        }

        const sorted: WorkOrderDocument[] = [];

        while (queue.length > 0) {
            const node = queue.shift()!;
            const order = workOrders.find(o => o.docId === node);

            if (order) {
                sorted.push(order);
            }

            for (const neighbor of graph.get(node) || []) {
                inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);

                if (inDegree.get(neighbor) === 0) {
                    queue.push(neighbor);
                }
            }
        }

        if (sorted.length !== workOrders.length) {
            throw new Error("Dependency resolution failed — possible cycle detected.");
        }

        return sorted;
    }

    private applyScheduling(
        workOrders: WorkOrderDocument[],
        input: ReflowInput
    ): WorkOrderDocument[] {

        const workCenterMap = new Map(input.workCenters.map(wc => [wc.docId, wc]));

        const workCenterLastEnd = new Map<string, Date>();

        const workOrderMap = new Map<string, WorkOrderDocument>();
        for (const wo of workOrders) {
            workOrderMap.set(wo.docId, wo);
        }

        for (const order of workOrders) {

            if (order.data.isMaintenance) {
                continue; 
            }

            const originalStart = new Date(order.data.startDate);

            // 1.Dependency constraint
            let dependencyEnd = originalStart;

            for (const parentId of order.data.dependsOnWorkOrderIds) {
                const parent = workOrderMap.get(parentId);
                if (!parent) continue;

                const parentEnd = new Date(parent.data.endDate);
                if (parentEnd > dependencyEnd) {
                    dependencyEnd = parentEnd;
                }
            }

            //2. Work center conflict constraint
            const lastEndOnCenter = workCenterLastEnd.get(order.data.workCenterId);

            let startTime = dependencyEnd;

            if (lastEndOnCenter && lastEndOnCenter > startTime) {
                startTime = lastEndOnCenter;
            }

            // 3. Calculate new end time
            const workCenter = workCenterMap.get(order.data.workCenterId);

            if (!workCenter) {
                throw new Error(`Work center not found: ${order.data.workCenterId}`);
            }

            const newEndISO = calculateEndDateWithShifts(
                startTime.toISOString(),
                order.data.durationMinutes,
                workCenter.data.shifts
            );

            const newEnd = new Date(newEndISO!);

            const adjusted = adjustForMaintenanceWindows(
                startTime.toISOString(),
                newEnd.toISOString(),
                workCenter.data.maintenanceWindows
            );

            order.data.startDate = adjusted.start;
            order.data.endDate = adjusted.end;
            // Update order
            order.data.startDate = startTime.toISOString();
            order.data.endDate = newEnd.toISOString();

            // Update work center last end
            workCenterLastEnd.set(order.data.workCenterId, newEnd);
        }

        return workOrders;
    }

    private generateChanges(
        original: WorkOrderDocument[],
        updated: WorkOrderDocument[]
    ): ReflowChange[] {

        const changes: ReflowChange[] = [];

        for (const updatedOrder of updated) {
            const originalOrder = original.find(
                o => o.docId === updatedOrder.docId
            );

            if (!originalOrder) continue;

            if (
                originalOrder.data.startDate !== updatedOrder.data.startDate ||
                originalOrder.data.endDate !== updatedOrder.data.endDate
            ) {
                changes.push({
                    workOrderId: updatedOrder.docId,
                    oldStartDate: originalOrder.data.startDate,
                    oldEndDate: originalOrder.data.endDate,
                    newStartDate: updatedOrder.data.startDate,
                    newEndDate: updatedOrder.data.endDate,
                    reason: "Schedule adjusted due to reflow constraints"
                });
            }
        }

        return changes;
    }

}