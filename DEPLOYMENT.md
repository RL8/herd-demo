# Deployment Guide

## Quick Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

Follow the prompts. Your app will be live in minutes.

## Share with Client

After deployment, share these URLs:

- **V1 Basic**: `https://your-app.vercel.app/?v=basic`
- **V2 Visual**: `https://your-app.vercel.app/?v=visual`
- **V3 Chat**: `https://your-app.vercel.app/?v=chat`

The client can toggle between variants using the switcher at the top.

## Testing Locally

```bash
npm run dev
```

Then visit:
- http://localhost:3001/?v=basic
- http://localhost:3001/?v=visual
- http://localhost:3001/?v=chat

## Post-Selection Cleanup

Once the client selects a winning variant, clean up:

```bash
# Example: V2 Visual wins
rm -rf components/variants/v1-basic/
rm -rf components/variants/v3-chat/
mv components/variants/v2-visual/* components/
rm -rf components/variants/
rm components/VariantSwitcher.tsx
```

Then update `app/page.tsx` to remove variant logic:

```tsx
import DeviceFrame from '@/components/DeviceFrame';
import V2Visual from '@/components/V2Visual'; // Renamed from v2-visual/index

export default function Home() {
  return (
    <DeviceFrame>
      <V2Visual />
    </DeviceFrame>
  );
}
```

Remove variant context from `app/layout.tsx`.

Done! Clean production-ready codebase.

