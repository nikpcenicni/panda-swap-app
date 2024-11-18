# Contributing to Our Astro Project

Thank you for your interest in contributing! This guide will help you understand our development process and coding standards.

## 🔍 Project Overview

This is a TypeScript-based Astro project that uses:
- Astro for the framework
- TypeScript for type safety
- Tailwind CSS for styling
- Nanostores for state management

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/project-name.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── pages/         # Route components
├── store/         # State management
├── types/         # TypeScript type definitions
└── utils/         # Helper functions and utilities
```

## 💻 Development Guidelines

### TypeScript

- Always use strict typing
- Define interfaces and types in dedicated files under `src/types/`
- Use type inference where it makes code clearer
- Export types and interfaces that will be used across multiple files

Example:
```typescript
// src/types/example.ts
export interface ComponentProps {
  title: string;
  description?: string;
  onClick: (id: string) => void;
}
```

### Components

- Use functional components
- Props should be strictly typed
- Keep components focused and single-responsibility
- Place props interfaces in separate `.props.ts` files

Example:
```typescript
// src/components/ExampleComponent.props.ts
export interface ExampleComponentProps {
  title: string;
  onAction: () => void;
}

// src/components/ExampleComponent.tsx
import type { ExampleComponentProps } from './ExampleComponent.props';

export default function ExampleComponent({ title, onAction }: ExampleComponentProps) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-bold">{title}</h2>
      <button 
        onClick={onAction}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Click me
      </button>
    </div>
  );
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CSS custom properties for theme values
- Maintain dark mode support using `dark:` variant

Example:
```typescript
<div className="
  p-4 
  bg-white dark:bg-gray-800
  rounded-lg
  shadow-sm
  md:p-6 
  lg:p-8
">
```

### State Management

- Use Nanostores for global state
- Keep stores focused and minimal
- Export typed actions for state modifications
- Document store purpose and usage

Example:
```typescript
// src/store/example-store.ts
import { atom } from 'nanostores';
import type { ExampleData } from '../types/example';

export const exampleStore = atom<ExampleData[]>([]);

export function addExample(data: ExampleData): void {
  const current = exampleStore.get();
  exampleStore.set([...current, data]);
}
```

### Utils and Helpers

- Create utility functions for reusable logic
- Use pure functions where possible
- Add JSDoc comments for complex functions
- Include unit tests for utilities

Example:
```typescript
// src/utils/formatters.ts
/**
 * Formats a number of minutes into hours and minutes string
 * @param minutes - Total number of minutes
 * @returns Formatted string (e.g., "2h 30m")
 */
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}m`;
}
```

## 🧪 Testing

- Write unit tests for utilities and helpers
- Add component tests for complex components
- Test dark mode and responsive variants
- Include accessibility tests

## 📝 Pull Request Process

1. Update relevant documentation
2. Add/update tests as needed
3. Ensure all tests pass
4. Update type definitions if necessary
5. Follow the PR template
6. Request review from maintainers

## 🎨 Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in objects and arrays
- Use meaningful variable and function names
- Keep lines under 80 characters when possible

## 🚫 Common Pitfalls

- Avoid `any` types unless absolutely necessary
- Don't use inline styles - use Tailwind classes
- Avoid direct DOM manipulation
- Don't commit `.env` files
- Keep components focused and not too large

## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Nanostores Documentation](https://github.com/nanostores/nanostores)

## 🤝 Getting Help

- Create an issue for bugs
- Use discussions for questions
- Join our Discord community
- Tag maintainers for urgent issues

Remember to be kind and respectful to other contributors. We're all here to build something great together!