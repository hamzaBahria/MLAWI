import { useState, useEffect, useCallback } from 'react';
import { getTheme, saveTheme } from '../utils/storage';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => getTheme() === 'dark');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      saveTheme(next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return { isDark, toggleTheme };
}
