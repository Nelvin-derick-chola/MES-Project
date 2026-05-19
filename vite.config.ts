import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // ✅ Proxy all /api requests to admin Laravel backend
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      
      // ✅ MES API proxy for freight and other services
      '/mes-api': {
        target: 'http://116.202.29.37',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          // ✅ Check if it's a tracking request
          if (path.includes('/trackshipment')) {
            return path.replace(/^\/mes-api/, '/mes1sep/appcustomer');
          }
          
          // Default for other requests
          return path.replace(/^\/mes-api/, '/mes1sep/app');
        },
      },
    },
  },

  
});