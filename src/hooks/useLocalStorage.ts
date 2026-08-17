/**
 * Generic localStorage hook
 * Manages state synchronized with localStorage
 */

import { useState, useEffect } from 'react';

/**
 * Hook for managing state synchronized with localStorage
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns Current value and setter function
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // Get initial value from localStorage or use provided initialValue
  // Deep-merges stored object with initialValue so new keys in defaults are preserved
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      // Deep merge for nested objects (e.g., segment access matrix)
      if (
        initialValue !== null &&
        typeof initialValue === 'object' &&
        !Array.isArray(initialValue) &&
        typeof parsed === 'object' &&
        !Array.isArray(parsed)
      ) {
        const merged = { ...initialValue } as Record<string, unknown>;
        for (const k of Object.keys(parsed)) {
          const defaultVal = (initialValue as Record<string, unknown>)[k];
          const storedVal = parsed[k];
          if (
            defaultVal !== null &&
            typeof defaultVal === 'object' &&
            !Array.isArray(defaultVal) &&
            typeof storedVal === 'object' &&
            !Array.isArray(storedVal)
          ) {
            merged[k] = { ...defaultVal, ...storedVal };
          } else {
            merged[k] = storedVal;
          }
        }
        // Include keys from initialValue that aren't in stored data
        for (const k of Object.keys(initialValue as Record<string, unknown>)) {
          if (!(k in parsed)) {
            merged[k] = (initialValue as Record<string, unknown>)[k];
          }
        }
        return merged as T;
      }
      return parsed;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
