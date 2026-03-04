import { ReflowInput } from "../reflow/types";
import { workOrders, workCenters, manufacturingOrders } from "../sample-data";

export const basicDependencyScenario: ReflowInput = {
  workOrders,
  workCenters,
  manufacturingOrders
};