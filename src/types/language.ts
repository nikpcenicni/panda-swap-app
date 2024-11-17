export interface Language {
    code: string;
    name: string;
  }
  
  export interface LanguageState {
    current: string;
    available: Record<string, string>;
  }
  