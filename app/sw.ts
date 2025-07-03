/// <reference lib="webworker" />

import { defaultCache } from "@serwist/next/worker";
import { installSerwist } from "@serwist/sw";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (string | { url: string; revision: string })[];
  }
}

declare const self: ServiceWorkerGlobalScope;

// Install Serwist with basic configuration
installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

// Custom fetch event handler for better offline support
self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle navigation requests (HTML pages)
  if (
    request.mode === "navigate" ||
    request.destination === "document" ||
    url.pathname.endsWith(".html") ||
    url.pathname === "/" ||
    url.pathname.endsWith("/")
  ) {
    event.respondWith(handleNavigation(request));
    return;
  }

  // Handle images
  if (
    request.destination === "image" ||
    /\.(png|jpg|jpeg|svg|gif|webp|ico|avif)$/i.test(url.pathname)
  ) {
    event.respondWith(handleImage(request));
    return;
  }

  // Handle Firebase Storage
  if (url.hostname === "firebasestorage.googleapis.com") {
    event.respondWith(handleFirebaseStorage(request));
    return;
  }
});

// Navigation handler with offline fallback
async function handleNavigation(request: Request): Promise<Response> {
  const cache = await caches.open("pages-cache-v1");

  try {
    // Try network first
    const response = await fetch(request);

    if (response.ok) {
      // Cache successful responses
      cache.put(request, response.clone());
      return response;
    }

    throw new Error("Network response not ok");
  } catch (error) {
    // Try cache if network fails
    console.log("Network failed, trying cache:", error);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Try to serve offline page
    const offlinePage =
      (await cache.match("/offline")) ||
      (await cache.match("/offline/")) ||
      (await cache.match("/offline.html")) ||
      (await cache.match("/offline/index.html"));

    if (offlinePage) {
      return offlinePage;
    }

    // Last resort: create a basic offline response
    return new Response(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Offline - Hudra</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
            .offline-container { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; margin: 0 auto; }
            h1 { color: #333; margin-bottom: 20px; }
            p { color: #666; margin-bottom: 30px; }
            button { background: #8A1538; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-size: 16px; }
            button:hover { background: #722347; }
          </style>
        </head>
        <body>
          <div class="offline-container">
            <h1>📚 Hudra - You're Offline</h1>
            <p>This page is not available offline. Please check your connection and try again.</p>
            <button onclick="window.location.reload()">🔄 Try Again</button>
            <br><br>
            <a href="/" style="color: #8A1538; text-decoration: none;">🏠 Go Home</a>
          </div>
        </body>
      </html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}

// Image handler with cache-first strategy
async function handleImage(request: Request): Promise<Response> {
  const cache = await caches.open("images-cache-v1");

  // Try cache first for images
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    // Fetch from network and cache
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return a placeholder if needed
    console.log("Image fetch failed:", error);
    throw error;
  }
}

// Firebase Storage handler
async function handleFirebaseStorage(request: Request): Promise<Response> {
  const cache = await caches.open("firebase-cache-v1");

  // Try cache first
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    // Fetch from network and cache
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log("Firebase storage fetch failed:", error);
    throw error;
  }
}
