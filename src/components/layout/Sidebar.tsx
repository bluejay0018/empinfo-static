import Icon from '../Icons/Icon';
import type { IconName } from '../Icons/iconRegistry';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '../Icons/icons';
import logoExpanded from '../../assets/logo-expanded.svg';
import logoCollapsed from '../../assets/logo-collapsed.svg';
import styles from './Sidebar.module.css';

export type ViewId = 'dashboard' | 'employees' | 'reports' | 'messages' | 'settings';

interface NavItem {
  id: ViewId;
  label: string;
  icon: IconName;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'employees', label: 'Employees', icon: 'users' },
  { id: 'reports', label: 'Reports', icon: 'clipboardList' },
  { id: 'messages', label: 'Messages', icon: 'mail' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

interface SidebarProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export default function Sidebar({ activeView, onNavigate, collapsed, onToggleCollapsed }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.gradientCircle} />

      <div className={styles.logoWrap}>
        <img
          src={collapsed ? logoCollapsed : logoExpanded}
          alt="EmpInfo"
          className={collapsed ? styles.logoCollapsed : styles.logoExpanded}
        />
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeView === item.id ? styles.navItemActive : ''}`}
            onClick={() => onNavigate(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className={styles.navIcon}><Icon name={item.icon} /></span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
          </button>
        ))}
      </nav>

      <button
        className={styles.collapseToggle}
        onClick={onToggleCollapsed}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronDoubleRightIcon /> : <ChevronDoubleLeftIcon />}
        {!collapsed && <span>Collapse</span>}
      </button>
    </aside>
  );
}
