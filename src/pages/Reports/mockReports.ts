import type { Report, ReportStatus, ReportType } from '../../types';

const TYPES: ReportType[] = ['Employment Verification', 'Education Verification', 'Background Check', 'Reference Check'];
const STATUSES: ReportStatus[] = ['new', 'pending', 'filled', 'third-party-filled'];
const APPLICANTS = [
  'Maria Gonzalez', 'James Whitfield', 'Priya Natarajan', 'Ethan Cole', 'Sofia Rinaldi',
  'Noah Brennan', 'Aaliyah Johnson', 'Liam Fitzgerald', 'Chen Wei', 'Grace Okafor',
  'Daniel Petrov', 'Isabella Marchetti', 'Kwame Mensah', 'Olivia Bennett', 'Ravi Deshmukh',
  'Hannah Kowalski', 'Lucas Ferreira', 'Amara Diallo', 'Yuki Tanaka', 'Samuel Osei',
];
const EMPLOYERS = [
  'Northgate Logistics', 'Bluepine Retail', 'Vantage Health Group', 'Cedar Ridge Manufacturing',
  'Harborview Financial', 'Silverline Tech', 'Meridian Foods', 'Redwood Construction',
];
const FILLERS = ['Ava Simmons', 'Marcus Lee', 'Rachel Nguyen', 'Tom Baxter'];
const USERS = ['jwhitfield', 'mgonzalez', 'r.nguyen', 't.baxter', 'a.simmons'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

function randomDate2026(seed: number): string {
  const month = MONTHS[seed % MONTHS.length];
  const day = (seed * 7 % 27) + 1;
  return `${month} ${day}, 2026`;
}

function daysAfter(dateStr: string, days: number): string {
  const [month, dayPart, year] = dateStr.replace(',', '').split(' ');
  const d = new Date(`${month} ${dayPart}, ${year}`);
  d.setDate(d.getDate() + days);
  const m = MONTHS[d.getMonth()] ?? d.toLocaleString('en-US', { month: 'short' });
  return `${m} ${d.getDate()}, ${d.getFullYear()}`;
}

export const mockReports: Report[] = Array.from({ length: 24 }, (_, i) => {
  const createdAt = randomDate2026(i + 1);
  return {
    id: `rpt-${i + 1}`,
    reportNumber: `RPT-${(10234 + i).toString()}`,
    referenceNumber: `REF-${(88010 + i * 3).toString()}`,
    applicant: APPLICANTS[i % APPLICANTS.length],
    employer: EMPLOYERS[i % EMPLOYERS.length],
    type: TYPES[i % TYPES.length],
    status: STATUSES[i % STATUSES.length],
    filledBy: FILLERS[i % FILLERS.length],
    user: USERS[i % USERS.length],
    createdAt,
    updatedAt: daysAfter(createdAt, (i % 5) + 1),
  };
});
