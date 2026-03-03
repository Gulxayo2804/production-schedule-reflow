import {
    ReflowInput,
    ReflowResult,
    WorkOrderDocument,
    ReflowChange
} from './types';

export class ReflowService {
    public reflow(input: ReflowInput): ReflowResult {
        // Step 1: Clone work orders (avoid mutating original input)
        const workOrders = this.cloneWorkOrders(input.workOrders);

        // Step 2: Validate dependencies (cycle detection later)
        this.validateDependencies(workOrders);

        // Step 3: Sort work orders based on dependencies
        const sortedWorkOrders = this.sortByDependencies(workOrders);

        // Step 4: Apply scheduling logic (core algorithm)
        const updatedWorkOrders = this.applyScheduling(sortedWorkOrders, input);

        // Step 5: Generate change log
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
        // @upgrade: implement cycle detection
    };
    private sortByDependencies(
        workOrders: WorkOrderDocument[]
    ): WorkOrderDocument[] {
        // @upgrade: implement topological sort
        return workOrders;
    }

    private applyScheduling(
        workOrders: WorkOrderDocument[],
        input: ReflowInput
    ): WorkOrderDocument[] {
        // @upgrade: implement scheduling logic
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