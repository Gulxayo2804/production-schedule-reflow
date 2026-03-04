import { WorkOrderDocument, WorkCenterDocument } from "./types";

export function validateInput(
  workOrders: WorkOrderDocument[],
  workCenters: WorkCenterDocument[]
) {

  const workCenterIds = new Set(workCenters.map(w => w.docId));
  const workOrderIds = new Set(workOrders.map(w => w.docId));

  for (const order of workOrders) {

    if (!workCenterIds.has(order.data.workCenterId)) {
      throw new Error(
        `Invalid work center reference: ${order.data.workCenterId}`
      );
    }

    for (const dep of order.data.dependsOnWorkOrderIds) {
      if (!workOrderIds.has(dep)) {
        throw new Error(
          `Missing dependency ${dep} for work order ${order.docId}`
        );
      }
    }

  }
}