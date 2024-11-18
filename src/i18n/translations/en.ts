import type { TranslationKeys } from '../config';

const translations: TranslationKeys = {
  app: {
    title: "Panda Swap",
    description: "Queue you print files for Panda Swap",
    welcome: "Welcome to Panda Swap",
  },
  common: {
    title: 'Panda Swap',
    toggleTheme: 'Toggle theme',
    settings: 'Settings',
    language: 'Language'
  },
  error: {
    invalidFile: "Invalid File",
    uploadFailed: "Upload Failed",
  },
  settings: {
    preview: {
      title: 'File Preview Settings',
      renderTubes: 'Show as Tubes',
      buildArea: 'Show Build Volume',
      showPreview: 'Show Preview',
    },
    gcode: {
      title: 'GCode Settings',
      buildPlateSwap: 'Build Plate Swap GCode'
    },
    display: {
      title: 'Print Summary Settings',
      emptyFilaments: 'Unused Filament',
      showTotalCost: 'Show Total Cost',
      showPrinterInfo: 'Show Printer Info',
      compactMode: 'Compact Mode',
    }
  },
  fileUpload: {
    title: 'Upload GCODE Files',
    dragDrop: 'Drag and drop your GCODE files here',
    or: 'or',
    browse: 'Browse files',
    fileListLabel: 'File List',
    inputLabel: 'File Input',
  },
  printSummary: {
    title: "Print Summary",
    compileGcode: "Compile G-code",
    totalPrintTime: "Total print time: {time}",
    totalCost: "Total cost: {cost}",
    printer: {
      single: "Printer: {name}",
      multiple: "Printers: {names}"
    },
    filament: {
      slot: "Filament {number}",
      weight: "{amount}g",
      cost: "${amount}"
    }
  },
  fileList: {
    quantity: {
      label: "Print Quantity"
    },
    dragHandle: "Drag to reorder",
    fileInfo: {
      file: "File: {name}",
      filamentUsage: "Filament Usage:",
      printTime: "Print Time:",
      totalTime: "Total Time:"
    },
    deleteFile: "Delete File"
  }
};

export default translations;