// src/types/gcode.ts
export interface Color {
  color: string;
  weight: number;
  cost: number;
  filament_type: string;
}

export interface FileMetadata {
  plateName: string;
  colors: Color[];
  totalTime: number;
  estimatedTime: number;
  modelImage?: string;
  printerModel: string
}

export interface GCodeFile {
  id: string;
  name: string;
  content: string;
  quantity: number;
  metadata: FileMetadata;
}

export interface GCodePreviewOptions {
  canvas: HTMLCanvasElement;
  extrusionColor: string;
  backgroundColor: string;
  initialCameraPosition: [number, number, number];
  buildVolume: {
    x: number;
    y: number;
    z: number;
  };
}

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