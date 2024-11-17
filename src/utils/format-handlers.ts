/**
 * Formats time from minutes to a human-readable string in hours and minutes
 * @param minutes - Time in minutes
 * @returns Formatted string in the format "Xh Ym"
 */
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}m`;
}

/**
 * Formats a weight value to a string with 2 decimal places and 'g' suffix
 * @param weight - Weight value in grams
 * @returns Formatted string in the format "X.XXg"
 */
export function formatWeight(weight: number): string {
  return `${weight.toFixed(2)}g`;
}

/**
 * Formats a cost value to a string with 2 decimal places and '$' prefix
 * @param cost - Cost value
 * @returns Formatted string in the format "$X.XX"
 */
export function formatCost(cost: number): string {
  return `$${cost.toFixed(2)}`;
}

/**
 * Gets the contrast color (black or white) for a given background color
 * @param hexColor - Hex color code (with or without #)
 * @returns '#000000' for light backgrounds, '#FFFFFF' for dark backgrounds
 */
export function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 2), 16);
  const b = parseInt(hex.slice(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
}

/**
 * Formats a color value to ensure it has a '#' prefix
 * @param color - Color value (hex)
 * @returns Formatted color with '#' prefix
 */
export function formatColor(color: string): string {
  return color.startsWith('#') ? color : `#${color}`;
}

/**
 * Creates a plural form of a word based on a count
 * @param count - Number to base pluralization on
 * @param singular - Singular form of the word
 * @param plural - Optional plural form (if not provided, adds 's' to singular)
 * @returns Appropriate form of the word
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || `${singular}s`);
}