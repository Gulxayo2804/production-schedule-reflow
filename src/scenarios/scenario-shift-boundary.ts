import { ReflowInput } from "../reflow/types";

export const shiftBoundaryScenario: ReflowInput = {
    workCenters: [
        {
            docId: "wc-1",
            docType: "workCenter",
            data: {
                name: "Extrusion Line",
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
            docId: "wo-shift",
            docType: "workOrder",
            data: {
                workOrderNumber: "SHIFT",
                manufacturingOrderId: "mo-1",
                workCenterId: "wc-1",
                startDate: "2024-07-29T16:00:00Z",
                endDate: "2024-07-29T16:00:00Z",
                durationMinutes: 120,
                isMaintenance: false,
                dependsOnWorkOrderIds: []
            }
        }
    ]
};