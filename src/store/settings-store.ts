// store/settings-store.ts
import { atom } from 'nanostores';
import type { Settings } from '../types/settings';

export type { Settings } from '../types/settings';

export const DEFAULT_SETTINGS: Settings = {
  preview: {
    renderTubes: true,
    buildArea: true,
  },
  display: {
    hideEmptyFilaments: false,
    showTotalCost: true,
    showPrinterInfo: true,
    compactMode: false,
    showPreview: true
  }
};

export const settingsStore = atom<Settings>(DEFAULT_SETTINGS);

export function initSettings(): Settings {
  if (typeof window !== 'undefined') {
    try {
      const savedSettings = localStorage.getItem('print-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        const mergedSettings = {
          preview: { ...DEFAULT_SETTINGS.preview, ...parsed.preview },
          display: { ...DEFAULT_SETTINGS.display, ...parsed.display }
        };
        settingsStore.set(mergedSettings);
        return mergedSettings;
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }
  settingsStore.set(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

export function updateSettings(newSettings: Partial<Settings>): void {
  const currentSettings = settingsStore.get();
  const updatedSettings = {
    preview: { ...currentSettings.preview, ...(newSettings.preview || {}) },
    display: { ...currentSettings.display, ...(newSettings.display || {}) }
  };
  settingsStore.set(updatedSettings);
  if (typeof window !== 'undefined') {
    localStorage.setItem('print-settings', JSON.stringify(updatedSettings));
    window.dispatchEvent(new CustomEvent<Settings>('settings-changed', {
      detail: updatedSettings
    }));
  }
}

export function getSettings(): Settings {
  return settingsStore.get();
}