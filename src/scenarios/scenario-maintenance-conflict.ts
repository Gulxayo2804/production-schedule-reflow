import { ReflowInput } from "../reflow/types";

export const maintenanceConflictScenario: ReflowInput = {
  workCenters: [
    {
      docId: "wc-1",
      docType: "workCenter",
      data: {
        name: "Extrusion Line",
        shifts: [
          { dayOfWeek: 1, startHour: 8, endHour: 17 }
        ],
        maintenanceWindows: [
          {
            startDate: "2024-07-29T10:00:00Z",
            endDate: "2024-07-29T12:00:00Z"
          }
        ]
      }
    }
  ],
  manufacturingOrders: [],
  workOrders: [
    {
      docId: "wo-maint",
      docType: "workOrder",
      data: {
        workOrderNumber: "MAINT",
        manufacturingOrderId: "mo-1",
        workCenterId: "wc-1",
        startDate: "2024-07-29T09:30:00Z",
        endDate: "2024-07-29T09:30:00Z",
        durationMinutes: 120,
        isMaintenance: false,
        dependsOnWorkOrderIds: []
      }
    }
  ]
};