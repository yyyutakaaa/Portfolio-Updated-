import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        /**
         * React, the router and the animation runtime change on completely
         * different schedules from the site's own code, so they get their own
         * long-lived chunks instead of invalidating one big bundle on every
         * copy tweak.
         */
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText', 'lenis'],
        },
      },
    },
  },
});
