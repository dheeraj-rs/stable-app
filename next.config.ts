/* eslint-disable @typescript-eslint/no-require-imports */
import type { Configuration as WebpackConfiguration } from 'webpack';

// Cache configurations
const CACHE_STRATEGIES = {
  FONTS: {
    cacheName: 'google-fonts',
    maxEntries: 4,
    maxAge: 365 * 24 * 60 * 60, // 1 year
    handler: 'CacheFirst',
  },
  ASSETS: {
    cacheName: 'static-assets',
    maxEntries: 32,
    maxAge: 7 * 24 * 60 * 60, // 1 week
    handler: 'StaleWhileRevalidate',
  },
  IMAGES: {
    cacheName: 'images',
    maxEntries: 64,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    handler: 'StaleWhileRevalidate',
  },
  API: {
    cacheName: 'api-cache',
    maxEntries: 50,
    maxAge: 5 * 60, // 5 minutes
    networkTimeout: 10, // seconds
    handler: 'NetworkFirst',
  },
  PAGES: {
    cacheName: 'pages',
    maxEntries: 50,
    maxAge: 60 * 60, // 1 hour
    handler: 'NetworkFirst',
  },
};

// Generate cache rules
const generateCacheRules = () => {
  const { FONTS, ASSETS, IMAGES, API, PAGES } = CACHE_STRATEGIES;

  return [
    // Google Fonts
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: FONTS.handler,
      options: {
        cacheName: FONTS.cacheName,
        expiration: {
          maxEntries: FONTS.maxEntries,
          maxAgeSeconds: FONTS.maxAge,
        },
      },
    },
    // Static assets
    {
      urlPattern: /\.(?:js|css|less|eot|otf|ttc|ttf|woff|woff2|font\.css)$/i,
      handler: ASSETS.handler,
      options: {
        cacheName: ASSETS.cacheName,
        expiration: {
          maxEntries: ASSETS.maxEntries,
          maxAgeSeconds: ASSETS.maxAge,
        },
      },
    },
    // Images
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$/i,
      handler: IMAGES.handler,
      options: {
        cacheName: IMAGES.cacheName,
        expiration: {
          maxEntries: IMAGES.maxEntries,
          maxAgeSeconds: IMAGES.maxAge,
        },
      },
    },
    // Next.js Image Optimization
    {
      urlPattern: /\/_next\/image\?url=.+$/i,
      handler: IMAGES.handler,
      options: {
        cacheName: `${IMAGES.cacheName}-next`,
        expiration: {
          maxEntries: IMAGES.maxEntries,
          maxAgeSeconds: IMAGES.maxAge,
        },
      },
    },
    // API Routes
    {
      urlPattern: /^https?:\/\/api\.\w+\.com\/.*/i,
      handler: API.handler,
      options: {
        cacheName: API.cacheName,
        expiration: { maxEntries: API.maxEntries, maxAgeSeconds: API.maxAge },
        networkTimeoutSeconds: API.networkTimeout,
      },
    },
    // Fallback for all other requests
    {
      urlPattern: /.*/,
      handler: PAGES.handler,
      options: {
        cacheName: PAGES.cacheName,
        expiration: {
          maxEntries: PAGES.maxEntries,
          maxAgeSeconds: PAGES.maxAge,
        },
        networkTimeoutSeconds: 5,
      },
    },
  ];
};

// PWA Configuration
const isProduction = process.env.NODE_ENV === 'production';
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !isProduction,
  register: isProduction,
  skipWaiting: true,
  runtimeCaching: generateCacheRules(),
  buildExcludes: [/middleware-manifest\.json$/],
  publicExcludes: ['!noprecache/**/*'],
  dynamicStartUrl: false,
  fallbacks: {
    document: '/_offline',
    image: '/static/images/fallback.png',
    font: '/static/fonts/fallback.woff2',
  },
  // Add these options to prevent multiple registrations
  reloadOnOnline: true,
  disableDevLogs: true,
});

// Next.js Configuration
const nextConfig = {
  // Static HTML Export
  output: 'export',

  // Image Optimization
  images: {
    unoptimized: true,
    domains: [],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance Optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000', 'localhost:3003'],
    },
    optimizeServerReact: true,
  },

  // Build Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },

  // Development Settings
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false, // Set to false to catch TypeScript errors during build
  },
  // Disable static page generation for non-SSG pages
  outputFileTracingExcludes: {
    '*': ['node_modules/**/*', '**/node_modules/**/*', '**/.next/**/*'],
  },

  // Security Headers - Removed as they're not compatible with static exports
  // If you need security headers, configure them in your hosting provider

  // Webpack Configuration
  webpack: (
    config: WebpackConfiguration,
    { isServer, dev }: { isServer: boolean; dev: boolean }
  ) => {
    // Custom webpack configurations
    if (!isServer && config.resolve) {
      // Client-side only configurations
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Production optimizations
    if (!dev) {
      // Add production-only plugins
    }

    return config;
  },
};

module.exports = withPWA(nextConfig);
