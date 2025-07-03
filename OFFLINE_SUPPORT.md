# Offline Support with Serwist

This application now includes offline support using Serwist, a modern service worker toolkit for Next.js applications.

## What's Been Added

### 1. Service Worker Configuration

- **File**: `app/sw.ts`
- **Purpose**: Configures the service worker with caching strategies for different types of content
- **Features**:
  - Precaches static assets for offline access
  - Uses default caching strategies from Serwist
  - Handles Firebase Storage images
  - Caches API responses and pages

### 2. Service Worker Registration

- **File**: `components/ServiceWorkerRegistration.tsx`
- **Purpose**: Registers the service worker in the browser
- **Features**:
  - Only loads in production
  - Provides user notifications for updates
  - Handles service worker lifecycle events

### 3. Network Status Indicator

- **File**: `components/NetworkStatus.tsx`
- **Purpose**: Shows users their current connection status
- **Features**:
  - Displays offline/online status
  - Auto-hides after 3 seconds when back online
  - Fixed position indicator in bottom-right corner

### 4. Offline Fallback Page

- **File**: `app/offline/page.tsx`
- **Purpose**: Provides a user-friendly offline experience
- **Features**:
  - Explains what content is available offline
  - Provides options to retry or return home
  - Lists available offline features

### 5. Enhanced Web Manifest

- **File**: `public/site.webmanifest`
- **Purpose**: Provides comprehensive PWA metadata
- **Features**:
  - Complete app information for installation
  - Proper icons and theme colors
  - Shortcuts to key app sections
  - Offline-first configuration

## Next.js Configuration

The `next.config.ts` file has been updated to integrate Serwist with Turbopack compatibility:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

// Only apply Serwist for production builds to avoid Turbopack conflicts
let finalConfig = nextConfig;

if (
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PHASE === "phase-production-build"
) {
  const withSerwistInit = require("@serwist/next").default;

  const withSerwist = withSerwistInit({
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
    additionalPrecacheEntries: [
      { url: "/", revision: "1" },
      { url: "/offline", revision: "1" },
    ],
  });

  finalConfig = withSerwist(nextConfig);
}

export default finalConfig;
```

## How It Works

### Caching Strategy

1. **Static Assets**: Cached using CacheFirst strategy for long-term storage
2. **Pages**: Cached using NetworkFirst with 24-hour expiration
3. **API Responses**: Cached using NetworkFirst with 24-hour expiration
4. **Images**: Cached using CacheFirst for 30 days
5. **Fonts**: Cached using CacheFirst for 1 year
6. **Firebase Images**: Cached using CacheFirst for 30 days

### User Experience

1. **First Visit**: Content is cached for offline use
2. **Subsequent Visits**: Content loads from cache if offline
3. **Network Changes**: Users are notified when going offline/online
4. **Updates**: Users are informed when new content is available

## Features Available Offline

- Previously visited pages
- Cached liturgical texts
- Downloaded book images
- Basic app functionality
- Navigation between cached pages

## Installation as PWA

Users can install the app on their devices:

1. Chrome: "Add to Home Screen" or "Install App" option
2. Safari: "Add to Home Screen" from share menu
3. Edge: "Install App" option in browser menu

## Testing Offline Functionality

1. **Development**: Service worker is disabled for easier debugging
2. **Production**:
   - Build the app: `npm run build`
   - Serve statically: Use any static file server
   - Test offline: Use browser DevTools to simulate offline conditions

## Browser Support

- Chrome/Chromium browsers: Full support
- Firefox: Full support
- Safari: Full support
- Edge: Full support
- Mobile browsers: Full support on modern versions

## Important Notes

- Service worker only runs in production builds
- HTTPS is required for service worker registration (except localhost)
- First visit requires internet connection
- Service worker updates automatically on app updates

## Turbopack Compatibility

The configuration has been optimized to work with Next.js Turbopack:

- **Development**: Serwist is completely disabled, avoiding any Webpack/Turbopack conflicts
- **Production**: Serwist is only applied during the build phase
- **No warnings**: The conditional configuration eliminates Turbopack warnings

### Scripts Available:

- `npm run dev` - Uses Turbopack (fastest, no service worker)
- `npm run dev:webpack` - Uses Webpack if needed for testing
- `npm run build` - Production build with service worker

## Troubleshooting

If the service worker isn't working:

1. Check browser console for errors
2. Ensure you're running a production build
3. Verify HTTPS is being used (or localhost)
4. Clear browser cache and service worker registration
5. Check Network tab in DevTools for service worker registration

## Future Enhancements

Potential improvements for offline support:

- Background sync for offline form submissions
- Push notifications for updates
- Selective content downloads
- Offline search functionality
- Better conflict resolution for offline edits
