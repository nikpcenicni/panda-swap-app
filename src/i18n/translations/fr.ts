import type { TranslationKeys } from '../config';

const translations: TranslationKeys = {
  app: {
    title: "Échange de pandas",
    description: "Mise en file d'attente des fichiers d'impression pour Échange de pandas",
    welcome: "Bienvenue à Échange de pandas",
  },
  common: {
    title: 'Échange de pandas',
    toggleTheme: 'Toggle theme',
    settings: 'Paramètres',
    language: 'Langue'
  },
  error: {
    invalidFile: "Invalid File",
    uploadFailed: "Upload Failed",
  },
  settings: {
    preview: {
      title: 'Paramètres de prévisualisation',
      renderTubes: "Tubes d'enduit",
      buildArea: 'Show Build Volume',
    },
    gcode: {
      title: 'Paramètres du code GC',
      buildPlateSwap: 'Construire la plaque échanger le code GCode'
    },
    display: {
      title: "Paramètres d'affichage",
      emptyFilaments: 'Cacher les filaments vides',
      showTotalCost: 'Afficher le coût total',
      showPrinterInfo: "Afficher les informations sur l'imprimante",
      compactMode: 'Mode compact',
      showPreview: 'Avant-première'
    }
  },
  fileUpload: {
    title: 'Télécharger les fichiers GCODE',
    dragDrop: 'Glissez et déposez vos fichiers GCODE ici',
    or: 'ou',
    browse: 'Parcourir les fichiers',
    fileListLabel: 'File List',
    inputLabel: 'File Input',
  },
  printSummary: {
    title: "Imprimer le résumé",
    compileGcode: "Compiler le code G",
    totalPrintTime: "Durée totale de l'impression: {time}",
    totalCost: "Coût totalt: {cost}",
    printer: {
      single: "Imprimante: {name}",
      multiple: "Imprimantes: {names}"
    },
    filament: {
      slot: "Filament {number}",
      weight: "{amount}g",
      cost: "${amount}"
    }
  },
  fileList: {
    quantity: {
      label: "Quantité d'impression"
    },
    dragHandle: "Faire glisser pour réorganiser",
    fileInfo: {
      file: "Fichier: {name}",
      filamentUsage: "Utilisation du filament:",
      printTime: "Temps d'impression:",
      totalTime: "Durée totale:"
    },
    deleteFile: "Delete File"
  }
};

export default translations;