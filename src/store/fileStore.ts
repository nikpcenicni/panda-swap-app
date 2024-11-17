import { atom } from 'nanostores';

export interface GCodeFileColor {
  color: string;
  weight: number;
  cost: number;
  filament_type: string;
}

export interface FileMetadata {
  plateName: string;
  colors: GCodeFileColor[];
  totalTime: number;
  estimatedTime: number;
  modelImage?: string;
  printerModel: string;
}

export interface GCodeFile {
  id: string;
  name: string;
  content: string;
  quantity: number;
  metadata: FileMetadata;
}

export const filesStore = atom<GCodeFile[]>([]);

export function addFiles(newFiles: GCodeFile[]): void {
  const existingFiles = filesStore.get();
  const uniqueFiles = newFiles.filter(newFile => 
    !existingFiles.some(existing => existing.name === newFile.name)
  );

  if (uniqueFiles.length > 0) {
    filesStore.set([...existingFiles, ...uniqueFiles]);
  }
}

export function updateFileQuantity(fileId: string, quantity: number): void {
  if (quantity < 1) throw new Error('Quantity must be at least 1');
  
  filesStore.set(
    filesStore.get().map(file =>
      file.id === fileId ? { ...file, quantity } : file
    )
  );
}

export function deleteFile(fileId: string): void {
  const files = filesStore.get();
  const fileIndex = files.findIndex(file => file.id === fileId);
  
  if (fileIndex === -1) {
    throw new Error('File not found');
  }

  const updatedFiles = files.filter(file => file.id !== fileId);
  filesStore.set(updatedFiles);
}

export function deleteMultipleFiles(fileIds: string[]): void {
  const files = filesStore.get();
  const updatedFiles = files.filter(file => !fileIds.includes(file.id));
  filesStore.set(updatedFiles);
}

export function reorderFiles(fileIds: string[]): void {
  const currentFiles = filesStore.get();
  const reorderedFiles = fileIds
    .map(id => currentFiles.find(f => f.id === id))
    .filter((file): file is GCodeFile => file !== undefined);

  if (reorderedFiles.length !== currentFiles.length) {
    throw new Error('Invalid file reordering - some files are missing');
  }

  filesStore.set(reorderedFiles);
}

export function getTotalStats() {
  const files = filesStore.get();
  
  return files.reduce((acc, file) => {
    const timeInMinutes = file.metadata.estimatedTime * file.quantity;
    
    const colorUsage = file.metadata.colors.reduce((colorAcc, { color, weight, cost, filament_type }) => {
      const key = `${color}-${filament_type}`;
      if (!colorAcc[key]) {
        colorAcc[key] = {
          color,
          weight: 0,
          cost: 0,
          filament_type
        };
      }
      colorAcc[key].weight += weight * file.quantity;
      colorAcc[key].cost += cost * file.quantity;
      return colorAcc;
    }, {} as Record<string, { color: string; weight: number; cost: number; filament_type: string }>);

    return {
      totalTime: acc.totalTime + timeInMinutes,
      colorUsage: Object.values(colorUsage).map(usage => ({
        color: usage.color,
        weight: usage.weight,
        cost: usage.cost,
        filament_type: usage.filament_type
      }))
    };
  }, { 
    totalTime: 0, 
    colorUsage: [] as Array<{ color: string; weight: number; cost: number; filament_type: string }> 
  });
}