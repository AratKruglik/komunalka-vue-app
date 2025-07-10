# Komunalka Vue App

A modern Vue 3 application for managing komunalka (shared apartment) expenses and utilities, built with Vite and styled with Tailwind CSS.

## ✨ Features

- **Modern Vue 3**: Built with Vue 3 Composition API and `<script setup>` syntax
- **Fast Development**: Powered by Vite for lightning-fast HMR and builds
- **Beautiful UI**: Styled with Tailwind CSS 4 and Headless UI components
- **Routing**: Client-side routing with Vue Router 4
- **Testing**: Comprehensive testing setup with Vitest and Vue Test Utils
- **Icons**: Beautiful icons from Heroicons
- **TypeScript Ready**: Full TypeScript support for enhanced development experience

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18+ recommended)
- Yarn 4.9.2 (configured as package manager)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd komunalka-vue-app

# Install dependencies
yarn install

# Start development server
yarn dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

```bash
# Development
yarn dev          # Start development server with hot reload

# Building
yarn build        # Build for production
yarn preview      # Preview production build locally

# Testing
yarn test         # Run tests in watch mode
yarn test:run     # Run tests once
```

## 🏗️ Technology Stack

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Vue Router 4](https://router.vuejs.org/)** - Official router for Vue.js
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Headless UI](https://headlessui.com/)** - Unstyled, accessible UI components
- **[Heroicons](https://heroicons.com/)** - Beautiful hand-crafted SVG icons
- **[Vitest](https://vitest.dev/)** - Fast unit test framework
- **[Vue Test Utils](https://test-utils.vuejs.org/)** - Official testing utilities for Vue

## 📁 Project Structure

```
src/
├── components/
│   ├── UI/           # Reusable UI components
│   │   ├── buttons/  # Button components
│   │   ├── forms/    # Form components (Checkbox, etc.)
│   │   └── logo/     # Logo components
│   └── pages/        # Page components
├── router/           # Vue Router configuration
├── assets/           # Static assets
├── App.vue          # Root component
├── main.js          # Application entry point
└── style.css        # Global styles
```

## 🧪 Testing

The project uses Vitest with Vue Test Utils for component testing:

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run
```

Test files should be placed alongside components with `.test.js` extension.

## 🛠️ Development

### Code Style
- Use Vue 3 Composition API with `<script setup>` syntax
- Organize UI components by category (buttons, forms, etc.)
- Use Tailwind CSS classes for styling
- Follow Vue.js best practices and conventions

### Adding New Components
1. Create components in appropriate directories under `src/components/`
2. Use TypeScript-style prop definitions with validation
3. Add corresponding test files with `.test.js` extension
4. Import and use in parent components or pages

### Routing
Routes are defined in `src/router/router.js`. To add new routes:
1. Create page component in `src/components/pages/`
2. Import and add route configuration
3. Use `<router-link>` for navigation

## 📚 Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vitest Documentation](https://vitest.dev/)

## 📄 License

This project is private and not licensed for public use.
