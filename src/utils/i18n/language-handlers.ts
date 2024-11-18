import { languageStore, type SupportedLanguage } from '../../store/language-store.ts';
import { getCurrentLanguage, setLanguage } from '../../i18n/utils';

export function setupLanguageHandlers(
  selectButtonId: string,
  dropdownId: string,
  onLanguageChange: (lang: string) => void
) {
  // Safety check for SSR
  if (typeof window === 'undefined') return;

  const selectButton = document.getElementById(selectButtonId);
  const dropdown = document.getElementById(dropdownId);

  if (!selectButton || !dropdown) return;

  function updateButtonLabel(lang: string) {
    if (selectButton){
        const labelSpan = selectButton.querySelector('span');
        if (labelSpan) {
        labelSpan.textContent = lang.toUpperCase();
        }
    }
  }

  // Toggle dropdown
  selectButton.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!selectButton.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
      dropdown.classList.add('hidden');
    }
  });

  // Handle language selection
  dropdown.addEventListener('click', (e) => {
    const button = (e.target as Element).closest('button');
    if (!button) return;

    const newLang = button.getAttribute('data-lang');
    if (!newLang) return;

    // Validate language before setting
    if (isValidLanguage(newLang)) {
      languageStore.set(newLang as SupportedLanguage);
      setLanguage(newLang);
      onLanguageChange(newLang);
      dropdown.classList.add('hidden');
    }
  });

  // Initialize current language
  const initialLang = getCurrentLanguage();
  languageStore.set(initialLang as SupportedLanguage);
  updateButtonLabel(initialLang);

  // Update button label when language changes
  languageStore.subscribe((lang) => {
    updateButtonLabel(lang);
  });

  // Handle system dark mode changes
  window.addEventListener('language-change', (e) => {
    const newLang = (e as CustomEvent).detail?.language;
    if (newLang && isValidLanguage(newLang)) {
      updateButtonLabel(newLang);
    }
  });
}

// Utility function to validate language codes
function isValidLanguage(lang: string): boolean {
  const validLanguages: SupportedLanguage[] = ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'uk', 'pt', 'it'];
  return validLanguages.includes(lang as SupportedLanguage);
}

// Initialize language on page load
export function initializeLanguage(): void {
  if (typeof window === 'undefined') return;

  const storedLang = localStorage.getItem('lang-preference');
  if (storedLang && isValidLanguage(storedLang)) {
    languageStore.set(storedLang as SupportedLanguage);
  }
}

// Auto-initialize on import if in browser
if (typeof window !== 'undefined') {
  initializeLanguage();
}