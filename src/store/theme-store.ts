import { atom } from 'nanostores';
import type { Theme } from '../types/theme';

export const THEME_STORAGE_KEY = 'theme-preference';

export const themeStore = atom<Theme>('light');

export function initializeTheme(): void {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

export function setTheme(theme: Theme): void {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  themeStore.set(theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function toggleTheme(): void {
  const currentTheme = themeStore.get();
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}