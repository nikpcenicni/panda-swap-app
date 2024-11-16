// types/settings.ts
export interface Settings {
    preview: {
      renderTubes: boolean;
      buildArea: boolean;
    };
    display: {
      hideEmptyFilaments: boolean;
      showTotalCost: boolean;
      showPrinterInfo: boolean;
      compactMode: boolean;
      showPreview: boolean;
    };
  }