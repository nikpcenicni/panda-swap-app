import { filesStore, type GCodeFile } from '../../store/file-store.ts';
import { settingsStore } from '../../store/settings-store.ts';
import { processFiles } from '../../utils/FileUpload/file-handlers.ts';
import { UI_CONFIG } from '../../types/gcode.ts';
import { initializeGCodePreview } from '../../utils/FileUpload/gcode-preview-handlers.ts';
import { initializeSortable } from '../../utils/FileUpload/sortable-handlers.ts';
import { generateFileItemHTML } from '../../utils/FileUpload/file-list-template.ts';
import { setupTranslationObservers } from '../../utils/i18n/translations-handlers.ts';

export function setupFileUploadHandlers(): void {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  const errorMessage = document.getElementById('error-message');
  const fileList = document.getElementById('file-list');
  const initialUpload = document.getElementById('initial-upload');
  const bottomUpload = document.querySelector('.p-4.space-y-2.border-t');
  
  let sortableInstance: any = null; // Store the Sortable instance

  function updateFileList(files: readonly GCodeFile[]): void {
    if (!fileList || !initialUpload || !bottomUpload) return;
    
    const settings = settingsStore.get();
    const showPreview = settings.preview?.showPreview ?? false;
    
    fileList.classList.toggle('hidden', files.length === 0);
    initialUpload.classList.toggle('hidden', files.length > 0);
    bottomUpload.classList.toggle('hidden', files.length === 0);
    
    // Pass the preview setting to generateFileItemHTML
    fileList.innerHTML = files
      .map((file) => generateFileItemHTML(file, showPreview))
      .join('');
    
    // Destroy existing Sortable instance if it exists
    if (sortableInstance) {
      sortableInstance.destroy();
    }
    
    // Reinitialize Sortable if there are files
    if (files.length > 0) {
      sortableInstance = initializeSortable(fileList);
    }
    
    // Only initialize previews if preview is enabled
    if (showPreview) {
      document.querySelectorAll('.file-item').forEach(fileItem => {
        const fileId = fileItem.getAttribute('data-file-id');
        const file = files.find(f => f.id === fileId);
        const container = fileItem.querySelector('.gcode-preview-container');
        if (file && container) {
          initializeGCodePreview(container as HTMLElement, file).catch(console.error);
        }
      });
    }
  }

  function showError(message: string) {
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.classList.remove('hidden');
      setTimeout(() => {
        errorMessage.classList.add('hidden');
      }, UI_CONFIG.ERROR_TIMEOUT);
    }
  }

  function handleDelete(e: Event) {
    const target = e.target as HTMLElement;
    const deleteButton = target.closest('[data-delete-file]');
    
    if (deleteButton) {
      e.preventDefault();
      const fileId = deleteButton.getAttribute('data-file-id');
      
      if (fileId && confirm('Are you sure you want to delete this file?')) {
        try {
          const files = filesStore.get();
          const updatedFiles = files.filter(file => file.id !== fileId);
          filesStore.set(updatedFiles);
        } catch (error) {
          console.error('Error deleting file:', error);
          showError('Failed to delete file');
        }
      }
    }
  }

  if (dropzone && fileInput) {
    const dropzoneActiveClasses = ['border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/10'];

    // Clean up existing event listeners before reattaching
    const cleanup = () => {
      document.removeEventListener('click', handleDelete);
      if (sortableInstance) {
        sortableInstance.destroy();
      }
    };

    // Initial setup
    filesStore.subscribe(updateFileList);
    settingsStore.subscribe(() => {
      const files = filesStore.get();
      updateFileList(files);
    });

    // Handle page transitions in Astro
    document.addEventListener('astro:page-load', () => {
      cleanup();
      setupTranslationObservers();
      const files = filesStore.get();
      updateFileList(files);
    });

    document.addEventListener('astro:before-swap', cleanup);

    // Reattach event listeners
    document.addEventListener('click', handleDelete);

    document.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.matches('input[type="number"][data-file-id]')) {
        const fileId = target.dataset.fileId;
        const quantity = parseInt(target.value);
        if (fileId) {
          const files = [...filesStore.get()];
          const newFiles = files.map(file =>
            file.id === fileId ? { ...file, quantity } : file
          );
          filesStore.set(newFiles);
        }
      }
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add(...dropzoneActiveClasses);
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove(...dropzoneActiveClasses);
    });

    dropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropzone.classList.remove(...dropzoneActiveClasses);
      if (e.dataTransfer?.files) {
        await processFiles(e.dataTransfer.files, { onError: showError });
      }
    });

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' && target.textContent?.includes('Browse files')) {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        await processFiles(target.files, { onError: showError });
        target.value = '';
      }
    });
  }
}