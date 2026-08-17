import styles from './FilterChip.module.css';

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export default function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className={styles.chip}>
      {label}
      <button
        className={styles.remove}
        onClick={onRemove}
        aria-label={`Remove filter: ${label}`}
      >
        ✕
      </button>
    </span>
  );
}
