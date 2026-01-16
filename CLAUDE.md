# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the marketing website for **runqy** - a distributed task queue system. Built with SvelteKit 2, Svelte 5, Tailwind 4, and Skeleton UI 4.

## Commands

```bash
# Development
npm run dev          # Start dev server with hot reload

# Build & Preview
npm run build        # Production build
npm run preview      # Preview production build locally

# Type Checking
npm run check        # One-time type check
npm run check:watch  # Watch mode type checking
```

## Tech Stack

- **SvelteKit 2** — Full-stack framework with `adapter-static` for static site generation
- **Svelte 5** — Uses runes syntax (`$props()`, `$state()`, etc.)
- **Tailwind 4** — Utility-first CSS via Vite plugin (not PostCSS)
- **Skeleton UI 4** — Component library and design system

## Deployment

Deployed to **Azure Static Web Apps** via GitHub Actions. On push to `main`, the workflow:
1. Installs dependencies with `npm ci`
2. Builds static site to `build/` directory
3. Deploys to Azure

The static adapter is configured in `svelte.config.js` with `fallback: 'index.html'` for SPA routing.

## Architecture

```
src/
├── app.html           # HTML shell (data-theme="cerberus")
├── app.d.ts           # App type declarations
└── routes/
    ├── +layout.svelte # Root layout with CSS imports
    ├── +layout.ts     # Prerender config (prerender = true)
    ├── layout.css     # Tailwind + Skeleton CSS imports
    └── +page.svelte   # Landing page
```

## Styling

Global styles are imported in `src/routes/layout.css`:
```css
@import 'tailwindcss';
@import '@skeletonlabs/skeleton';
@import '@skeletonlabs/skeleton-svelte';
@import '@skeletonlabs/skeleton/themes/cerberus';
```

The theme is set via `data-theme="cerberus"` on the `<html>` element in `app.html`.

**Skeleton presets**: Use `preset-*` classes for buttons, cards, etc. (e.g., `preset-filled-primary-500`, `preset-outlined-surface-500`).

## Svelte 5 Patterns

This project uses Svelte 5 runes:
- Props: `let { children } = $props();`
- State: `let count = $state(0);`
- Render children: `{@render children()}`

Avoid Svelte 4 patterns like `export let` or `$$slots`.
