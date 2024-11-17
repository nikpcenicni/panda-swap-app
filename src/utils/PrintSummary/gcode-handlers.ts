import type { GCodeFile } from '../../types/gcode';

export function compileGCode(files: readonly GCodeFile[]): string {
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
  files.forEach((file, index) => {
    for (let i = 0; i < file.quantity; i++) {
      compiledGCode += `\n; Start of ${file.metadata.plateName} (Copy ${i + 1}/${file.quantity})\n`;
      compiledGCode += `; Original File: ${file.metadata.plateName}\n`;
      compiledGCode += `; Printer Model: ${file.metadata.printerModel || 'Unknown'}\n`;
      compiledGCode += `; Estimated Time: ${Math.floor(file.metadata.estimatedTime / 60)}h ${Math.round(file.metadata.estimatedTime % 60)}m\n`;
      compiledGCode += file.content;
      compiledGCode += `\n; End of ${file.metadata.plateName}\n`;
    }
  });

  return compiledGCode;
}

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

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}m`;
}