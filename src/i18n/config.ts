export const LANG_STORAGE_KEY = 'lang-preference';

export type TranslationKeys = {
    app: {
      title: string;
      description:  string;
      welcome:  string;
    };
    common: {
      title: string;
      toggleTheme: string;
      settings: string;
      language: string;
    };
    settings: {
      preview: {
        title: string;
        renderTubes: string;
        showGrid: string;
      }
    };
    fileUpload: {
      title: string;
      dragDrop: string;
      or: string;
      browse: string;
    };
    printSummary: {
        title: string;
        compileGcode: string;
        totalPrintTime: string;
        totalCost: string;
        printer: {
          single: string;
          multiple: string;
        };
        filament: {
          slot: string;
          weight: string;
          cost: string;
        };
      };
      fileList: {
        quantity: {
          label: string;
        };
        dragHandle: string;
        fileInfo: {
          file: string;
          filamentUsage: string;
          printTime: string;
          totalTime: string;
        };
      };
  };

export const languageNames: Record<string, string> = {
  'en': 'English',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'zh': '中文',
  'ja': '日本語',
  'ko': '한국어',
  'ru': 'Русский',
  'pt': 'Português',
  'it': 'Italiano'
};