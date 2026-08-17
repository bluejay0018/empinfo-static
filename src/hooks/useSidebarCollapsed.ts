/**
 * Sidebar collapse state with localStorage persistence
 */

import { useLocalStorage } from './useLocalStorage';

export const useSidebarCollapsed = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  return useLocalStorage<boolean>('sidebarCollapsed', true);
};
