import { useMemo, useState } from 'react';
import DataTable from '../../components/shared/DataTable';
import type { ColumnDef } from '../../components/shared/DataTable';
import DateRangeFilter from '../../components/shared/DateRangeFilter';
import StatusBadge, { STATUS_LABELS } from '../../components/shared/StatusBadge';
import ActionMenu from '../../components/shared/ActionMenu';
import { FileTextIcon, BanIcon, DownloadIcon, RotateLeftIcon, ClockIcon, SearchIcon } from '../../components/Icons/icons';
import { parseDate } from '../../utils/dateUtils';
import type { Report, ReportStatus, ReportType } from '../../types';
import { mockReports } from './mockReports';
import styles from './ReportsPage.module.css';

const TYPE_OPTIONS: ReportType[] = ['Employment Verification', 'Education Verification', 'Background Check', 'Reference Check'];
const STATUS_OPTIONS: ReportStatus[] = ['new', 'pending', 'filled', 'third-party-filled'];

// Reports that have actually been filled produce a PDF, so they get the full
// view/download/reverify/audit menu. New/pending reports have no report yet,
// so the only actions are cancelling the order or checking the audit trail.
const FILLED_STATUSES: ReportStatus[] = ['filled', 'third-party-filled'];

type SortField = 'updatedAt' | 'applicant';
const SORT_OPTIONS: { value: string; label: string; field: SortField; dir: 'asc' | 'desc' }[] = [
  { value: 'updated-desc', label: 'Updated (Newest)', field: 'updatedAt', dir: 'desc' },
  { value: 'updated-asc', label: 'Updated (Oldest)', field: 'updatedAt', dir: 'asc' },
  { value: 'applicant-asc', label: 'Applicant (A-Z)', field: 'applicant', dir: 'asc' },
  { value: 'applicant-desc', label: 'Applicant (Z-A)', field: 'applicant', dir: 'desc' },
];

export default function ReportsPage() {
  const [typeFilter, setTypeFilter] = useState<ReportType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');
  const [createdStart, setCreatedStart] = useState<Date | null>(null);
  const [createdEnd, setCreatedEnd] = useState<Date | null>(null);
  const [search, setSearch] = useState('');
  const [sortValue, setSortValue] = useState('updated-desc');

  const activeSort = SORT_OPTIONS.find(o => o.value === sortValue) ?? SORT_OPTIONS[0];

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = mockReports.filter(report => {
      if (typeFilter !== 'all' && report.type !== typeFilter) return false;
      if (statusFilter !== 'all' && report.status !== statusFilter) return false;

      if (createdStart || createdEnd) {
        const created = parseDate(report.createdAt);
        if (!created) return false;
        if (createdStart && created < createdStart) return false;
        if (createdEnd && created > createdEnd) return false;
      }

      if (q) {
        const haystack = `${report.reportNumber} ${report.referenceNumber} ${report.applicant} ${report.employer}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      const av = activeSort.field === 'updatedAt' ? (parseDate(a.updatedAt)?.getTime() ?? 0) : a.applicant;
      const bv = activeSort.field === 'updatedAt' ? (parseDate(b.updatedAt)?.getTime() ?? 0) : b.applicant;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return activeSort.dir === 'asc' ? cmp : -cmp;
    });

    return sorted;
  }, [typeFilter, statusFilter, createdStart, createdEnd, search, activeSort]);

  const columns: ColumnDef<Report>[] = [
    {
      key: 'action',
      header: 'Action',
      sortable: false,
      hideable: false,
      defaultWidth: 90,
      cell: r => (
        <div className={styles.actionCell}>
          {FILLED_STATUSES.includes(r.status) ? (
            <>
              <button className={`${styles.actionBtn} ${styles.actionBtnGreen}`} title="View Report PDF">
                <FileTextIcon />
              </button>
              <ActionMenu
                items={[
                  { label: 'Download Report PDF', icon: DownloadIcon },
                  { label: 'Reverify Report', icon: RotateLeftIcon },
                  { label: 'View Audit Log', icon: ClockIcon },
                ]}
              />
            </>
          ) : (
            <>
              <button className={`${styles.actionBtn} ${styles.actionBtnRed}`} title="Cancel Order">
                <BanIcon />
              </button>
              <ActionMenu
                items={[
                  { label: 'View Audit Log', icon: ClockIcon },
                ]}
              />
            </>
          )}
        </div>
      ),
    },
    { key: 'reportNumber', header: 'Report #', cell: r => r.reportNumber },
    { key: 'referenceNumber', header: 'Reference #', cell: r => r.referenceNumber },
    { key: 'applicant', header: 'Applicant', cell: r => r.applicant },
    { key: 'employer', header: 'Employer', cell: r => r.employer, defaultWidth: 200 },
    { key: 'status', header: 'Status', cell: r => <StatusBadge status={r.status} /> },
    { key: 'filledBy', header: 'Filled By', cell: r => r.filledBy },
    { key: 'user', header: 'User', cell: r => r.user },
    { key: 'updatedAt', header: 'Updated', cell: r => r.updatedAt },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Reports</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Type</label>
            <select className={styles.select} value={typeFilter} onChange={e => setTypeFilter(e.target.value as ReportType | 'all')}>
              <option value="all">All</option>
              {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Created</label>
            <DateRangeFilter onChange={(start, end) => { setCreatedStart(start); setCreatedEnd(end); }} />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Status</label>
            <select className={styles.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value as ReportStatus | 'all')}>
              <option value="all">All</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </div>

          <div className={styles.searchWrap}>
            <SearchIcon />
            <input
              className={styles.searchInput}
              placeholder="Search by report #, applicant, employer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select className={styles.select} value={sortValue} onChange={e => setSortValue(e.target.value)} title="Sort">
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          <button className={styles.exportBtn} title="Export (coming soon)">
            Export
            <DownloadIcon />
          </button>
        </div>

        <DataTable
          columns={columns}
          rows={filteredRows}
          rowKey={r => r.id}
          storageKey="reportsTable"
        />
      </div>
    </div>
  );
}
