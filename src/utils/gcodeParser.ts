// src/utils/gcodeParser.ts
export function parseGCodeFile(content: string, fileName: string) { // Add fileName parameter
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

  // Extract colors from extruder_colour line
  const colorLine = lines.find(line => line.includes('; extruder_colour ='));
  let colors: { color: string; weight: number }[] = [];

  if (colorLine) {
    const colorMatch = colorLine.match(/extruder_colour = (.*?);/);
    if (colorMatch) {
      const colorArray = colorMatch[1].split(';').map(color => color.trim());
      colors = colorArray.map(hexColor => ({
        color: hexColor,
        weight: 0
      }));
    }
  }

  // Parse filament weights and match them to colors
  lines.forEach(line => {
    if (line.includes(';FILAMENT_USED:')) {
      const weight = parseFloat(line.split(':')[1].trim());
      const colorIndex = colors.findIndex(c => c.weight === 0);
      if (colorIndex !== -1) {
        colors[colorIndex].weight = weight;
      }
    }
  });

  return {
    plateName,
    colors: colors.length ? colors : [{ color: '#FFFFFF', weight: 0 }],
    totalTime: modelPrintTime,
    estimatedTime: totalEstimatedTime,
    modelImage: undefined
  };
}