// utils/translation-handlers.ts
import { languageStore } from '../store/languageStore';
import { useTranslations } from '../i18n/utils';

export function setupTranslationObservers() {
  function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n-key]');
    const { t } = useTranslations(languageStore.get());

    elements.forEach(element => {
      const key = element.getAttribute('data-i18n-key');
      if (key) {
        element.textContent = t(key);
      }
    });
  }

  // Update translations when language changes
  languageStore.subscribe(() => {
    updateTranslations();
  });

  // Update on page load
  document.addEventListener('astro:page-load', () => {
    updateTranslations();
  });

  // Listen for language change events
  window.addEventListener('language-change', () => {
    updateTranslations();
  });
}