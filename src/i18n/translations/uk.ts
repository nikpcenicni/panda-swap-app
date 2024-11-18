import type { TranslationKeys } from '../config';

const translations: TranslationKeys = {
  app: {
    title: "Панда Своп",
    description: "Поставте свої файли для друку в чергу на Панда Своп",
    welcome: "Ласкаво просимо до Панда Своп",
  },
  common: {
    toggleTheme: 'Переключити тему',
    settings: 'Налаштування',
    language: 'Мова'
  },
  error: {
    invalidFile: "Неправильний файл",
    uploadFailed: "Не вдалося завантажити",
  },
  settings: {
    preview: {
      title: 'Налаштування попереднього перегляду файлів',
      renderTubes: 'Трубки рендерингу',
      buildArea: "Створіть об'єм",
      showPreview: 'Попередній перегляд',
    },
    gcode: {
      title: 'Налаштування GCode',
      buildPlateSwap: 'Збірка GCode заміни пластин'
    },
    display: {
      title: 'Роздрукувати резюме',
      emptyFilaments: 'Невикористана нитка',
      showTotalCost: 'Загальна вартість',
      showPrinterInfo: 'Інформація про принтер',
      compactMode: 'Компактний режим',
    }
  },
  fileUpload: {
    title: 'Завантажити файли GCODE',
    dragDrop: 'Перетягніть свої файли GCODE сюди',
    or: 'чи',
    browse: 'Перегляд файлів',
    fileListLabel: 'Список файлів',
    inputLabel: 'Введення файлу',
  },
  printSummary: {
    title: "Роздрукувати резюме",
    compileGcode: "Скомпілювати",
    totalPrintTime: "Загальний час друку: {time}",
    totalCost: "Загальна вартість: {cost}",
    printer: {
      single: "Принтер: {name}",
      multiple: "Принтери: {names}"
    },
    filament: {
      slot: "Нитка {number}",
      weight: "{amount}g",
      cost: "${amount}"
    }
  },
  fileList: {
    quantity: {
      label: "Кількість відбитків"
    },
    dragHandle: "Перетягніть, щоб змінити порядок",
    fileInfo: {
      file: "Файл: {name}",
      filamentUsage: "Використання ниток:",
      printTime: "Час друку:",
      totalTime: "Загальний час:"
    },
    deleteFile: "Видалити файл"
  }
};

export default translations;