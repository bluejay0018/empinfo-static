import { useState } from 'react';
import { PRESET_LABELS, PRESET_ORDER, getPresetDateRange } from '../../utils/dateUtils';
import type { DatePreset } from '../../utils/dateUtils';
import styles from './DateRangeFilter.module.css';

interface DateRangeFilterProps {
  defaultPreset?: DatePreset;
  onChange: (start: Date | null, end: Date | null) => void;
}

export default function DateRangeFilter({
  defaultPreset = 'all',
  onChange,
}: DateRangeFilterProps) {
  const [preset, setPreset] = useState<DatePreset>(defaultPreset);
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const handlePresetChange = (next: DatePreset) => {
    setPreset(next);
    if (next !== 'custom') {
      const { start, end } = getPresetDateRange(next);
      onChange(start, end);
    }
  };

  const handleCustomFrom = (val: string) => {
    setCustomFrom(val);
    const { start, end } = getPresetDateRange('custom', val, customTo);
    onChange(start, end);
  };

  const handleCustomTo = (val: string) => {
    setCustomTo(val);
    const { start, end } = getPresetDateRange('custom', customFrom, val);
    onChange(start, end);
  };

  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={preset}
        onChange={e => handlePresetChange(e.target.value as DatePreset)}
      >
        {PRESET_ORDER.map(p => (
          <option key={p} value={p}>{PRESET_LABELS[p]}</option>
        ))}
      </select>

      {preset === 'custom' && (
        <div className={styles.customRange}>
          <input
            type="date"
            className={styles.dateInput}
            value={customFrom}
            onChange={e => handleCustomFrom(e.target.value)}
          />
          <span className={styles.sep}>→</span>
          <input
            type="date"
            className={styles.dateInput}
            value={customTo}
            onChange={e => handleCustomTo(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
