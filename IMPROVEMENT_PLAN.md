# Improvement Plan: HERDMind Multi-Variant Demo

## Overview

Plan for enhancing v2 and v3 variants, adding design system, home screen, and bottom navigation while keeping v1 unchanged.

---

## Phase 1: Design System Setup

### 1.1 Install Design System & Icons

**Decision: Use shadcn/ui + Lucide React icons**

```bash
npm install lucide-react
npx shadcn@latest init
npx shadcn@latest add button card input textarea
```

**Rationale:**
- shadcn/ui: Copy-paste components, no runtime dependency
- Lucide: High-quality, consistent icon set
- Minimal bundle impact
- Easy to customize

### 1.2 Create Shared Design Tokens

**File:** `lib/design-tokens.ts`

```typescript
export const colors = {
  primary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    500: '#14b8a6', // teal-500
    600: '#0d9488', // teal-600 (current brand)
    700: '#0f766e',
  },
  // ... full palette
};

export const spacing = { ... };
export const typography = { ... };
```

**File:** `tailwind.config.ts` - Extend with tokens

### 1.3 Shared Component Library

**Files to create:**
- `components/ui/Icon.tsx` - Wrapper for Lucide icons
- `components/ui/Button.tsx` - Enhanced button (v2/v3 only)
- `components/ui/Card.tsx` - Enhanced card (v2/v3 only)
- `components/ui/Progress.tsx` - Wizard progress indicator

**Note:** v1 uses existing components (no changes)

---

## Phase 2: Renaming & Navigation

### 2.1 Rename Variants

**Current → New:**
- `v1-basic` → `v1-current` (folder rename)
- `v2-visual` → `v2-progressive` (folder rename)
- `v3-chat` → `v3-conversational` (folder rename)

**Update:**
- `lib/variants.tsx` - type: `'current' | 'progressive' | 'conversational'`
- `app/page.tsx` - import paths
- `components/VariantSwitcher.tsx` - labels

### 2.2 Bottom Navigation Component

**File:** `components/BottomNav.tsx`

**Features:**
- 4 tabs: Home, v1-current, v2-progressive, v3-conversational
- Active state indicator
- Icon + label per tab
- Sticky bottom (inside device frame)
- Replaces top VariantSwitcher

**Design:**
- Teal accent for active tab
- Gray for inactive
- iOS-style bottom safe area

### 2.3 Home Screen

**File:** `components/HomeScreen.tsx`

**Content:**
- Welcome message
- 3 concept cards (one per variant)
- Each card shows:
  - Variant name (v1: Current, v2: Progressive, v3: Conversational)
  - Brief description (1-2 sentences)
  - Key differentiator
  - "Try this concept" button
- Visual preview (screenshot or mockup)

**Layout:**
- Scrollable list
- Cards use enhanced design system
- Click card → navigate to variant

---

## Phase 3: v2-Progressive Improvements

### 3.1 Replace Emojis with Lucide Icons

**File:** `components/variants/v2-progressive/FormScreen.tsx`

**Changes:**
```typescript
import { Users, User, UsersRound, Target, Leaf, X, Mirror, Star, Shield, Scale } from 'lucide-react';

const whoOptions = [
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'individuals', label: 'Individuals', icon: User },
  { id: 'groups', label: 'Groups', icon: UsersRound },
];

const propOptions = [
  { id: 'physical', label: 'Physical Tools', icon: Target },
  { id: 'natural', label: 'Natural Objects', icon: Leaf },
  { id: 'none', label: 'No Props', icon: X },
];

const themeOptions = [
  { id: 'identity', label: 'Identity', icon: Mirror },
  { id: 'leadership', label: 'Leadership', icon: Star },
  { id: 'boundaries', label: 'Boundaries', icon: Shield },
  { id: 'balance', label: 'Balance', icon: Scale },
];
```

**Icon Display:**
- Size: 24px (w-6 h-6)
- Color: teal-600 when selected, gray-400 when not
- Stroke width: 2

### 3.2 Progressive Wizard Flow

**File:** `components/variants/v2-progressive/WizardForm.tsx` (new)

**Flow:**
1. **Step 1: Welcome Screen**
   - Title: "Let's find your perfect session"
   - Subtitle: Brief intro text
   - "Get Started" button

2. **Step 2: Who** (one question per screen)
   - Progress indicator: "Step 1 of 3"
   - Question: "Who is this session for?"
   - 3 icon cards (same as before, but full screen)
   - Back button (disabled on first step)
   - Next button (enabled after selection)

3. **Step 3: Props**
   - Progress indicator: "Step 2 of 3"
   - Question: "Want to include props?"
   - 3 icon cards
   - Back/Next buttons

4. **Step 4: Theme**
   - Progress indicator: "Step 3 of 3"
   - Question: "Choose a theme"
   - 4 icon cards
   - Back/Submit buttons

**Components:**
- `WizardStep.tsx` - Wrapper for each step
- `ProgressBar.tsx` - Visual progress (dots or bar)
- `WizardNavigation.tsx` - Back/Next buttons

**Animation:**
- Slide transition between steps (framer-motion or CSS)
- Fade in selected option

### 3.3 Enhanced Visual Design

**Updates:**
- Use shadcn Card component (enhanced shadows, borders)
- Better spacing (design tokens)
- Subtle animations (hover, selection)
- Improved typography hierarchy
- Enhanced color palette (teal variations)

**Files to update:**
- `components/variants/v2-progressive/FormScreen.tsx` → `WizardForm.tsx`
- `components/variants/v2-progressive/ResultsScreen.tsx` - Enhanced cards
- `components/variants/v2-progressive/DetailScreen.tsx` - Enhanced accordions

---

## Phase 4: v3-Conversational Improvements

### 4.1 Free-Form Input

**File:** `components/variants/v3-conversational/ChatInput.tsx` (new)

**Features:**
- Text input field at bottom
- Send button (or Enter key)
- Character limit indicator (optional)
- Auto-focus on mount

**File:** `components/variants/v3-conversational/index.tsx`

**Changes:**
- Add `userInput` state
- Add `handleUserMessage` function
- Parse user input to extract intent
- Show input field when appropriate (not just quick replies)

### 4.2 Follow-Up Question Logic

**File:** `lib/conversationLogic.ts` (new)

**Functionality:**
```typescript
interface ConversationState {
  collected: {
    who?: string;
    props?: string;
    theme?: string;
  };
  needsClarification: boolean;
  currentQuestion?: string;
}

function parseUserInput(input: string, state: ConversationState): ConversationState {
  // Extract keywords
  // Match to categories
  // Determine if follow-up needed
  // Return updated state
}

function generateFollowUpQuestion(state: ConversationState): string {
  // If missing who: "Who is this session for?"
  // If missing props: "Do you want to use props?"
  // If missing theme: "What theme are you exploring?"
  // If all collected: "Let me find sessions for you..."
}
```

**Flow:**
1. User types free-form message
2. System extracts what it can
3. If incomplete → ask follow-up
4. If complete → show results
5. User can clarify anytime

### 4.3 Mock Conversation Suggestions

**File:** `components/variants/v3-conversational/ConversationSuggestions.tsx` (new)

**Component:**
- Shows 3-4 example conversations
- Each is a clickable card
- Card shows:
  - Conversation preview (2-3 messages)
  - Result: "Finds 5 sessions for teams exploring identity"
- Clicking card → loads that conversation flow

**Example Conversations:**
1. **Team Building**
   - "I need a session for my team"
   - Bot: "What theme?"
   - "Leadership and communication"
   - Result: Sessions for teams + leadership

2. **Individual Therapy**
   - "Working with someone on boundaries"
   - Bot: "Individual or group?"
   - "Individual"
   - Result: Sessions for individuals + boundaries

3. **Natural Props**
   - "I want to use natural objects with a group"
   - Bot: "What's the focus?"
   - "Identity and belonging"
   - Result: Sessions for groups + natural props + identity

**Implementation:**
- Store mock conversations as data
- On click, populate chat with those messages
- Trigger result display

### 4.4 Enhanced Chat UI

**Updates:**
- Better message bubbles (shadcn Card)
- Improved typing indicator
- Message timestamps (optional)
- Better spacing
- Enhanced colors (teal palette)

---

## Phase 5: Color Palette Enhancement

### 5.1 Unified Palette

**File:** `tailwind.config.ts`

**Extend colors:**
```typescript
colors: {
  brand: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488', // Primary
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  // Keep existing grays, etc.
}
```

### 5.2 Variant-Specific Enhancements

**v1-current:**
- Keep existing colors (no changes)

**v2-progressive:**
- Use brand-500 for primary actions
- brand-100 for backgrounds
- brand-700 for hover states
- Subtle gradients (brand-500 to brand-600)

**v3-conversational:**
- brand-600 for bot messages
- brand-50 for user messages (or white)
- brand-200 for input border
- Enhanced contrast

---

## Phase 6: App Structure Updates

### 6.1 New Routing Structure

**File:** `app/page.tsx`

**New structure:**
```typescript
export default function Home() {
  const { variant } = useVariant();
  
  if (variant === 'home') {
    return <HomeScreen />;
  }
  
  return (
    <DeviceFrame>
      {variant === 'current' && <V1Current />}
      {variant === 'progressive' && <V2Progressive />}
      {variant === 'conversational' && <V3Conversational />}
    </DeviceFrame>
  );
}
```

**File:** `lib/variants.tsx`

**Update type:**
```typescript
type Variant = 'home' | 'current' | 'progressive' | 'conversational';
```

### 6.2 Bottom Navigation Integration

**File:** `components/DeviceFrame.tsx`

**Update:**
- Add BottomNav inside device frame
- Position: fixed bottom
- Safe area padding

**File:** `components/BottomNav.tsx`

**Tabs:**
1. Home (overview)
2. Current (v1)
3. Progressive (v2)
4. Conversational (v3)

**Icons:**
- Home: Home (lucide)
- Current: FileText
- Progressive: Sparkles
- Conversational: MessageCircle

---

## Implementation Order

### Week 1: Foundation
1. ✅ Install shadcn + Lucide
2. ✅ Create design tokens
3. ✅ Build shared UI components
4. ✅ Rename folders and update imports

### Week 2: Navigation & Home
5. ✅ Build BottomNav component
6. ✅ Create HomeScreen
7. ✅ Update routing logic
8. ✅ Test navigation flow

### Week 3: v2-Progressive
9. ✅ Replace emojis with icons
10. ✅ Build wizard flow (one question per screen)
11. ✅ Add welcome screen
12. ✅ Enhance visual design

### Week 4: v3-Conversational
13. ✅ Add free-form input
14. ✅ Build conversation logic
15. ✅ Create mock conversation suggestions
16. ✅ Enhance chat UI

### Week 5: Polish
17. ✅ Apply color palette enhancements
18. ✅ Test all variants
19. ✅ Fix any issues
20. ✅ Final review

---

## File Structure After Changes

```
herd-demo/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (updated routing)
│   └── globals.css
├── components/
│   ├── DeviceFrame.tsx
│   ├── BottomNav.tsx (new)
│   ├── HomeScreen.tsx (new)
│   ├── ui/ (new - shadcn components)
│   │   ├── Icon.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Progress.tsx
│   └── variants/
│       ├── v1-current/ (renamed)
│       ├── v2-progressive/ (renamed)
│       │   ├── WizardForm.tsx (new)
│       │   ├── WizardStep.tsx (new)
│       │   ├── ProgressBar.tsx (new)
│       │   └── WelcomeScreen.tsx (new)
│       └── v3-conversational/ (renamed)
│           ├── ChatInput.tsx (new)
│           ├── ConversationSuggestions.tsx (new)
│           └── index.tsx (updated)
├── lib/
│   ├── variants.tsx (updated types)
│   ├── sessions.ts
│   ├── design-tokens.ts (new)
│   └── conversationLogic.ts (new)
└── tailwind.config.ts (enhanced colors)
```

---

## Estimated Effort

| Phase | Tasks | Hours |
|-------|-------|-------|
| Design System | Setup + components | 8-10 |
| Navigation | BottomNav + Home | 6-8 |
| v2 Improvements | Icons + wizard + welcome | 12-15 |
| v3 Improvements | Input + logic + suggestions | 15-18 |
| Color & Polish | Palette + testing | 4-6 |
| **Total** | | **45-57 hours** |

---

## Key Decisions

1. **Icons:** Lucide React (high quality, consistent)
2. **Design System:** shadcn/ui (copy-paste, customizable)
3. **Wizard:** One question per screen (better UX)
4. **Chat:** Free-form + follow-ups (more realistic)
5. **Navigation:** Bottom tabs (iOS standard)
6. **Colors:** Enhanced teal palette (unified but variant-specific)

---

## Notes

- v1-current remains unchanged (as requested)
- All changes isolated to v2 and v3 folders
- Design system shared but v1 doesn't use it
- Backward compatible (URL params still work)
- Clean removal still possible after selection

