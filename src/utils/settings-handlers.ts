import { settingsStore, updateSettings } from '../store/settings-store';
import type { Settings } from '../types/settings';

export function handleSettingChange(
  target: HTMLInputElement | HTMLTextAreaElement,
  settingsGroup: keyof Settings
): void {
  if (!target.name) return;

  const currentSettings = settingsStore.get();
  const value = target instanceof HTMLInputElement && target.type === 'checkbox' 
    ? target.checked 
    : target.value;

  const updatedSettings = {
    [settingsGroup]: {
      ...currentSettings[settingsGroup],
      [target.name]: value
    }
  };

  updateSettings(updatedSettings);
}

export function updateSettingsUI(
  panel: HTMLElement,
  settings: Settings
): void {
  Object.entries(settings).forEach(([group, groupSettings]) => {
    Object.entries(groupSettings).forEach(([key, value]) => {
      const input = panel.querySelector(
        `[name="${key}"][data-settings-group="${group}"]`
      ) as HTMLInputElement | HTMLTextAreaElement | null;
      
      if (input) {
        if (input instanceof HTMLInputElement && input.type === 'checkbox') {
          input.checked = value as boolean;
        } else if (input.value !== value) {
          input.value = value as string;
        }
      }
    });
  });
}
