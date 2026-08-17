import React, { useState, useRef, useEffect } from 'react';
import styles from './Tabs.module.css';
import { ChevronDownIcon, CheckIcon } from '../Icons/icons';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ComponentType;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  /** When true, renders a dropdown fallback for small/narrow viewports (CSS-driven). */
  responsive?: boolean;
  className?: string;
}

const Tabs = ({ tabs, activeTab, onChange, responsive = false, className }: TabsProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMenu]);

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className={`${styles.tabsWrapper} ${responsive ? styles.responsive : ''} ${className ?? ''}`}>
      {/* Regular tab bar */}
      <div className={styles.tabBar}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => onChange(tab.id)}
            >
              {Icon && <Icon />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={styles.tabCount}>{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Dropdown fallback (responsive mode only, shown via CSS) */}
      {responsive && (
        <div className={styles.tabDropdown} ref={menuRef}>
          <button
            className={styles.tabDropdownButton}
            onClick={() => setShowMenu(s => !s)}
          >
            {activeTabData?.icon && <activeTabData.icon />}
            <span>{activeTabData?.label}</span>
            <ChevronDownIcon />
          </button>
          {showMenu && (
            <div className={styles.tabDropdownMenu}>
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    className={`${styles.tabDropdownItem} ${isActive ? styles.tabDropdownItemActive : ''}`}
                    onClick={() => { onChange(tab.id); setShowMenu(false); }}
                  >
                    {Icon && <Icon />}
                    <span>{tab.label}</span>
                    {isActive && <CheckIcon />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tabs;
