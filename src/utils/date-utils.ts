import { DateTime } from "luxon";
import { Shift } from "../reflow/types";

export function calculateEndDateWithShifts(
  startISO: string,
  durationMinutes: number,
  shifts: Shift[]
): string|null{

  let current = DateTime.fromISO(startISO, { zone: "utc" });
  let remainingMinutes = durationMinutes;

  while (remainingMinutes > 0) {

    const todayShift = shifts.find(
      s => s.dayOfWeek === current.weekday % 7
    );

    if (!todayShift) {
      current = current.plus({ days: 1 }).startOf("day");
      continue;
    }

    const shiftStart = current.set({
      hour: todayShift.startHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    const shiftEnd = current.set({
      hour: todayShift.endHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    // If before shift start → move to shift start
    if (current < shiftStart) {
      current = shiftStart;
    }

    // If after shift end → move to next day
    if (current >= shiftEnd) {
      current = current.plus({ days: 1 }).startOf("day");
      continue;
    }

    const availableMinutes = Math.floor(
      shiftEnd.diff(current, "minutes").minutes
    );

    const minutesToWork = Math.min(availableMinutes, remainingMinutes);

    current = current.plus({ minutes: minutesToWork });
    remainingMinutes -= minutesToWork;

    if (remainingMinutes > 0) {
      current = current.plus({ days: 1 }).startOf("day");
    }
  }

  return current.toISO();
}