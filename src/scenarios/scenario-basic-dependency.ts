import { ReflowInput } from "../reflow/types";

export const basicDependencyScenario: ReflowInput = {
  workCenters: [
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
        maintenanceWindows: []
      }
    }
  ],
  manufacturingOrders: [],
  workOrders: [
    {
      docId: "wo-A",
      docType: "workOrder",
      data: {
        workOrderNumber: "A",
        manufacturingOrderId: "mo-1",
        workCenterId: "wc-1",
        startDate: "2024-07-29T08:00:00Z",
        endDate: "2024-07-29T08:00:00Z",
        durationMinutes: 120,
        isMaintenance: false,
        dependsOnWorkOrderIds: []
      }
    },
    {
      docId: "wo-B",
      docType: "workOrder",
      data: {
        workOrderNumber: "B",
        manufacturingOrderId: "mo-1",
        workCenterId: "wc-1",
        startDate: "2024-07-29T08:00:00Z",
        endDate: "2024-07-29T08:00:00Z",
        durationMinutes: 120,
        isMaintenance: false,
        dependsOnWorkOrderIds: ["wo-A"]
      }
    }
  ]
};