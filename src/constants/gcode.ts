// src/constants/gcode.ts
export const PREVIEW_CONFIG = {
    DIMENSIONS: {
      x: 220,
      y: 220,
      z: 250
    },
    COLORS: {
      extrusion: '#3b82f6',
      background: '#111827'
    },
    CAMERA: {
      initial: [0, -200, 200] as [number, number, number]
    }
  } as const;
  
  export const FILE_VALIDATION = {
    REQUIRED_HEADERS: [
      '; model printing time:',
      'filament_colour =',
      '; filament used [g] ='
    ]
  } as const;
  
  export const UI_CONFIG = {
    ERROR_TIMEOUT: 5000,
    MIN_QUANTITY: 1,
    PREVIEW_HEIGHT: 64
  } as const;