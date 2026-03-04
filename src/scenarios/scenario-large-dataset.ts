import { ReflowInput, WorkOrderDocument, WorkCenterDocument, ManufacturingOrderDocument } from "../reflow/types";

export function generateLargeScenario(orderCount = 500): ReflowInput {

  const workCenters: WorkCenterDocument[] = [
    {
      docId: "wc-1",
      docType: "workCenter",
      data: {
        name: "Extrusion Line 1",
        shifts: [
          { dayOfWeek: 1, startHour: 8, endHour: 17 },
          { dayOfWeek: 2, startHour: 8, endHour: 17 },
          { dayOfWeek: 3, startHour: 8, endHour: 17 },
          { dayOfWeek: 4, startHour: 8, endHour: 17 },
          { dayOfWeek: 5, startHour: 8, endHour: 17 }
        ],
        maintenanceWindows: [
          {
            startDate: "2024-07-30T10:00:00Z",
            endDate: "2024-07-30T12:00:00Z",
            reason: "Machine Maintenance"
          }
        ]
      }
    },
    {
      docId: "wc-2",
      docType: "workCenter",
      data: {
        name: "Extrusion Line 2",
        shifts: [
          { dayOfWeek: 1, startHour: 8, endHour: 17 },
          { dayOfWeek: 2, startHour: 8, endHour: 17 },
          { dayOfWeek: 3, startHour: 8, endHour: 17 },
          { dayOfWeek: 4, startHour: 8, endHour: 17 },
          { dayOfWeek: 5, startHour: 8, endHour: 17 }
        ],
        maintenanceWindows: []
      }
    }
  ];

  const manufacturingOrders: ManufacturingOrderDocument[] = [
    {
      docId: "mo-large",
      docType: "manufacturingOrder",
      data: {
        manufacturingOrderNumber: "MO-LARGE",
        itemId: "Pipe-500",
        quantity: 500,
        dueDate: "2024-08-30T00:00:00Z"
      }
    }
  ];

  const workOrders: WorkOrderDocument[] = [];

  const baseStart = new Date("2024-07-29T08:00:00Z");

  for (let i = 0; i < orderCount; i++) {

    const id = `wo-${i}`;

    const dependency =
      i === 0 ? [] : [`wo-${i - 1}`]; // chain dependency

    const start = new Date(baseStart.getTime());

    const duration = 60 + (i % 4) * 30; // 60–150 minutes

    workOrders.push({
      docId: id,
      docType: "workOrder",
      data: {
        workOrderNumber: `WO-${i}`,
        manufacturingOrderId: "mo-large",
        workCenterId: i % 2 === 0 ? "wc-1" : "wc-2",
        startDate: start.toISOString(),
        endDate: start.toISOString(),
        durationMinutes: duration,
        isMaintenance: false,
        dependsOnWorkOrderIds: dependency
      }
    });
  }

  return {
    workOrders,
    workCenters,
    manufacturingOrders
  };
}