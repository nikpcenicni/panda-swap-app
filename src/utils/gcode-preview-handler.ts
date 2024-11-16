import type { GCodeFile } from '../types/gcode';
import { getSettings } from '../store/settings-store';
import { PREVIEW_CONFIG } from '../constants/gcode';
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

export async function initializeGCodePreview(container: HTMLElement, file: GCodeFile): Promise<() => void> {
  if (!container) return () => {};

  let canvas = container.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg';
    container.appendChild(canvas);
  }

  const extrusionColors = file.metadata.colors
    .filter(c => c.weight > 0)
    .map(c => c.color);

  const volume = PRINTER_VOLUMES[file.metadata.printerModel] || PRINTER_VOLUMES.default;
  let preview: any = null;

  async function createAndUpdatePreview() {
    if (!canvas?.isConnected) return;

    try {
      // Cleanup previous instance if it exists
      if (preview) {
        try {
          preview.dispose();
        } catch (e) {
          console.warn('Error disposing previous preview:', e);
        }
        preview = null;
      }

      const settings = getSettings();
      const isDark = document.documentElement.classList.contains('dark');
      
      preview = GCodePreview.init({
        canvas,
        extrusionColor: extrusionColors.length > 0 ? extrusionColors[0] : '#FFFFFF',
        backgroundColor: isDark ? BACKGROUND_COLORS.dark : BACKGROUND_COLORS.light,
        renderTubes: settings.preview.renderTubes,
        buildVolume: settings.preview.buildArea ? {
          x: volume[0],
          y: volume[1],
          z: volume[2]
        } : undefined
      });

      // Process the GCode
      await preview.processGCode(file.content);
    } catch (error) {
      console.error('Error creating GCode preview:', error);
      
      // Cleanup on error
      if (preview) {
        try {
          preview.dispose();
        } catch (e) {
          console.warn('Error disposing preview on error:', e);
        }
        preview = null;
      }
      
      // Add error indication to the canvas
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = BACKGROUND_COLORS.dark;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#FF0000';
          ctx.font = '14px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Error loading preview', canvas.width / 2, canvas.height / 2);
        }
      }
    }
  }

  // Initial preview creation
  await createAndUpdatePreview();

  // Settings change handler
  const handleSettingsChange = async () => {
    if (canvas?.isConnected) {
      await createAndUpdatePreview();
    }
  };

  // Theme change observer
  const themeObserver = new MutationObserver(async (mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'class' && canvas?.isConnected) {
        await createAndUpdatePreview();
        break;
      }
    }
  });

  // Start observers and listeners
  window.addEventListener('settings-changed', handleSettingsChange);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  // Return cleanup function
  return () => {
    window.removeEventListener('settings-changed', handleSettingsChange);
    themeObserver.disconnect();
    if (preview) {
      preview.dispose?.();
      preview = null;
    }
  };
}

export function getCurrentThemeBackgroundColor(): string {
  return document.documentElement.classList.contains('dark') 
    ? BACKGROUND_COLORS.dark 
    : BACKGROUND_COLORS.light;
}