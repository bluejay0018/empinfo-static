import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  tooltip?: string;
  color?: 'blue' | 'green' | 'orange' | 'red';
  icon?: React.ReactNode;
  iconColor?: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  onClick?: () => void;
  active?: boolean;
  trend?: { value: number; label?: string };
}

const ICON_COLOR_MAP: Record<string, string> = {
  blue: styles.iconBlue,
  green: styles.iconGreen,
  orange: styles.iconOrange,
  red: styles.iconRed,
  purple: styles.iconPurple,
};

export default function StatCard({ label, value, subtext, tooltip, icon, iconColor, onClick, active, trend }: StatCardProps) {
  return (
    <div
      className={`${styles.statBox}${onClick ? ` ${styles.clickable}` : ''}${active ? ` ${styles.active}` : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      <div className={styles.cardHeader}>
        <div className={styles.statLabel}>
          {label}
          {tooltip && (
            <span className={styles.tooltipIcon} title={tooltip} aria-label={tooltip}>?</span>
          )}
        </div>
        {icon && (
          <div className={`${styles.iconCircle} ${iconColor ? ICON_COLOR_MAP[iconColor] || '' : ''}`}>
            {icon}
          </div>
        )}
      </div>
      <div className={styles.statValue}>{value}</div>
      {trend && (
        <div className={`${styles.trend} ${trend.value >= 0 ? styles.trendUp : styles.trendDown}`}>
          <span>{trend.value >= 0 ? '▲' : '▼'}</span>
          {Math.abs(trend.value).toFixed(1)}%
          {trend.label && <span className={styles.trendLabel}>{trend.label}</span>}
        </div>
      )}
      {subtext && <div className={styles.statSubtext}>{subtext}</div>}
    </div>
  );
}
