import type { TranslationKeys } from '../config';

const translations: TranslationKeys = {
  app: {
    title: "Panda Swap",
    description: "Cola de impresión de archivos para Panda Swap",
    welcome: "Bienvenido a Panda Swap",
  },
  common: {
    toggleTheme: 'Toggle theme',
    settings: 'Settings',
    language: 'Idioma'
  },
  error: {
    invalidFile: "Fichero no válido",
    uploadFailed: "Carga fallida",
  },
  settings: {
    preview: {
      title: 'Vista previa del archivo',
      renderTubes: 'Tubos de renderizado',
      buildArea: 'Construir volumen',
      showPreview: 'Vista previa',
    },
    gcode: {
      title: 'Configuración de GCODE',
      buildPlateSwap: 'Construir placa de intercambio GCODE'
    },
    display: {
      title: 'Imprimir resumen',
      emptyFilaments: 'Filamento no utilizado',
      showTotalCost: 'Coste total',
      showPrinterInfo: 'Información para impresoras',
      compactMode: 'Modo compacto',
    }
  },
  fileUpload: {
    title: 'Cargar archivos GCODE',
    dragDrop: 'Arrastre y suelte aquí sus archivos GCODE',
    or: 'or',
    browse: 'Examinar archivos',
    fileListLabel: 'Lista de archivos',
    inputLabel: 'Entrada de archivos',
  },
  printSummary: {
    title: "Imprimir resumen",
    compileGcode: "Compile",
    totalPrintTime: "Tiempo total de impresión: {time}",
    totalCost: "Coste total: {cost}",
    printer: {
      single: "Impresora: {name}",
      multiple: "Impresoras: {names}"
    },
    filament: {
      slot: "Filamento {number}",
      weight: "{amount}g",
      cost: "${amount}"
    }
  },
  fileList: {
    quantity: {
      label: "Cantidad impresa"
    },
    dragHandle: "Arrastrar para reordenar",
    fileInfo: {
      file: "Archivo: {name}",
      filamentUsage: "Uso del filamento:",
      printTime: "Tiempo de impresión:",
      totalTime: "Tiempo total:"
    },
    deleteFile: "Eliminar archivo"
  }
};

export default translations;