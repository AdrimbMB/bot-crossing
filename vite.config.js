import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'
import { apiMiddleware } from './server/api.mjs'

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

/** Serves /api from inside the Vite dev server, so `npm run dev` is the whole game. */
const api = () => ({
  name: 'bot-crossing-api',
  configureServer(server) {
    server.middlewares.use(apiMiddleware)
  },
})

export default defineConfig({
  plugins: [api()],
  define: { __APP_VERSION__: JSON.stringify(packageJson.version) },
  // PORT lets a second copy run alongside the first without a flag on the command line.
  server: { port: Number(process.env.PORT) || 5274, strictPort: false },
  build: { target: 'esnext' },
})
