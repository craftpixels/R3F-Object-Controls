import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // 👇 your library source as an alias
            'r3f-object-controls': path.resolve(__dirname, '../src'),
        },
    },
});
