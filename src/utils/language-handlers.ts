export function toggleLanguageDropdown(dropdownId: string): void {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }
  
  export function setupLanguageHandlers(
    buttonId: string,
    dropdownId: string,
    onLanguageChange: (lang: string) => void
  ): () => void {
    const button = document.getElementById(buttonId);
    const dropdown = document.getElementById(dropdownId);
  
    if (!button || !dropdown) return () => {};
  
    const handleClickOutside = (e: MouseEvent) => {
      if (!button.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
        dropdown.classList.add('hidden');
      }
    };
  
    const handleLanguageSelect = (e: MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      const lang = target.dataset.lang;
      if (lang) {
        onLanguageChange(lang);
      }
    };
  
    // Add event listeners
    button.addEventListener('click', () => toggleLanguageDropdown(dropdownId));
    dropdown.addEventListener('click', handleLanguageSelect);
    document.addEventListener('click', handleClickOutside);
  
    // Return cleanup function
    return () => {
      button.removeEventListener('click', () => toggleLanguageDropdown(dropdownId));
      dropdown.removeEventListener('click', handleLanguageSelect);
      document.removeEventListener('click', handleClickOutside);
    };
  }
  