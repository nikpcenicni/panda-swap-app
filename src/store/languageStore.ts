// src/store/languageStore.ts
import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'ko' | 'zh';

const LANGUAGE_STORAGE_KEY = 'user-language';

// Get initial language from storage or browser
function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';
  
  // Check localStorage first
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && isValidLanguage(stored)) {
    return stored as SupportedLanguage;
  }
  
  // Then check browser language
  const browserLang = navigator.language.split('-')[0];
  return isValidLanguage(browserLang) ? browserLang as SupportedLanguage : 'en';
}

function isValidLanguage(lang: string): lang is SupportedLanguage {
  return ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh'].includes(lang);
}

// Create persistent store
export const languageStore = persistentAtom<SupportedLanguage>(
  LANGUAGE_STORAGE_KEY,
  getInitialLanguage(),
  {
    encode: JSON.stringify,
    decode: JSON.parse
  }
);

// Language change handler
export function setLanguage(lang: SupportedLanguage): void {
  if (!isValidLanguage(lang)) return;
  
  languageStore.set(lang);
  document.documentElement.lang = lang;
  
  // Dispatch custom event for components to react
  window.dispatchEvent(new CustomEvent('language-changed', { detail: { language: lang } }));
}

// Subscribe to language changes
if (typeof window !== 'undefined') {
  languageStore.subscribe(lang => {
    document.documentElement.lang = lang;
  });
}