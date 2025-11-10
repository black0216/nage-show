# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript project using Vite as the build tool. The project is a minimal starter template with basic routing setup.

## Development Commands

### Package Manager
This project uses `pnpm` as the package manager.

### Common Commands
- **Install dependencies**: `pnpm install`
- **Development server**: `pnpm dev` - Starts Vite dev server with hot reload
- **Build for production**: `pnpm build` - Runs type checking and builds the project
- **Type checking only**: `pnpm type-check` - Runs TypeScript compiler via vue-tsc
- **Preview build**: `pnpm preview` - Preview the production build locally

### Build Process
The build script uses `npm-run-all2` to run type checking and build in parallel:
- `vue-tsc --build` for TypeScript compilation
- `vite build` for bundling and minification

## Architecture

### Project Structure
```
src/
├── main.ts          # Application entry point
├── App.vue          # Root component
└── router/
    └── index.ts     # Vue Router configuration
```

### Key Technologies
- **Vue 3** with Composition API (`<script setup>`)
- **TypeScript** for type safety
- **Vue Router 4** for client-side routing
- **Vite** for build tooling and development server
- **Vue DevTools** plugin for development debugging

### Configuration Files
- `vite.config.ts` - Vite configuration with Vue plugin and path aliases
- `tsconfig.json` - TypeScript compiler options
- `tsconfig.app.json` - Application-specific TypeScript config
- `tsconfig.node.json` - Node.js/build tool TypeScript config

### Path Aliases
The `@` alias is configured to point to the `src/` directory for cleaner imports.

## Development Notes

### Node.js Version
Requires Node.js ^20.19.0 or >=22.12.0

### TypeScript Integration
- Uses `vue-tsc` for type checking `.vue` files
- Volar extension in VS Code is recommended for proper TypeScript support

### Application Overview
This is a Chinese gaming database website for a game called "nage-show". The application provides:
- Equipment database and lookup
- Monster drop tables
- Crafting recipes
- Player rankings
- Home dashboard with game statistics

### Project Structure
```
src/
├── main.ts                    # Application entry point
├── App.vue                    # Root component with navigation
├── router/
│   └── index.ts               # Vue Router configuration with hash routing
├── views/
│   ├── HomeView.vue           # Landing page with hero section and feature cards
│   ├── DropsView.vue          # Monster drop tables
│   ├── EquipmentView.vue      # Equipment database
│   ├── CraftingView.vue       # Crafting recipes
│   └── RankingView.vue        # Player rankings
├── components/
│   └── BackToTop.vue          # Global back-to-top button
└── style.css                  # Global styles
```

### Current State
This is a fully functional Vue 3 gaming database website with:
- Complete navigation system with 5 main routes
- Responsive design with dark theme
- Modern UI with gradients, animations, and particle effects
- Hash-based routing for GitHub Pages compatibility
- Gzip compression enabled for production builds
- Global components like BackToTop functionality