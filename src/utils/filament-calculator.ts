// src/utils/filament-calculator.ts
import type { GCodeFile } from '../types/gcode';
import { getCurrentLanguage, useTranslations } from '../i18n/utils';
import tinycolor from 'tinycolor2';

export interface FilamentUsageData {
  slotKey: string;
  color: string;
  weight: number;
  cost: number;
  filament_type: string;
  displayColor: string;
  textColor: string;
}

interface Settings {
  display: {
    hideEmptyFilaments: boolean;
    showTotalCost: boolean;
    compactMode: boolean;
  };
}

export function calculateFilamentUsage(files: readonly GCodeFile[], settings: Settings): FilamentUsageData[] {
  const { t } = useTranslations(getCurrentLanguage());

  // Calculate totals per color across all files
  const totals = files.reduce((acc, file) => {
    file.metadata.colors.forEach(({ color, weight, cost, filament_type }, index) => {
      const slotKey = t('printSummary.filament.slot', { number: index + 1 });
      if (!acc[slotKey]) {
        acc[slotKey] = { color, weight: 0, cost: 0, filament_type };
      }
      acc[slotKey].weight += weight * file.quantity;
      acc[slotKey].cost += (cost ?? 0) * file.quantity;
    });
    return acc;
  }, {} as Record<string, { color: string; weight: number; cost: number; filament_type: string; }>);

  // Convert to array and process colors
  let usageData = Object.entries(totals).map(([slotKey, data]) => {
    const tc = tinycolor(data.color);
    return {
      slotKey,
      color: data.color,
      weight: data.weight,
      cost: data.cost,
      filament_type: data.filament_type,
      displayColor: tc.toString('hex'),
      textColor: tc.isLight() ? '#000000' : '#FFFFFF'
    };
  });

  // Filter out empty slots if hideEmptyFilaments is true
  if (settings.display.hideEmptyFilaments) {
    usageData = usageData.filter(data => data.weight > 0);
  }

  return usageData;
}

export function calculateTotalCost(usageData: FilamentUsageData[]): number {
  return usageData.reduce((sum, { cost }) => sum + cost, 0);
}

export function formatFilamentWeight(weight: number): string {
  return weight.toFixed(2);
}

export function formatFilamentCost(cost: number): string {
  return cost.toFixed(2);
}

// Update FilamentUsage component with new calculations
export function generateFilamentDisplayHTML(usageData: FilamentUsageData[], settings: Settings): string {
  const { t } = useTranslations(getCurrentLanguage());

  if (settings.display.compactMode) {
    return `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2 justify-start">
          ${usageData.map(({ displayColor, textColor }) => `
            <div class="relative group">
              <div
                class="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-xs font-mono transition-all duration-200"
                style="background-color: ${displayColor}; color: ${textColor}"
              >
                <span class="opacity-0 group-hover:opacity-100 transition-opacity">
                  ${displayColor}
                </span>
              </div>
              <div class="absolute left-1/2 -translate-x-1/2 -bottom-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                ${displayColor}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="space-y-2">
          ${usageData.map(({ slotKey, filament_type, weight, cost }) => `
            <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <span class="font-medium">${slotKey}</span>
              <div class="text-sm text-gray-600 dark:text-gray-300">
                ${filament_type} - 
                ${t('printSummary.filament.weight', { amount: formatFilamentWeight(weight) })} - 
                ${t('printSummary.filament.cost', { amount: formatFilamentCost(cost) })}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return usageData.map(({ slotKey, displayColor, textColor, filament_type, weight, cost }) => `
    <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
      <div class="flex items-center gap-3">
        <div class="relative group">
          <div
            class="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-xs font-mono transition-all duration-200"
            style="background-color: ${displayColor}; color: ${textColor}"
          >
            <span class="opacity-0 group-hover:opacity-100 transition-opacity">
              ${displayColor}
            </span>
          </div>
          <div class="absolute left-1/2 -translate-x-1/2 -bottom-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            ${displayColor}
          </div>
        </div>
        <div>
          <span class="font-medium">${slotKey}</span>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            ${filament_type}
          </div>
        </div>
        <div>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            ${t('printSummary.filament.weight', { amount: formatFilamentWeight(weight) })}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            ${t('printSummary.filament.cost', { amount: formatFilamentCost(cost) })}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}