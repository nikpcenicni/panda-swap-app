export const THEME_CONFIG = {
    LIGHT: 'light',
    DARK: 'dark'
  } as const;
  
  export type Theme = typeof THEME_CONFIG[keyof typeof THEME_CONFIG];
  
  export interface ThemeIconProps {
    size?: number;
    className?: string;
  }