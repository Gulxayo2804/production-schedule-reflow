import {
  WorkOrderDocument,
  WorkCenterDocument,
  ManufacturingOrderDocument
} from "./reflow/types";

export const workCenters: WorkCenterDocument[] = [
  {
    docId: "wc-1",
    docType: "workCenter",
    data: {
      name: "Extrusion Line 1",
      shifts: [
        { dayOfWeek: 1, startHour: 8, endHour: 17 }, // Monday
        { dayOfWeek: 2, startHour: 8, endHour: 17 }, // Tuesday
        { dayOfWeek: 3, startHour: 8, endHour: 17 },
        { dayOfWeek: 4, startHour: 8, endHour: 17 },
        { dayOfWeek: 5, startHour: 8, endHour: 17 }
      ],
      maintenanceWindows: [
        {
          startDate: "2024-07-29T11:00:00Z",
          endDate: "2024-07-29T13:00:00Z"
        }
      ]
    }
  }
];

export const manufacturingOrders: ManufacturingOrderDocument[] = [
  {
    docId: "mo-1",
    docType: "manufacturingOrder",
    data: {
      manufacturingOrderNumber: "MO-001",
      itemId: "Pipe-100",
      quantity: 100,
      dueDate: "2024-07-30T00:00:00Z"
    }
  }
];

export const workOrders: WorkOrderDocument[] = [
  {
    docId: "wo-A",
    docType: "workOrder",
    data: {
      workOrderNumber: "A",
      manufacturingOrderId: "mo-1",
      workCenterId: "wc-1",
      startDate: "2024-07-29T08:00:00Z",
      endDate: "2024-07-29T10:00:00Z",
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
      startDate: "2024-07-29T10:00:00Z",
      endDate: "2024-07-29T12:00:00Z",
      durationMinutes: 120,
      isMaintenance: false,
      dependsOnWorkOrderIds: ["wo-A"]
    }
  },
  {
    docId: "wo-C",
    docType: "workOrder",
    data: {
      workOrderNumber: "C",
      manufacturingOrderId: "mo-1",
      workCenterId: "wc-1",
      startDate: "2024-07-29T12:00:00Z",
      endDate: "2024-07-29T14:00:00Z",
      durationMinutes: 120,
      isMaintenance: false,
      dependsOnWorkOrderIds: ["wo-B"]
    }
  }
];