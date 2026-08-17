import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'green' | 'orange' | 'red' | 'purple'
           | 'teal' | 'amber' | 'indigo' | 'lime' | 'sky' | 'rose' | 'cyan' | 'violet' | 'slate';
  className?: string;
}

const Badge = ({ children, variant = 'default', className }: BadgeProps) => (
  <span className={`${styles.badge} ${styles[variant]} ${className ?? ''}`}>
    {children}
  </span>
);

export default Badge;
