declare module 'gcode-preview' {
  export interface GCodePreviewOptions {
    canvas: HTMLCanvasElement;
    extrusionColor?: string;
    backgroundColor?: string;
    buildVolume?: {
      x: number;
      y: number;
      z: number;
    };
    renderTubes?: boolean;
  }

  export class WebGLPreview {
    processGCode(gcode: string): Promise<void>;
    dispose(): void;
  }

  export default function init(options: GCodePreviewOptions): WebGLPreview;

    export function init(arg0: { canvas: HTMLCanvasElement; extrusionColor: string; backgroundColor: string; buildVolume: { x: number; y: number; z: number; } | undefined; renderTubes: boolean; }): any {
        throw new Error('Function not implemented.');
    }
}