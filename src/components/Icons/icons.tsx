/**
 * Font Awesome Icon Components
 * Wrapper components for Font Awesome icons to maintain consistent API
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGrip,
  faUsers,
  faGear,
  faMagnifyingGlass,
  faDownload,
  faPlus,
  faUserPlus,
  faCircleExclamation,
  faArrowTrendUp,
  faArrowTrendDown,
  faFilter,
  faSort,
  faChevronLeft,
  faChevronRight,
  faCheck,
  faBars,
  faAnglesLeft,
  faAnglesRight,
  faXmark,
  faChevronUp,
  faChevronDown,
  faRightToBracket,
  faLocationDot,
  faList,
  faEllipsis,
  faEllipsisVertical,
  faRoute,
  faCode,
  faFolderOpen,
  faUserMinus,
  faClipboardList,
  faShieldHalved,
  faSliders,
  faDollarSign,
  faBan,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFileLines,
  faEnvelope,
  faBell,
  faSun,
  faMoon,
  faCircleCheck,
  faClock,
  faMessage,
  faEye,
  faNoteSticky
} from '@fortawesome/free-regular-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

// Type for icon component props (omitting icon since we provide it)
type IconProps = Omit<FontAwesomeIconProps, 'icon'>;

// Dashboard and Navigation
export const DashboardIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faGrip} {...props} />
);

export const UsersIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faUsers} {...props} />
);

export const FileTextIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faFileLines} {...props} />
);

export const MailIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faEnvelope} {...props} />
);

export const SettingsIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faGear} {...props} />
);

// Topbar Icons
export const BellIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faBell} {...props} />
);

export const SearchIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faMagnifyingGlass} {...props} />
);

export const SunIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faSun} {...props} />
);

export const MoonIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faMoon} {...props} />
);

export const MenuIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faBars} {...props} />
);

export const LogoutIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faRightToBracket} {...props} />
);

// Action Icons
export const DownloadIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faDownload} {...props} />
);

export const PlusIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faPlus} {...props} />
);

export const UserPlusIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faUserPlus} {...props} />
);

// Status Icons
export const CheckCircleIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faCircleCheck} {...props} />
);

export const ClockIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faClock} {...props} />
);

export const AlertCircleIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faCircleExclamation} {...props} />
);

export const CheckIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faCheck} {...props} />
);

export const XIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faXmark} {...props} />
);

// Trend Icons
export const TrendUpIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faArrowTrendUp} {...props} />
);

export const TrendDownIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faArrowTrendDown} {...props} />
);

// Utility Icons
export const FilterIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faFilter} {...props} />
);

export const SortIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faSort} {...props} />
);

// Chevron Icons
export const ChevronLeftIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faChevronLeft} {...props} />
);

export const ChevronRightIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faChevronRight} {...props} />
);

export const ChevronUpIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faChevronUp} {...props} />
);

export const ChevronDownIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faChevronDown} {...props} />
);

export const ChevronDoubleLeftIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faAnglesLeft} {...props} />
);

export const ChevronDoubleRightIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faAnglesRight} {...props} />
);

// Communication Icons
export const MessageSquareIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faMessage} {...props} />
);

// Other Icons
export const LogInIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faRightToBracket} {...props} />
);

export const EyeIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faEye} {...props} />
);

export const MapPinIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faLocationDot} {...props} />
);

export const ListIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faList} {...props} />
);

export const StickyNoteIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faNoteSticky} {...props} />
);

export const MoreHorizontalIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faEllipsis} {...props} />
);

export const MoreVerticalIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faEllipsisVertical} {...props} />
);

export const RouteIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faRoute} {...props} />
);

export const CodeIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faCode} {...props} />
);

export const FolderOpenIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faFolderOpen} {...props} />
);

export const UserMinusIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faUserMinus} {...props} />
);

export const ClipboardListIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faClipboardList} {...props} />
);

export const ShieldIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faShieldHalved} {...props} />
);

export const DollarSignIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faDollarSign} {...props} />
);

export const SlidersIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faSliders} {...props} />
);

export const GripIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faGrip} {...props} />
);

export const BanIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faBan} {...props} />
);

export const RotateLeftIcon = (props?: IconProps) => (
  <FontAwesomeIcon icon={faRotateLeft} {...props} />
);
