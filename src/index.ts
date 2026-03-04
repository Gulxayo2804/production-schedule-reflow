import { ReflowService } from "./reflow/reflow.service";
import { basicDependencyScenario } from "./scenarios/scenario-basic-dependency";

const service = new ReflowService();

const result = service.reflow(basicDependencyScenario);

console.log("Sorted Work Orders:");
for (const wo of result.updatedWorkOrders) {
  console.log(
    wo.docId,
    "Start:", wo.data.startDate,
    "End:", wo.data.endDate
  );
}

console.log("Changes:", result.changes);