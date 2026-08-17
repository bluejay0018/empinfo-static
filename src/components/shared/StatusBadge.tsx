import type { ReportStatus } from '../../types';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: ReportStatus;
  showDot?: boolean;
}

export const STATUS_LABELS: Record<ReportStatus, string> = {
  'new':                'New',
  'pending':            'Pending',
  'filled':             'Filled',
  'third-party-filled': '3rd Party Filled',
};

const CSS_CLASS: Record<ReportStatus, string> = {
  'new':                'new',
  'pending':            'pending',
  'filled':             'filled',
  'third-party-filled': 'thirdPartyFilled',
};

export default function StatusBadge({ status, showDot = false }: StatusBadgeProps) {
  const cls = CSS_CLASS[status] ?? 'pending';
  return (
    <span className={`${styles.badge} ${styles[cls]}`}>
      {showDot && <span className={styles.dot} />}
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
