import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

/**
 * ============================================
 * VITE CONFIGURATION - OPTIMIZED
 * ============================================
 * Features:
 * - Path aliases
 * - Build optimization
 * - Chunk splitting
 * - Compression
 * - Source maps (dev only)
 * ============================================
 */

export default defineConfig({
  // ============================================
  // PLUGINS
  // ============================================
  plugins: [
    react({
      // Fast Refresh
      fastRefresh: true,
      // Babel config for React
      babel: {
        plugins: [
          // Add any babel plugins here if needed
        ],
      },
    }),
  ],

  // ============================================
  // RESOLVE - PATH ALIASES
  // ============================================
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@common': resolve(__dirname, 'src/components/common'),
      '@sections': resolve(__dirname, 'src/components/sections'),
      '@layout': resolve(__dirname, 'src/components/layout'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },

  // ============================================
  // SERVER CONFIGURATION
  // ============================================
  server: {
    port: 5173,
    host: true, // Listen on all addresses
    open: true, // Open browser automatically
    cors: true,
    // Proxy si besoin d'une API
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },

  // ============================================
  // BUILD OPTIMIZATION
  // ============================================
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate sourcemaps for debugging (production)
    sourcemap: false,
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    
    // Target browsers
    target: 'es2015',
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'three': ['three'],
          
          // UI libraries
          'ui-vendor': [
            'lucide-react',
            'swiper',
            'react-parallax-tilt',
          ],
          
          // Utils
          'utils': [
            './src/utils/index.js',
            './src/hooks/index.js',
          ],
        },
        
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
            extType = 'images';
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            extType = 'fonts';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Increase warning limit for CSS
    cssMinify: true,
  },

  // ============================================
  // OPTIMIZATION
  // ============================================
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'three',
      'lucide-react',
      'swiper',
      'react-helmet-async',
    ],
    exclude: [],
  },

  // ============================================
  // PREVIEW SERVER (for production build)
  // ============================================
  preview: {
    port: 4173,
    host: true,
    open: true,
  },

  // ============================================
  // ENVIRONMENT VARIABLES
  // ============================================
  // Variables starting with VITE_ are exposed to client
  envPrefix: 'VITE_',

  // ============================================
  // CSS PREPROCESSING
  // ============================================
  css: {
    // PostCSS config is in postcss.config.js
    postcss: './postcss.config.js',
    
    // CSS modules configuration
    modules: {
      localsConvention: 'camelCase',
    },
    
    // Preprocessor options
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },

  // ============================================
  // PERFORMANCE
  // ============================================
  esbuild: {
    // Drop console and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
});