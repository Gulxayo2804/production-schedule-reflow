// ===============================
// Base Document Structure
// ===============================

export interface BaseDocument<T> {
  docId: string;
  docType: string;
  data: T;
}

// ===============================
// Work Order
// ===============================

export interface WorkOrderData {
  workOrderNumber: string;
  manufacturingOrderId: string;
  workCenterId: string;

  startDate: string; // ISO string
  endDate: string;   // ISO string
  durationMinutes: number;

  isMaintenance: boolean;

  dependsOnWorkOrderIds: string[];
}

export type WorkOrderDocument = BaseDocument<WorkOrderData>;

// ===============================
// Work Center
// ===============================

export interface Shift {
  dayOfWeek: number; // 0-6 (Sunday = 0)
  startHour: number; // 0-23
  endHour: number;   // 0-23
}

export interface MaintenanceWindow {
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface WorkCenterData {
  name: string;
  shifts: Shift[];
  maintenanceWindows: MaintenanceWindow[];
}

export type WorkCenterDocument = BaseDocument<WorkCenterData>;

// ===============================
// Manufacturing Order
// ===============================

export interface ManufacturingOrderData {
  manufacturingOrderNumber: string;
  itemId: string;
  quantity: number;
  dueDate: string;
}

export type ManufacturingOrderDocument =
  BaseDocument<ManufacturingOrderData>;

// ===============================
// Reflow Input / Output
// ===============================

export interface ReflowInput {
  workOrders: WorkOrderDocument[];
  workCenters: WorkCenterDocument[];
  manufacturingOrders: ManufacturingOrderDocument[];
}

export interface ReflowChange {
  workOrderId: string;
  oldStartDate: string;
  oldEndDate: string;
  newStartDate: string;
  newEndDate: string;
  reason: string;
}

export interface ReflowResult {
  updatedWorkOrders: WorkOrderDocument[];
  changes: ReflowChange[];
  explanation: string[];
}