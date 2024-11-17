import { filesStore } from '../../store/file-store';
import { settingsStore } from '../../store/settings-store';
import { getCurrentLanguage, useTranslations } from '../../i18n/utils';
import { compileGCode, downloadGCode, calculateTotalTime } from '../../utils/PrintSummary/gcode-handlers';
import { updateFilamentDisplay } from './filamentDisplayHandlers';
import { formatTime } from '../../utils/format-handlers';

export function setupPrintSummaryHandlers(): void {
  function initializeTranslations() {
    const { t } = useTranslations(getCurrentLanguage());
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = t(key);
    });
  }

  function updateSummary() {
    const files = filesStore.get();
    const settings = settingsStore.get();
    
    // Update compile button state
    const compileButton = document.getElementById('compile-button') as HTMLButtonElement;
    if (compileButton) {
      compileButton.disabled = files.length === 0;
    }

    // Update total time
    const totalTime = calculateTotalTime(files);
    const totalTimeElement = document.querySelector('#total-time');
    if (totalTimeElement) {
      const { t } = useTranslations(getCurrentLanguage());
      totalTimeElement.textContent = t('printSummary.totalPrintTime', { 
        time: formatTime(totalTime) 
      });
    }

    // Update filament display
    updateFilamentDisplay(files, settings);
  }

  // Initialize translations on load
  initializeTranslations();

  // Set up event listeners
  window.addEventListener('language-change', () => {
    initializeTranslations();
    updateSummary();
  });

  // Initialize subscriptions
  filesStore.subscribe(updateSummary);
  settingsStore.subscribe(updateSummary);

  // Handle compile button click
  document.getElementById('compile-button')?.addEventListener('click', () => {
    const files = filesStore.get();
    if (files.length > 0) {
      const compiledGCode = compileGCode(files);
      downloadGCode(compiledGCode);
    }
  });
}