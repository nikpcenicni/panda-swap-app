// src/types/gcode.ts
export interface Color {
    color: string;
    weight: number;
  }
  
  export interface FileMetadata {
    plateName: string;
    colors: Color[];
    totalTime: number;
    estimatedTime: number;
    modelImage?: string;
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