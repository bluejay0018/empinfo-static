import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Drawer.module.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultWidth?: number;
  minWidth?: number;
  children: React.ReactNode;
}

const Drawer = ({ isOpen, onClose, defaultWidth = 550, minWidth = 400, children }: DrawerProps) => {
  const [drawerWidth, setDrawerWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);

  // Escape key + scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Drag-to-resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX - 20;
      const maxWidth = window.innerWidth - 100;
      setDrawerWidth(Math.min(Math.max(newWidth, minWidth), maxWidth));
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth]);

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return createPortal(
    <div className={`${styles.drawerWrapper} ${isOpen ? styles.open : ''}`}>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}
      <div className={styles.drawer} style={{ width: `${drawerWidth}px` }}>
        <div
          className={styles.resizeHandle}
          onMouseDown={handleResizeStart}
          role="separator"
          aria-label="Resize drawer"
        />
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close drawer">
          &times;
        </button>
        <div className={styles.drawerContent}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Drawer;
