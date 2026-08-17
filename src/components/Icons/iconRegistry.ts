/**
 * Icon Registry
 * Central place to register all Font Awesome icons used in the app
 *
 * To add a new icon:
 * 1. Import it from @fortawesome/free-regular-svg-icons (preferred) or @fortawesome/free-solid-svg-icons (fallback)
 * 2. Add it to the iconRegistry object with a friendly name
 * 3. Done! Use it anywhere with <Icon name="yourIconName" />
 */

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  // Dashboard & Navigation (solid only)
  faGrip,
  faUsers,
  faGear,

  // Topbar (solid only)
  faMagnifyingGlass,
  faBars,

  // Actions (solid only)
  faDownload,
  faPlus,
  faUserPlus,

  // Status (solid only)
  faCircleExclamation,
  faCheck,
  faXmark,

  // Trends
  faArrowTrendUp,
  faArrowTrendDown,

  // Utility
  faFilter,
  faSort,

  // Chevrons
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faAnglesLeft,
  faAnglesRight,

  // Other (solid only)
  faRightToBracket,
  faLocationDot,
  faList,
  faEllipsis,
  faRoute,
  faCode,
  faFolderOpen,
  faUserMinus,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import {
  // Dashboard & Navigation (regular)
  faFileLines,
  faEnvelope,

  // Topbar (regular)
  faBell,
  faSun,
  faMoon,

  // Status (regular)
  faCircleCheck,
  faClock,

  // Communication (regular)
  faMessage,

  // Other (regular)
  faEye,
  faNoteSticky,
} from '@fortawesome/free-regular-svg-icons';

/**
 * Icon Registry
 * Maps friendly names to Font Awesome icon definitions
 *
 * Add new icons here to make them available throughout the app
 */
export const iconRegistry = {
  // Dashboard & Navigation
  dashboard: faGrip,
  users: faUsers,
  fileText: faFileLines,
  mail: faEnvelope,
  settings: faGear,

  // Topbar
  bell: faBell,
  search: faMagnifyingGlass,
  sun: faSun,
  moon: faMoon,
  menu: faBars,

  // Actions
  download: faDownload,
  plus: faPlus,
  userPlus: faUserPlus,

  // Status
  checkCircle: faCircleCheck,
  clock: faClock,
  alertCircle: faCircleExclamation,
  check: faCheck,
  x: faXmark,
  close: faXmark, // Alias

  // Trends
  trendUp: faArrowTrendUp,
  trendDown: faArrowTrendDown,

  // Utility
  filter: faFilter,
  sort: faSort,

  // Chevrons
  chevronLeft: faChevronLeft,
  chevronRight: faChevronRight,
  chevronUp: faChevronUp,
  chevronDown: faChevronDown,
  chevronDoubleLeft: faAnglesLeft,
  chevronDoubleRight: faAnglesRight,
  anglesLeft: faAnglesLeft, // Alias
  anglesRight: faAnglesRight, // Alias

  // Communication
  message: faMessage,
  messageSquare: faMessage, // Alias for backward compatibility

  // Other
  login: faRightToBracket,
  eye: faEye,
  mapPin: faLocationDot,
  location: faLocationDot, // Alias
  list: faList,
  stickyNote: faNoteSticky,
  note: faNoteSticky, // Alias
  moreHorizontal: faEllipsis,
  ellipsis: faEllipsis, // Alias

  // Journey Tracker
  route: faRoute,
  code: faCode,
  folderOpen: faFolderOpen,
  userMinus: faUserMinus,
  clipboardList: faClipboardList,
} as const;

// Export type for TypeScript autocomplete
export type IconName = keyof typeof iconRegistry;

/**
 * Helper function to add icons dynamically at runtime
 * Useful for plugins or dynamically loaded features
 */
export const registerIcon = (name: string, icon: IconDefinition): void => {
  (iconRegistry as any)[name] = icon;
};

/**
 * Get all available icon names
 */
export const getAvailableIcons = (): IconName[] => {
  return Object.keys(iconRegistry) as IconName[];
};

/**
 * Check if an icon exists in the registry
 */
export const hasIcon = (name: string): name is IconName => {
  return name in iconRegistry;
};
