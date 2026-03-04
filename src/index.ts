import { ReflowService } from "./reflow/reflow.service";
import { basicDependencyScenario } from "./scenarios/scenario-basic-dependency";
import { calculateEndDateWithShifts } from "./utils/date-utils";

const service = new ReflowService();

const result = service.reflow(basicDependencyScenario);

const end = calculateEndDateWithShifts(
  "2024-07-29T16:00:00Z", // Monday 4PM
  120,
  [
    { dayOfWeek: 1, startHour: 8, endHour: 17 },
    { dayOfWeek: 2, startHour: 8, endHour: 17 },
    { dayOfWeek: 3, startHour: 8, endHour: 17 },
    { dayOfWeek: 4, startHour: 8, endHour: 17 },
    { dayOfWeek: 5, startHour: 8, endHour: 17 }
  ]
);

console.log("Shift-aware end:", end);
console.log("Sorted Work Orders:");
for (const wo of result.updatedWorkOrders) {
  console.log(
    wo.docId,
    "Start:", wo.data.startDate,
    "End:", wo.data.endDate
  );
}

console.log("Changes:", result.changes);