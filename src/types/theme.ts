export interface ThemePreference {
  theme: 'light' | 'dark';
  useSystem: boolean;
}

export interface ThemeState {
  current: ThemePreference['theme'];
  system: ThemePreference['theme'];
}