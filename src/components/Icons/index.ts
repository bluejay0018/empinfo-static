/**
 * Icons Module
 * Exports both specific icon components and the dynamic Icon component
 */

// Dynamic Icon Component (Recommended for new code)
export { Icon, default } from './Icon';

// Icon Registry utilities
export { iconRegistry, registerIcon, getAvailableIcons, hasIcon } from './iconRegistry';
export type { IconName } from './iconRegistry';

// Specific Icon Components (Backward compatibility)
export * from './icons';
