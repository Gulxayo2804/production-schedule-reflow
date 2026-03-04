# Production Schedule Reflow Engine

## Overview

This project implements a **production scheduling reflow algorithm** for a manufacturing facility.

When disruptions happen (delays, machine downtime, or dependency changes), the system recalculates work order schedules while respecting operational constraints.

The scheduler ensures that production schedules remain valid and conflict-free.

---

## Features

The algorithm supports the following constraints:

- **Dependency management** (Directed Acyclic Graph scheduling)
- **Work center conflict resolution** (only one job per machine at a time)
- **Shift-aware scheduling** (work pauses outside working hours)
- **Maintenance windows** (machines unavailable during maintenance)
- **Change tracking** (records what moved and why)
- **Large dataset support** (tested with 500+ work orders)

---

## Tech Stack

- **TypeScript**
- **Node.js**
- **Luxon** (date-time handling)
- **Jest** (unit testing)

---

## Project Structure
src/
├── reflow/
│ ├── reflow.service.ts
│ ├── constraint-checker.ts
│ └── types.ts
│
├── utils/
│ └── date-utils.ts
│
├── scenarios/
│ ├── scenario-basic-dependency.ts
│ ├── scenario-delay-cascade.ts
│ ├── scenario-shift-boundary.ts
│ ├── scenario-maintenance-conflict.ts
│ └── scenario-large-dataset.ts
│
├── tests/
│ └── reflow.test.ts
│
└── index.ts


---

## Algorithm Approach

The reflow process follows these steps:

1. **Input validation**
   - Ensure all work centers and dependencies exist

2. **Dependency validation**
   - Detect circular dependencies using DFS

3. **Topological sorting**
   - Determine valid processing order for work orders

4. **Scheduling**
   - Respect dependency completion times
   - Prevent work center conflicts
   - Apply shift boundaries
   - Avoid maintenance windows

5. **Change detection**
   - Track which work orders moved and why

---

## Complexity Analysis

Let **N** be the number of work orders and **E** the number of dependency edges.

### Dependency Validation
Cycle detection using DFS runs in:
O(N + E)

### Topological Sorting
Kahn’s algorithm processes each node and edge once:
O(N + E)

### Scheduling Phase
Each work order is scheduled once and performs constant-time checks for:
- dependency completion
- work center availability
- shift calculations

Overall scheduling complexity:
O(N)

### Overall Complexity
The total complexity of the reflow process is approximately:

O(N + E)

This scales well for large production schedules and was tested with datasets containing 500+ work orders.

## Running the Project

Install dependencies:

    npm install

## Run scheduler:

    npm run dev

## Run unit tests:

    npm test

---

## Example Scenarios

The repository includes several scenarios demonstrating scheduler behavior:

### 1. Basic Dependency
Shows simple dependency ordering between work orders.

### 2. Delay Cascade
A delay in one work order pushes all downstream work orders.

### 3. Shift Boundary
Work pauses outside shift hours and resumes next working day.

### 4. Large Dataset
500+ work orders generated to test scheduler performance.

---

## Future Improvements

Possible improvements include:

- Optimization strategies for minimizing total delay
- Parallel scheduling across work centers
- Visualization of schedules (Gantt charts)
- Additional constraint types

---

## Author

Gulkhayo Khamzaeva