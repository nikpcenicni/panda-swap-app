// src/types/gcode-preview.d.ts
declare module '@xyz-tools/gcode-preview' {
    export class GCodePreview {
      constructor(options: {
        canvas: HTMLCanvasElement;
        topLayerColor?: number;
        lastLayerColor?: number;
        lineWidth?: number;
        buildVolume?: {
          x: number;
          y: number;
          z: number;
        };
      });
      
      processGCode(gcode: string): void;
    }
  }