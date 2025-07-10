// import { defineConfig } from 'vite'
// import path from 'node:path'
// import electron from 'vite-plugin-electron/simple'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     electron({
//       main: {
//         // Shortcut of `build.lib.entry`.
//         entry: 'electron/main.ts',
//       },
//       preload: {
//         input: [
//           path.join(__dirname, 'electron/preload.ts'),
//           path.join(__dirname, 'electron/preload-another.ts'),
//           // Add more here if needed
//         ],
//       },
//       // Ployfill the Electron and Node.js API for Renderer process.
//       // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
//       // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
//       renderer: process.env.NODE_ENV === 'test'
//         // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
//         ? undefined
//         : {},
//     }),
//   ],
// })


import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    react(),
    electron([
      // Main Process
      {
        entry: 'electron/main.ts',
      },
      // Preload 1
      {
        entry: 'electron/preload.ts',
        vite: {
          build: {
            lib: {
              entry: path.join(__dirname, 'electron/preload.ts'),
              formats: ['es'],
              fileName: () => 'preload.mjs',
            },
            outDir: 'dist-electron',
            rollupOptions: {
              output: {
                format: 'esm', // ensures .mjs output
              },
            },
          },
        },
      },
      // Preload 2
      {
        entry: 'electron/preload-another.ts',
        vite: {
          build: {
            lib: {
              entry: path.join(__dirname, 'electron/preload-another.ts'),
              formats: ['es'],
              fileName: () => 'preload-another.mjs',
            },
            outDir: 'dist-electron',
            rollupOptions: {
              output: {
                format: 'esm',
              },
            },
          },
        },
      },
    ]),
  ],
})
