import { ReflowService } from "../reflow/reflow.service";
import { basicDependencyScenario } from "../scenarios/scenario-basic-dependency";
import { shiftBoundaryScenario } from "../scenarios/scenario-shift-boundary";
import { generateLargeScenario } from "../scenarios/scenario-large-dataset";

describe("Reflow Scheduler", () => {

    it("should respect dependency order", () => {

        const service = new ReflowService();

        const result = service.reflow(basicDependencyScenario);

        const orders = result.updatedWorkOrders;

        const A = orders.find(o => o.docId === "wo-A");
        const B = orders.find(o => o.docId === "wo-B");

        expect(new Date(A!.data.endDate).getTime())
            .toBeLessThanOrEqual(new Date(B!.data.startDate).getTime());

    });

});

it("should detect circular dependencies", () => {

    const service = new ReflowService();

    const badScenario = JSON.parse(JSON.stringify(basicDependencyScenario));

    badScenario.workOrders[0].data.dependsOnWorkOrderIds = ["wo-B"];

    expect(() => service.reflow(badScenario)).toThrow();

});

it("should schedule child after parent", () => {

    const service = new ReflowService();

    const result = service.reflow(basicDependencyScenario);

    const A = result.updatedWorkOrders.find(o => o.docId === "wo-A")!;
    const B = result.updatedWorkOrders.find(o => o.docId === "wo-B")!;

    expect(new Date(A.data.endDate).getTime())
        .toBeLessThanOrEqual(new Date(B.data.startDate).getTime());

});

it("should pause work outside shifts", () => {

    const service = new ReflowService();

    const result = service.reflow(shiftBoundaryScenario);

    const job = result.updatedWorkOrders[0];

    expect(job.data.endDate).toBe("2024-07-30T09:00:00.000Z");

});


it("should handle 500+ work orders", () => {

    const service = new ReflowService();

    const scenario = generateLargeScenario(500);

    const result = service.reflow(scenario);

    expect(result.updatedWorkOrders.length).toBe(500);

});