import Sortable from 'sortablejs';
import { filesStore } from '../../store/file-store';
import type { GCodeFile } from '../../types/gcode';

export function initializeSortable(fileList: HTMLElement): void {
  // Remove any existing Sortable instance
  const oldInstance = Sortable.get(fileList);
  if (oldInstance) {
    oldInstance.destroy();
  }

  new Sortable(fileList, {
    animation: 150,
    handle: '.drag-handle',
    draggable: '.file-item',
    ghostClass: 'opacity-50',
    chosenClass: 'opacity-60',
    dragClass: 'shadow-2xl',
    forceFallback: true,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: true,
    swapThreshold: 0.65,
    onStart: function () {
      document.body.style.cursor = 'grabbing';
    },
    onEnd: function (evt) {
      document.body.style.cursor = 'default';
      const files = [...filesStore.get()];
      const newFiles = Array.from(evt.to.children).map((el) => {
        const fileId = el.getAttribute('data-file-id');
        return files.find(f => f.id === fileId)!;
      });
      filesStore.set(newFiles);
    }
  });
}