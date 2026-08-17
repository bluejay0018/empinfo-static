/**
 * Date utilities for report calculations
 * Handles the "MMM DD, YYYY" date format used in employer data
 */

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// ── Shared date preset types & logic ─────────────────────────────────────────

export type DatePreset =
  | 'all'
  | 'last7'
  | 'last30'
  | 'last60'
  | 'last90'
  | 'mtd'
  | 'ytd'
  | 'lastMonth'
  | 'lastQuarter'
  | 'last12months'
  | 'custom';

export const PRESET_LABELS: Record<DatePreset, string> = {
  all:          'All Time',
  last7:        'Last 7 Days',
  last30:       'Last 30 Days',
  last60:       'Last 60 Days',
  last90:       'Last 90 Days',
  mtd:          'Month to Date',
  ytd:          'Year to Date',
  lastMonth:    'Last Month',
  lastQuarter:  'Last Quarter',
  last12months: 'Last 12 Months',
  custom:       'Custom Range',
};

export const PRESET_ORDER: DatePreset[] = [
  'all', 'last7', 'last30', 'last60', 'last90',
  'mtd', 'ytd', 'lastMonth', 'lastQuarter', 'last12months',
  'custom',
];

export function getPresetDateRange(
  preset: DatePreset,
  customFrom?: string,
  customTo?: string,
): { start: Date | null; end: Date | null } {
  const today = new Date();
  today.setHours(23, 59, 59, 999); // end of today
  const y = today.getFullYear();
  const m = today.getMonth();

  switch (preset) {
    case 'all': return { start: null, end: null };
    case 'last7': {
      const s = new Date(); s.setDate(s.getDate() - 7); s.setHours(0, 0, 0, 0);
      return { start: s, end: today };
    }
    case 'last30': {
      const s = new Date(); s.setDate(s.getDate() - 30); s.setHours(0, 0, 0, 0);
      return { start: s, end: today };
    }
    case 'last60': {
      const s = new Date(); s.setDate(s.getDate() - 60); s.setHours(0, 0, 0, 0);
      return { start: s, end: today };
    }
    case 'last90': {
      const s = new Date(); s.setDate(s.getDate() - 90); s.setHours(0, 0, 0, 0);
      return { start: s, end: today };
    }
    case 'mtd': return { start: new Date(y, m, 1, 0, 0, 0, 0), end: today };
    case 'ytd': return { start: new Date(y, 0, 1, 0, 0, 0, 0), end: today };
    case 'lastMonth': return {
      start: new Date(y, m - 1, 1, 0, 0, 0, 0),
      end:   new Date(y, m, 0, 23, 59, 59, 999),
    };
    case 'lastQuarter': {
      const qStart = Math.floor(m / 3) * 3;
      return {
        start: new Date(y, qStart - 3, 1, 0, 0, 0, 0),
        end:   new Date(y, qStart, 0, 23, 59, 59, 999),
      };
    }
    case 'last12months': {
      const s = new Date(); s.setFullYear(s.getFullYear() - 1); s.setHours(0, 0, 0, 0);
      return { start: s, end: today };
    }
    case 'custom': return {
      start: customFrom ? (() => { const d = new Date(customFrom); d.setHours(0,0,0,0); return d; })() : null,
      end:   customTo   ? (() => { const d = new Date(customTo);   d.setHours(23,59,59,999); return d; })() : null,
    };
  }
}

/**
 * Parse a date string in "MMM DD, YYYY" format (e.g., "Feb 10, 2026").
 */
export const parseDate = (dateStr: string | null): Date | null => {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
};

/**
 * Calculate the number of calendar days between two dates.
 */
export const daysBetween = (start: Date, end: Date): number => {
  return Math.round(Math.abs(end.getTime() - start.getTime()) / MS_PER_DAY);
};

/**
 * Get the number of elapsed days from a start date to today.
 */
export const daysElapsed = (startDateStr: string): number | null => {
  const start = parseDate(startDateStr);
  if (!start) return null;
  return daysBetween(start, new Date());
};

/**
 * For a completed employer, get the total onboarding duration in days.
 * Duration = last stage completedDate - startDate.
 */
export const getOnboardingDuration = (
  startDateStr: string,
  stageCompletedDates: (string | null)[]
): number | null => {
  const start = parseDate(startDateStr);
  if (!start) return null;

  const completedDates = stageCompletedDates
    .map(d => parseDate(d))
    .filter((d): d is Date => d !== null);

  if (completedDates.length === 0) return null;

  const lastCompleted = new Date(Math.max(...completedDates.map(d => d.getTime())));
  return daysBetween(start, lastCompleted);
};
