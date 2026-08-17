import styles from './StatusBadge.module.css';

type Status = 'pending' | 'in-progress' | 'completed' | 'overdue' | 'blocked';

interface StatusBadgeProps {
  status: Status;
  showDot?: boolean;
}

const LABELS: Record<Status, string> = {
  'pending':     'Pending',
  'in-progress': 'In Progress',
  'completed':   'Completed',
  'overdue':     'Overdue',
  'blocked':     'Blocked',
};

const CSS_CLASS: Record<Status, string> = {
  'pending':     'pending',
  'in-progress': 'inProgress',
  'completed':   'completed',
  'overdue':     'overdue',
  'blocked':     'blocked',
};

export default function StatusBadge({ status, showDot = false }: StatusBadgeProps) {
  const cls = CSS_CLASS[status] ?? 'pending';
  return (
    <span className={`${styles.badge} ${styles[cls]}`}>
      {showDot && <span className={styles.dot} />}
      {LABELS[status] ?? status}
    </span>
  );
}
