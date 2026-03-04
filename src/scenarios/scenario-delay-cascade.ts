import { basicDependencyScenario } from "./scenario-basic-dependency";

export const delayCascadeScenario = JSON.parse(
  JSON.stringify(basicDependencyScenario)
);

delayCascadeScenario.workOrders.push({
  docId: "wo-C",
  docType: "workOrder",
  data: {
    workOrderNumber: "C",
    manufacturingOrderId: "mo-1",
    workCenterId: "wc-1",
    startDate: "2024-07-29T08:00:00Z",
    endDate: "2024-07-29T08:00:00Z",
    durationMinutes: 300,
    isMaintenance: false,
    dependsOnWorkOrderIds: ["wo-B"]
  }
});