import type { GCodeFile, GCodePreviewOptions } from '../types/gcode';
import * as GCodePreview from 'gcode-preview';

interface PrinterVolume {
  [key: string]: [number, number, number];
}

interface ThemeColors {
  light: string;
  dark: string;
}

const PRINTER_VOLUMES: PrinterVolume = {
  "Bambu Lab A1 mini": [180, 180, 180],
  "default": [180, 180, 180]
};

const BACKGROUND_COLORS: ThemeColors = {
  light: '#f3f4f6', // gray-100
  dark: '#111827'  // gray-900
};

export async function initializeGCodePreview(container: HTMLElement, file: GCodeFile): Promise<void> {
  const canvas = document.createElement('canvas');
  canvas.className = 'w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg';
  container.appendChild(canvas);

  const extrusionColors = file.metadata.colors
    .filter(c => c.weight > 0)
    .map(c => c.color);

  const volume = PRINTER_VOLUMES[file.metadata.printerModel] || PRINTER_VOLUMES.default;

  let preview: any; // Type as any due to GCodePreview typing limitations

  function updatePreview(isDark: boolean = document.documentElement.classList.contains('dark')) {
    preview = GCodePreview.init({
      canvas,
      extrusionColor: extrusionColors.length > 0 ? extrusionColors.toString() : ['#FFFFFF'],
      backgroundColor: isDark ? BACKGROUND_COLORS.dark : BACKGROUND_COLORS.light,
      renderTubes: true,
      buildVolume: {
        x: volume[0],
        y: volume[1],
        z: volume[2]
      }
    } as unknown as GCodePreviewOptions);

    preview.processGCode(file.content);
  }

  // Initialize preview
  updatePreview();

  // Watch for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const isDark = document.documentElement.classList.contains('dark');
        updatePreview(isDark);
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  // Cleanup observer when container is removed
  const cleanup = () => {
    observer.disconnect();
  };

  // Create a new MutationObserver to watch for container removal
  const containerObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node === container) {
          cleanup();
          containerObserver.disconnect();
        }
      });
    });
  });

  containerObserver.observe(container.parentElement!, {
    childList: true
  });
}

// Function to get the current theme's background color
export function getCurrentThemeBackgroundColor(): string {
  return document.documentElement.classList.contains('dark') 
    ? BACKGROUND_COLORS.dark 
    : BACKGROUND_COLORS.light;
}