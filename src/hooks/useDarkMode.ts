/**
 * Dark mode hook with localStorage persistence
 * Manages dark mode state and body class manipulation
 */

import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Hook for managing dark mode with persistence
 * @returns Dark mode state and toggle function
 */
export const useDarkMode = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);

  // Update body class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};
