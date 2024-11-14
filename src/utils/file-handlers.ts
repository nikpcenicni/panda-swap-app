import type { GCodeFile, Color } from '../types/gcode';
import { parseGCodeFile } from './gcodeParser';
import { filesStore } from '../store/fileStore';

export interface FileHandlerCallbacks {
  onError: (message: string) => void;
}

export function compareColors(colors1: Color[], colors2: Color[]): boolean {
  if (colors1.length !== colors2.length) {
    return false;
  }

  for (let i = 0; i < colors1.length; i++) {
    if (colors1[i].color !== colors2[i].color) {
      return false;
    }
  }

  return true;
}

export async function validateGCodeFile(content: string): Promise<boolean> {
  const requiredHeaders = [
    '; model printing time:',
    'filament_colour =',
    '; filament used [g] ='
  ];

  return requiredHeaders.every(header => content.includes(header));
}

export async function processFiles(fileList: FileList, callbacks: FileHandlerCallbacks): Promise<void> {
  const files = Array.from(fileList);
  const existingFiles = filesStore.get();
  const newFiles: GCodeFile[] = [];

  for (const file of files) {
    try {
      // Check if file is already uploaded
      if (existingFiles.some(f => f.name === file.name)) {
        callbacks.onError(`File "${file.name}" has already been uploaded.`);
        continue;
      }

      const content = await file.text();

      // Validate GCode file
      if (!await validateGCodeFile(content)) {
        callbacks.onError(`File "${file.name}" appears to be invalid or corrupted.`);
        continue;
      }

      const metadata = parseGCodeFile(content, file.name);

      // Check if colors match with existing files
      if (existingFiles.length > 0) {
        const matchingFile = existingFiles.find(f => compareColors(f.metadata.colors, metadata.colors));
        if (!matchingFile) {
          callbacks.onError(`File "${file.name}" has different colors than the existing files.`);
          continue;
        }
      }
      
      newFiles.push({
        id: crypto.randomUUID(),
        name: file.name,
        content,
        quantity: 1,
        metadata
      });
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error);
      callbacks.onError(`Error processing file "${file.name}". Please make sure it's a valid GCode file.`);
    }
  }

  if (newFiles.length > 0) {
    filesStore.set([...existingFiles, ...newFiles]);
  }
}