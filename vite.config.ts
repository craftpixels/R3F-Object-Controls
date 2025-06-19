import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), dts()],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'R3FObjectControls',
            fileName: (format) => `r3f-object-controls.${format}.js`,
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['react', 'react-dom', '@react-three/fiber', 'three']
        }
    }
});
