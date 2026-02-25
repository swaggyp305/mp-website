# Quick Start Guide

## Step-by-Step Setup (30 minutes)

### 1. Initialize Your Project (5 min)

```bash
# Create new Next.js app
npx create-next-app@latest retro-portfolio --typescript --tailwind --app --src-dir --import-alias "@/*"

cd retro-portfolio

# Initialize git
git init
git add .
git commit -m "Initial commit"
```

### 2. Replace Configuration Files (5 min)

Replace these files with the ones provided:
- `tailwind.config.ts` → Copy from starter files
- `package.json` → Merge dependencies from starter file
- `.env.example` → Copy as-is

Then install dependencies:
```bash
npm install
```

### 3. Setup Database (10 min)

**Option A: Vercel Postgres (Recommended)**
1. Go to https://vercel.com/dashboard
2. Create new project → Storage → Postgres
3. Copy connection string
4. Create `.env.local`:
```bash
DATABASE_URL="your-vercel-postgres-connection-string"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

**Option B: Local Postgres**
```bash
# Install Postgres, then:
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"
```

Create Prisma schema:
```bash
mkdir prisma
# Copy schema.prisma from starter files to prisma/schema.prisma
```

Push schema to database:
```bash
npx prisma db push
npx prisma generate
```

### 4. Setup Project Structure (5 min)

Create the folder structure:
```bash
# From project root
mkdir -p lib/stores
mkdir -p components/{layout,ui,typing,3d}
mkdir -p app/api/{auth,scores,leaderboard,contact}
mkdir -p public/models
```

Copy starter files:
- `stores.ts` → `lib/stores/index.ts`

### 5. Verify Setup (5 min)

Run the dev server:
```bash
npm run dev
```

Open http://localhost:3000 - you should see the default Next.js page.

Check database connection:
```bash
npx prisma studio
```

This should open Prisma Studio at http://localhost:5555.

---

## What to Build First

### Day 1: Basic Layout (2-3 hours)

**Create these components:**

1. `components/layout/Navigation.tsx`
```typescript
// Navigation bar with retro styling
// Links to: Home, About, Projects, Resume, Contact, Typing
```

2. `components/layout/RetroContainer.tsx`
```typescript
// Main content wrapper with retro border and effects
```

3. `app/page.tsx`
```typescript
// Homepage with introduction and CTA to typing test
```

**Test:** Navigate between pages, verify retro styling works

### Day 2: Typing Test Core (3-4 hours)

**Create these components:**

1. `components/typing/TypingTest.tsx` - Main container
2. `components/typing/WordDisplay.tsx` - Text with highlighting
3. `components/typing/TypingInput.tsx` - Input handler
4. `components/typing/StatsDisplay.tsx` - Live WPM/accuracy

**Use the Zustand store from `lib/stores/index.ts`**

**Test:** Complete a typing test, see WPM calculated correctly

### Day 3: Database Integration (2-3 hours)

**Create API routes:**

1. `app/api/auth/guest/route.ts` - Guest user creation
2. `app/api/scores/route.ts` - Score submission
3. `app/api/leaderboard/route.ts` - Fetch top scores

**Test:** Submit a score, see it in database via Prisma Studio

### Day 4: Leaderboard UI (2 hours)

**Create components:**

1. `components/typing/Leaderboard.tsx`
2. `components/typing/ScoreSubmit.tsx`

**Test:** Submit score → See on leaderboard → Verify in database

---

## Pro Tips for Copilot

### 1. Component Templates

Start each component like this:
```typescript
/**
 * TypingTest Component
 * 
 * Main typing test container that manages the test lifecycle.
 * 
 * Features:
 * - Generates random words from word list
 * - Tracks WPM using formula: (correct_chars / 5) / time_in_minutes
 * - Shows real-time accuracy as percentage
 * - Handles keyboard input and backspace
 * 
 * See PRD Section 6.3 for state interface
 */

import { useTypingTestStore } from '@/lib/stores';

export function TypingTest() {
  // Let Copilot autocomplete based on the comment
}
```

### 2. Type Definitions First

Define interfaces before implementation:
```typescript
interface WordDisplayProps {
  text: string;
  userInput: string;
  currentIndex: number;
}
```

Then Copilot will suggest correct props usage.

### 3. Reference the PRD

In comments, reference specific sections:
```typescript
// Calculate WPM per PRD Section 4.2.1
// Formula: (total_characters / 5) / (time_in_minutes)
```

### 4. Use Descriptive Names

```typescript
// Good - Copilot knows what to do
const calculateWordsPerMinute = (chars: number, seconds: number) => {

// Bad - Copilot might guess wrong
const calc = (c: number, s: number) => {
```

---

## Common Issues

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Module not found: Can't resolve 'zustand'"
```bash
npm install zustand
```

### 3D scene causing errors
```bash
# Install peer dependencies
npm install three @types/three
```

### TypeScript errors in .config files
Ignore these during initial setup - they won't affect runtime.

---

## Next Steps After Setup

1. Read through PRD Section 6 (Component Architecture)
2. Create component skeletons with TypeScript interfaces
3. Let Copilot fill in implementations
4. Test each component individually
5. Integrate pieces together
6. Add 3D scene last (most complex)

---

## Need Help?

- **Database issues**: Re-read PRD Section 5
- **Component structure**: Check PRD Section 6.2
- **API endpoints**: Reference PRD Section 7.3.2
- **Styling**: Use Tailwind classes from `tailwind.config.ts`

Remember: Build vertically (one feature end-to-end) rather than horizontally (all components at once).
