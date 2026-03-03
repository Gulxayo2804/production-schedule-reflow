# production-schedule-reflow
Production schedule reflow engine handling dependencies, shifts, and maintenance constraints.
Production Schedule Reflow
Overview

This project implements a production schedule reflow algorithm for a manufacturing facility.

When disruptions occur (delays, maintenance, or dependency shifts), the system recalculates work order schedules while respecting operational constraints.

The goal is to generate a valid schedule that satisfies:
    Work center capacity (no overlaps)
    Parent-child dependencies
    Shift boundaries (pause outside working hours)
    Maintenance windows (blocked time)

Core Features
    Dependency-aware scheduling (multiple parents supported)
    Work center conflict resolution
    Shift-based duration calculation (pause/resume logic)
    Maintenance window blocking
    Change tracking (what moved and why)

Tech Stack
    TypeScript
    Node.js
    Luxon (date/time handling)