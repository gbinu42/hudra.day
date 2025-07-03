# Offline Support with Serwist

This application now includes offline support using Serwist, a modern service worker toolkit for Next.js applications.

## What's Been Added

### 1. Service Worker Configuration

- **File**: `app/sw.ts`
- **Purpose**: Configures the service worker with comprehensive offline support for all routes
- **Features**:
  - **Custom Navigation Handler**: Handles all HTML pages including `/books`, `/type.html`, and dynamic routes
  - **Network-First Strategy**: Tries network first, falls back to cache automatically
  - **Complete Route Coverage**: Covers navigation requests, documents, and all HTML files
  - **Smart Offline Fallback**: Shows styled offline page when content not cached
  - **Image Caching**: Cache-first strategy for optimal performance and offline viewing
  - **Firebase Storage**: Dedicated caching for Firebase-hosted images and content

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

1. **Navigation & HTML Pages**: Network-first with cache fallback and offline page as last resort
   - Covers `/books`, `/type.html`, `/texts`, `/admin`, and all other routes
   - Automatically caches successful responses for offline access
2. **Images**: Cache-first strategy for optimal performance
   - Local images cached indefinitely until manually cleared
   - Instant loading when cached
3. **Firebase Storage**: Cache-first with dedicated cache storage
   - Book images and uploaded content cached for offline viewing
   - Reduces Firebase bandwidth usage
4. **Static Assets**: Serwist default caching for CSS, JS, and other static files
5. **Offline Fallback**: Custom styled offline page when content unavailable

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

### Quick Test Steps:

1. **Build the app**: `npm run build`
2. **Serve the static files**: Use any static server (e.g., `npx serve out`)
3. **Visit pages while online**: Go to `/books`, `/type.html`, and other routes
4. **Go offline**: Use DevTools Network tab → "Offline" checkbox
5. **Test offline access**: Navigate to previously visited pages
6. **Test offline fallback**: Try visiting new pages to see offline page

### Expected Behavior:

- ✅ Previously visited pages load instantly from cache
- ✅ Images and Firebase content appear if cached
- ✅ New pages show styled "You're Offline" message with retry button
- ✅ Network status indicator shows when you go offline/online

### Development vs Production:

- **Development** (`npm run dev`): Service worker disabled for easier debugging
- **Production** (`npm run build`): Full offline functionality enabled

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

### Fixed Issues in Latest Version:

✅ **Offline support for `/books` and other routes**: Custom navigation handler now properly caches all HTML pages and routes
✅ **Static HTML files (like `/type.html`)**: Service worker now handles `.html` files specifically  
✅ **Turbopack compatibility**: Conditional Serwist loading eliminates webpack warnings
✅ **Dynamic route coverage**: All app routes now have proper offline fallback

### If the service worker still isn't working:

1. **Clear existing service worker**: Go to DevTools > Application > Storage > Clear Storage
2. **Check browser console**: Look for service worker registration errors
3. **Verify production build**: Service worker only works in production (`npm run build`)
4. **HTTPS requirement**: Must use HTTPS in production (localhost is exempt)
5. **Check Network tab**: Verify service worker is intercepting requests
6. **Force refresh**: Try Ctrl+Shift+R to bypass cache and re-register service worker

## Future Enhancements

Potential improvements for offline support:

- Background sync for offline form submissions
- Push notifications for updates
- Selective content downloads
- Offline search functionality
- Better conflict resolution for offline edits
