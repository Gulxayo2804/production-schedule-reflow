import { ReflowService } from "./reflow/reflow.service";

import { basicDependencyScenario } from "./scenarios/scenario-basic-dependency";
import { delayCascadeScenario } from "./scenarios/scenario-delay-cascade";
import { shiftBoundaryScenario } from "./scenarios/scenario-shift-boundary";
import { maintenanceConflictScenario } from "./scenarios/scenario-maintenance-conflict";
import { generateLargeScenario } from "./scenarios/scenario-large-dataset";

const service = new ReflowService();

function runScenario(name: string, scenario: any) {
  console.log("\n===============================");
  console.log(`Running Scenario: ${name}`);
  console.log("===============================\n");

  console.time("reflow");

  const result = service.reflow(scenario);

  console.timeEnd("reflow");

  console.log("Total Work Orders:", result.updatedWorkOrders.length);
  console.log("Total Changes:", result.changes.length);

  console.log("\nFirst 10 Results:");

  result.updatedWorkOrders.slice(0, 10).forEach(o => {
    console.log(
      o.docId,
      "Start:", o.data.startDate,
      "End:", o.data.endDate
    );
  });
}

// Demo scenarios
runScenario("Basic Dependency", basicDependencyScenario);
runScenario("Delay Cascade", delayCascadeScenario);
runScenario("Shift Boundary", shiftBoundaryScenario);
runScenario("Maintenance Conflict", maintenanceConflictScenario);

// Large performance test
runScenario("Large Dataset (500 Orders)", generateLargeScenario(500));