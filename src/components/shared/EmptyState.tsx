import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon?: string;
  title: string;
  hint?: string;
}

export default function EmptyState({ icon, title, hint }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.title}>{title}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
    </div>
  );
}
