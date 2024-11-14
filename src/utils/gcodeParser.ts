// src/utils/gcodeParser.ts

interface Color {
  color: string;
  weight: number;
  cost: number;
}

interface FileMetadata {
  plateName: string;
  colors: Color[];
  totalTime: number;
  estimatedTime: number;
  modelImage?: string;
}

export function parseGCodeFile(content: string, fileName: string): FileMetadata {
  const lines = content.split('\n');
  
  // Extract print times from header
  const printTimeLine = lines.find(line =>
    line.includes('; model printing time:') && line.includes('total estimated time:')
  );
  let modelPrintTime = 0;
  let totalEstimatedTime = 0;
  
  if (printTimeLine) {
    // Parse model printing time
    const modelMatch = printTimeLine.match(/model printing time: (\d+)h (\d+)m (\d+)s/);
    if (modelMatch) {
      const [_, hours, minutes, seconds] = modelMatch;
      modelPrintTime = (parseInt(hours) * 60) + parseInt(minutes) + (parseInt(seconds) / 60);
    }
    
    // Parse total estimated time
    const totalMatch = printTimeLine.match(/total estimated time: (\d+)h (\d+)m (\d+)s/);
    if (totalMatch) {
      const [_, hours, minutes, seconds] = totalMatch;
      totalEstimatedTime = (parseInt(hours) * 60) + parseInt(minutes) + (parseInt(seconds) / 60);
    }
  }

  // Use filename without .gcode extension as plate name
  const plateName = fileName.replace(/\.gcode$/, '');

  // Extract colors from filament_colour line - ensure we handle the hex format correctly
  const colorLine = lines.find(line => line.includes('; filament_colour ='));
  let colors: string[] = [];
  if (colorLine) {
    const colorMatch = colorLine.match(/filament_colour = (.*)/);
    if (colorMatch) {
      colors = colorMatch[1]
        .split(';')
        .map(color => color.trim())
        .filter(color => color); // Remove empty strings
    }
  }

  // Parse filament weights
  const weightLine = lines.find(line => line.includes('; filament used [g] ='));
  let weights: number[] = [];
  if (weightLine) {
    const weightMatch = weightLine.match(/; filament used \[g\] = (.*)/);
    if (weightMatch) {
      weights = weightMatch[1]
        .split(',')
        .map(w => parseFloat(w.trim()));
    }
  }
  // Parse filament costs
  const costLine = lines.find(line => line.includes('; filament cost ='));
  let costs: number[] = [];
  if (costLine) {
    const costMatch = costLine.match(/; filament cost = (.*)/);
    if (costMatch) {
      costs = costMatch[1]
        .split(',')
        .map(w => parseFloat(w.trim()));
    }
  }

  // Combine colors with their weights, ensuring colors that weren't used (weight = 0) are filtered out
  const colorData: Color[] = colors.map((color, index) => ({
    color: color.startsWith('#') ? color : `#${color}`,
    weight: weights[index] || 0,
    cost: costs[index] || 0
  })).filter(c => c.weight > 0);

  // Provide default if no colors found or all weights were 0
  if (colorData.length === 0) {
    colorData.push({
      color: '#FFFFFF',
      weight: 0,
      cost: 0
    });
  }
  console.log(colorData);

  return {
    plateName,
    colors: colorData,
    totalTime: modelPrintTime,
    estimatedTime: totalEstimatedTime,
    modelImage: undefined
  };
}