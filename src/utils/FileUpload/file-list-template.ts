import { languageStore } from '../../store/language-store';
import { useTranslations } from '../../i18n/utils';
import type { GCodeFile } from '../../types/gcode';
import { formatTime } from '../format-handlers';

export function generateFileItemHTML(file: GCodeFile, showPreview: boolean = false): string {
  const currentLang = languageStore.get();
  const { t } = useTranslations(currentLang);

  return `
    <div
      class="file-item bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transform"
      data-file-id="${file.id}"
      style="touch-action: none;"
    >
      <div class="flex justify-between items-center mb-4">
        <div class="flex flex-col gap-1">
          <label
            for="quantity-${file.id}"
            class="text-sm font-medium text-gray-700 dark:text-gray-300"
            data-i18n-key="fileList.quantity.label"
          >
            ${t('fileList.quantity.label')}
          </label>
          <input
            id="quantity-${file.id}"
            type="number"
            min="1"
            value="${file.quantity}"
            data-file-id="${file.id}"
            class="w-24 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div class="flex items-center gap-2">
          <button
            onclick="console.log('Delete button clicked')"
            type="button"
            class="delete-file-btn p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"
            data-delete-file
            data-file-id="${file.id}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"/>
            </svg>
          </button>
          <button
            class="drag-handle p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-grab active:cursor-grabbing"
            aria-label="${t('fileList.dragHandle')}"
            data-i18n-key="fileList.dragHandle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>
        </div>
      </div>
      ${showPreview ? `
            <div class="gcode-preview-container">
              <!-- Preview container will be initialized if preview is enabled -->
            </div>
          ` : ''}
      <div class="mt-4">
        <h4 
          class="font-medium text-gray-700 dark:text-gray-300 mb-2 break-words whitespace-pre-wrap" 
          data-i18n-key="fileList.fileInfo.file" 
          data-i18n-params='{"name":"${file.metadata.plateName}"}'
        >
          ${t('fileList.fileInfo.file', { name: file.metadata.plateName })}
        </h4>
        <h4 
          class="font-medium text-gray-700 dark:text-gray-300 mb-2" 
          data-i18n-key="fileList.fileInfo.filamentUsage"
        >
          ${t('fileList.fileInfo.filamentUsage')}
        </h4>
        <ul class="space-y-2">
          ${file.metadata.colors
            .filter(color => color.weight > 0)
            .map(({ color, weight }) => `
              <li class="flex items-center justify-between text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <div class="flex items-center gap-2">
                  <div
                    class="w-6 h-6 rounded border border-gray-200 dark:border-gray-600"
                    style="background-color: ${color}"
                  ></div>
                  <span>${color}</span>
                </div>
                <span>${(weight * file.quantity).toFixed(2)}g</span>
              </li>
            `).join('')}
        </ul>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h4 
              class="font-medium text-gray-700 dark:text-gray-300 mb-2" 
              data-i18n-key="fileList.fileInfo.printTime"
            >
              ${t('fileList.fileInfo.printTime')}
            </h4>
            <p class="text-gray-600 dark:text-gray-400">
              ${formatTime(file.metadata.totalTime)}
            </p>
          </div>
          <div>
            <h4 
              class="font-medium text-gray-700 dark:text-gray-300 mb-2" 
              data-i18n-key="fileList.fileInfo.totalTime"
            >
              ${t('fileList.fileInfo.totalTime')}
            </h4>
            <p class="text-gray-600 dark:text-gray-400">
              ${formatTime(file.metadata.estimatedTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}