export interface PreviewSettings {
  renderTubes: boolean;
  buildArea: boolean;
}

export interface DisplaySettings {
  hideEmptyFilaments: boolean;
  showTotalCost: boolean;
  showPrinterInfo: boolean;
  compactMode: boolean;
  showPreview: boolean;
}

export interface GCodeSettings {
  buildPlateSwap: string;
}

export interface Settings {
  preview: PreviewSettings;
  display: DisplaySettings;
  gcode: GCodeSettings;
}
