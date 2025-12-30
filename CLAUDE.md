# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Werewolf New Year Eve is a mobile-first React SPA providing comprehensive information, rules, and tools for a 12-player werewolf game with a New Year theme. It features a dark, mysterious atmosphere with Chinese localization.

## Commands

```bash
# Development
npm run dev              # Start dev server on port 8080

# Building
npm run build            # Production build
npm run build:dev        # Development build
npm run preview          # Preview production build

# Linting
npm run lint             # Run ESLint
```

## Architecture

### Tech Stack
- React 18 + TypeScript (non-strict mode)
- Vite with SWC plugin for fast HMR
- React Router for client-side routing
- shadcn/ui + Radix UI for components
- Tailwind CSS with custom design system
- TanStack Query configured (currently unused)

### Route Structure
```
/           - Index (landing page with New Year countdown Easter egg)
/quickstart - QuickStart (beginner's guide)
/rules      - GameRules (detailed rules reference)
/judge      - Judge (timer and voice command tools)
*           - NotFound (404 page)
```

### Key Directories
- `src/components/ui/` - shadcn/ui components (30+ Radix-based primitives)
- `src/components/layout/` - PageLayout (with sticky header), BottomNav (mobile navigation)
- `src/data/roles.ts` - Complete role definitions with strategies
- `src/pages/` - Main page components

### Design System

**Faction Colors** (in tailwind.config.ts):
- `wolf`: Red (#ff0000) - for werewolf roles
- `seer`: Blue (#0099ff) - for god roles
- `villager`: Green (#00cc66) - for civilians
- `primary`: Gold - premium/brand color
- `moon`: Special lunar-themed color

**Custom Animations**:
- `pulse-glow` - Magical/breathing effects
- `float` - Floating elements (3s)
- `fade-in` - Smooth entry (0.5s)
- `shimmer` - Shimmer gradient (3s)

**Typography**:
- Noto Serif SC - Serif font for headings
- Noto Sans SC - Sans-serif for body text

### Role Data Model

The `Role` interface in `src/data/roles.ts` defines:
- `id`, `name`, `icon`
- `camp`: "wolf" | "seer" | "villager" | "special"
- `shortDesc`, `description`, `winCondition`
- `skills[]`, `strategies[]`, `notes[]`

Roles are categorized into 8 unique types across 4 camps (4 wolves, 4 god roles + sheriff special role).

### Mobile-First Considerations

The app is designed mobile-first with:
- `max-w-lg` container constraint throughout
- `pb-20` padding bottom for bottom navigation
- `safe-area-bottom` considerations for iOS
- Touch-friendly components from shadcn/ui

## Development Notes

- No test framework is configured
- TypeScript is configured in non-strict mode
- The app is a pure client-side SPA (no SSR)
- Lovable platform integration for visual editing
- Chinese localization with cultural references (poetry, lunar calendar)
