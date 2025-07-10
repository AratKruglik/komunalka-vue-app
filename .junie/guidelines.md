# Komunalka Vue App - Development Guidelines

## Build/Configuration Instructions

### Prerequisites
- Node.js (version 18+ recommended)
- Yarn 4.9.2 (configured as package manager)

### Setup
```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

### Key Configuration Files
- **vite.config.js**: Vite configuration with Vue and Tailwind CSS plugins
- **package.json**: Uses ES modules (`"type": "module"`)
- **src/main.js**: Application entry point with Vue Router integration

## Testing Information

### Test Framework Setup
The project uses **Vitest** with **Vue Test Utils** for component testing:

- **Vitest**: Fast unit test framework built on Vite
- **@vue/test-utils**: Official Vue.js testing utilities
- **jsdom**: DOM environment for testing

### Running Tests
```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run
```

### Test Configuration
- Tests are configured in `vite.config.js` with `globals: true` and `jsdom` environment
- Test files should be placed alongside components with `.test.js` extension
- Global test utilities (describe, it, expect) are available without imports

### Adding New Tests
1. Create test files next to components: `ComponentName.test.js`
2. Import testing utilities and the component:
   ```javascript
   import { mount } from '@vue/test-utils'
   import { describe, it, expect } from 'vitest'
   import ComponentName from './ComponentName.vue'
   ```
3. Write test cases using describe/it blocks
4. Use Vue Test Utils methods like `mount()`, `wrapper.find()`, etc.

### Example Test Structure
```javascript
describe('ComponentName', () => {
  it('renders properly with props', () => {
    const wrapper = mount(ComponentName, {
      props: { /* test props */ }
    })
    
    expect(wrapper.find('selector').exists()).toBe(true)
    expect(wrapper.text()).toContain('expected text')
  })
})
```

## Architecture & Code Organization

### Project Structure
```
src/
├── components/
│   ├── UI/           # Reusable UI components
│   │   ├── buttons/  # Button components
│   │   ├── forms/    # Form components (Checkbox, etc.)
│   │   └── logo/     # Logo components
│   └── pages/        # Page components (LoginPage, etc.)
├── router/           # Vue Router configuration
├── assets/           # Static assets
├── App.vue          # Root component
├── main.js          # Application entry point
└── style.css        # Global styles
```

### Technology Stack
- **Vue 3**: Using Composition API with `<script setup>` syntax
- **Vue Router 4**: Client-side routing with history mode
- **Vite**: Build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible UI components
- **Heroicons**: SVG icon library

### Component Guidelines
- Use `<script setup>` syntax for new components
- Organize UI components by category (buttons, forms, etc.)
- Place page components in `components/pages/`
- Use Tailwind CSS classes for styling
- Leverage Headless UI for complex interactive components

### Router Configuration
- Routes defined in `src/router/router.js`
- Uses `createWebHistory()` for clean URLs
- Import page components and define route mappings

### Development Best Practices
- Follow Vue 3 Composition API patterns
- Use TypeScript-style prop definitions with validation
- Implement proper component testing for UI components
- Maintain consistent file naming and organization
- Utilize Tailwind's utility classes over custom CSS when possible

## Additional Notes
- The project uses Yarn workspaces configuration
- Tailwind CSS is integrated via Vite plugin for optimal performance
- All components should be tested with both prop validation and rendering tests
- Consider accessibility when using Headless UI components