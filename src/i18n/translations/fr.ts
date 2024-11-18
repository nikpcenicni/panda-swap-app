import type { TranslationKeys } from '../config';

const translations: TranslationKeys = {
  app: {
    title: "Panda Swap",
    description: "Mettez vos fichiers d'impression en file d'attente pour Panda Swap",
    welcome: "Bienvenue à Panda Swap",
  },
  common: {
    toggleTheme: 'Toggle theme',
    settings: 'Paramètres',
    language: 'Langue'
  },
  error: {
    invalidFile: "Fichier invalide",
    uploadFailed: "Échec du téléchargement",
  },
  settings: {
    preview: {
      title: 'Aperçu du fichier',
      renderTubes: "Tubes d'enduit",
      buildArea: 'Volume de construction',
      showPreview: 'Avant-première',
    },
    gcode: {
      title: 'Paramètres GCODE',
      buildPlateSwap: 'Construire la plaque Échanger le GCODE'
    },
    display: {
      title: 'Imprimer le résumé',
      emptyFilaments: 'Filament inutilisé',
      showTotalCost: 'Coût total',
      showPrinterInfo: "Informations sur l'imprimante",
      compactMode: 'Mode compact',
    }
  },
  fileUpload: {
    title: 'Télécharger les fichiers GCODE',
    dragDrop: 'Glissez et déposez vos fichiers GCODE ici',
    or: 'ou',
    browse: 'Parcourir les fichiers',
    fileListLabel: 'Liste des fichiers',
    inputLabel: 'Entrée du fichier',
  },
  printSummary: {
    title: "Imprimer le résumé",
    compileGcode: "Compiler",
    totalPrintTime: "Durée totale de l'impression: {time}",
    totalCost: "Coût total: {cost}",
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
    deleteFile: "Supprimer le fichier"
  }
};

export default translations;