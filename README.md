# HERDMind® Session Planner - Multi-Variant Demo

Three design concepts for the HERDMind session planning application.

## Variants

### v1: Current
- Direct port of existing HTML design
- Traditional dropdown form (all questions at once)
- Full session details
- Familiar UX pattern

### v2: Progressive
- Modern step-by-step wizard (one question per screen)
- Icon-based selection with Lucide icons
- Progress indicator
- Live result count
- Welcome screen with intro text

### v3: Conversational
- Chat-based interface
- Free-form text input + smart follow-ups
- Mock conversation examples
- Natural language interaction
- Intro screen with session plan philosophy

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3001`

## Navigation

- **Home Screen**: Overview of all 3 concepts
- **Bottom Navigation**: Switch between Home, v1-current, v2-progressive, v3-conversational
- **URL Params**: Share specific variants
  - `?v=home`
  - `?v=current`
  - `?v=progressive`
  - `?v=conversational`

## Tech Stack

- **Framework**: Next.js 15 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React (no emojis)
- **State**: React Context
- **Data**: 269 sessions from CSV

## Design System

- **Color Palette**: Unified teal (50-900)
- **Components**: shadcn/ui (Button, Card, Input, Textarea, Progress)
- **Icons**: Lucide React (consistent, high-quality)
- **Typography**: SF Pro Display system font

## Features Comparison

| Feature | v1: Current | v2: Progressive | v3: Conversational |
|---------|-------------|-----------------|---------------------|
| Intro screen | ✓ Modal | ✓ With welcome | ✓ Philosophy text |
| Form style | Dropdowns | Wizard steps | Free-form chat |
| Navigation | Linear | Step-by-step | Conversational |
| Icons | SVG inline | Lucide icons | Lucide icons |
| Progress | None | Visual bar | Conversation flow |
| Results | List view | Match badges + sort | Chat cards |
| Detail | Scroll view | Accordions + carousel | Inline card |

## Post-Selection Cleanup

Once client selects winning variant:

```bash
# Example: v2 wins
rm -rf components/variants/v1-current/
rm -rf components/variants/v3-conversational/
mv components/variants/v2-progressive/* components/
rm -rf components/variants/
rm components/BottomNav.tsx
rm components/HomeScreen.tsx
```

Update `app/page.tsx` and `lib/variants.tsx` to remove variant logic.

## Deployment

```bash
npm run build
vercel deploy
```

Or connect Git repository to Vercel dashboard for automatic deployments.
