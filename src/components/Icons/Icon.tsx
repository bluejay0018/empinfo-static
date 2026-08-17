/**
 * Dynamic Icon Component
 * Flexible icon component that accepts icon names or direct Font Awesome icons
 * Makes adding new icons extremely simple - no wrapper components needed!
 */

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { iconRegistry, type IconName } from './iconRegistry';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconProps extends Omit<FontAwesomeIconProps, 'icon'> {
  /**
   * Icon name from the registry (e.g., 'dashboard', 'settings')
   * OR direct Font Awesome icon definition
   */
  name?: IconName;

  /**
   * Direct Font Awesome icon (alternative to name)
   * Use this to bypass the registry for one-off icons
   */
  icon?: IconDefinition;
}

/**
 * Dynamic Icon Component
 *
 * Usage Examples:
 *
 * 1. Using registry name:
 *    <Icon name="dashboard" />
 *    <Icon name="settings" size="lg" />
 *
 * 2. Using direct FA icon (one-off):
 *    <Icon icon={faRocket} />
 *    <Icon icon={faHeart} color="red" spin />
 *
 * 3. With all Font Awesome props:
 *    <Icon name="dashboard" size="2x" rotation={90} />
 */
export const Icon = ({ name, icon, ...props }: IconProps) => {
  // If direct icon is provided, use it
  if (icon) {
    return <FontAwesomeIcon icon={icon} {...props} />;
  }

  // If name is provided, look it up in registry
  if (name) {
    const registryIcon = iconRegistry[name];
    if (!registryIcon) {
      console.warn(`Icon "${name}" not found in registry. Available icons:`, Object.keys(iconRegistry));
      return null;
    }
    return <FontAwesomeIcon icon={registryIcon} {...props} />;
  }

  console.warn('Icon component requires either "name" or "icon" prop');
  return null;
};

export default Icon;
