export type Theme = 'light' | 'dark';

export function initTheme(): void {
  const theme = localStorage.getItem('theme-preference') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  setTheme(theme as Theme);
}

export function toggleTheme(): void {
  const isDark = document.documentElement.classList.contains('dark');
  const newTheme = isDark ? 'light' : 'dark';
  
  setTheme(newTheme);
  localStorage.setItem('theme-preference', newTheme);
}

export function setTheme(theme: Theme): void {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function setupThemeListeners(): void {
  // Handle system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Re-run initialization when navigating between pages
  document.addEventListener('astro:after-swap', initTheme);
}