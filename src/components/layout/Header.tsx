import { SunIcon, MoonIcon } from '../Icons/icons';
import styles from './Header.module.css';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div />
      <button
        className={styles.darkModeToggle}
        onClick={onToggleDarkMode}
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
