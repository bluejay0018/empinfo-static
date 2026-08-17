import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreVerticalIcon } from '../Icons/icons';
import styles from './ActionMenu.module.css';

export interface ActionMenuItem {
  label: string;
  icon: React.ComponentType;
  onClick?: () => void;
}

interface ActionMenuProps {
  items: ActionMenuItem[];
}

export default function ActionMenu({ items }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      const menuWidth = 220;
      const left = Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8);
      setPosition({ top: rect.bottom + 4, left: Math.max(8, left) });
    }

    const handleOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        title="More actions"
      >
        <MoreVerticalIcon />
      </button>

      {open && position && createPortal(
        <div ref={menuRef} className={styles.menu} style={{ top: position.top, left: position.left }}>
          {items.map(item => (
            <button
              key={item.label}
              className={styles.menuItem}
              onClick={() => { item.onClick?.(); setOpen(false); }}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
