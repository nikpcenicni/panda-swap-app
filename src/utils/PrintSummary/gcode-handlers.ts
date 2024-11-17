import type { GCodeFile } from '../../types/gcode';
import { getSettings } from '../../store/settings-store';

export function compileGCode(files: readonly GCodeFile[]): string {
  const settings = getSettings();
  let compiledGCode = '; Compiled GCode File\n';
  compiledGCode += `; Total Files: ${files.length}\n`;
  
  // Add printer model info
  const printerModels = Array.from(new Set(files.map(f => f.metadata.printerModel))).filter(Boolean);
  if (printerModels.length > 0) {
    compiledGCode += `; Printer Model(s): ${printerModels.join(', ')}\n`;
  }
  
  // Add timestamp
  compiledGCode += `; Generated: ${new Date().toISOString()}\n\n`;

  // Process each file
  files.forEach((file, fileIndex) => {
    for (let i = 0; i < file.quantity; i++) {
      // Add header comments
      compiledGCode += `\n; Start of ${file.metadata.plateName} (Copy ${i + 1}/${file.quantity})\n`;
      compiledGCode += `; Original File: ${file.metadata.plateName}\n`;
      compiledGCode += `; Printer Model: ${file.metadata.printerModel || 'Unknown'}\n`;
      compiledGCode += `; Estimated Time: ${Math.floor(file.metadata.estimatedTime / 60)}h ${Math.round(file.metadata.estimatedTime % 60)}m\n`;
      
      // Add the file content
      compiledGCode += file.content;
      
      // Add end marker
      compiledGCode += `\n; End of ${file.metadata.plateName}\n`;

      // Add build plate swap G-code if:
      // 1. It's not the last copy of the last file
      // 2. Build plate swap G-code is defined in settings
      const isLastCopy = i === file.quantity - 1;
      const isLastFile = fileIndex === files.length - 1;
      
      if (settings.gcode.buildPlateSwap && (!isLastCopy || !isLastFile)) {
        compiledGCode += '\n; Build Plate Swap\n';
        compiledGCode += settings.gcode.buildPlateSwap;
        compiledGCode += '\n';
      }
    }
  });

  return compiledGCode;
}

// Rest of the code remains unchanged
export function downloadGCode(content: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `compiled_print_job_${new Date().toISOString().slice(0,10)}.gcode`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function calculatePrinterModels(files: readonly GCodeFile[]): string[] {
  return Array.from(new Set(
    files.map(file => file.metadata.printerModel)
  )).filter(Boolean);
}

export function calculateTotalTime(files: readonly GCodeFile[]): number {
  return files.reduce((total, file) =>
    total + (file.metadata.estimatedTime * file.quantity), 0);
}
