// src/store/fileStore.ts
import { atom } from 'nanostores';

export interface GCodeFile {
  id: string;
  name: string;
  content: string;
  quantity: number;
  metadata: {
    plateName: string;
    colors: Array<{ color: string; weight: number, cost: number, filament_type: string }>;
    totalTime: number;
    estimatedTime: number;
    modelImage?: string;
  };
}

export const filesStore = atom<GCodeFile[]>([]);