// src/utils/helpers.ts
export function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  }
  
  export function getContrastColor(hexcolor: string): string {
    const hex = hexcolor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
  }
  
  export function validateGCodeFile(content: string): boolean {
    const requiredHeaders = [
      '; model printing time:',
      'filament_colour =',
      '; filament used [g] ='
    ];
    
    return requiredHeaders.every(header => content.includes(header));
  }