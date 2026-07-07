import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, '..')
  const env = loadEnv(mode, envDir, 'VITE_')
  const proxyTarget = env.VITE_DEV_PROXY_TARGET?.trim()

  return {
    envDir,
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    server: {
      host: env.VITE_DEV_HOST || '0.0.0.0',
      port: Number.parseInt(env.VITE_DEV_PORT || '5173', 10),
      fs: {
        allow: [path.resolve(__dirname, '..')],
      },
      proxy: proxyTarget
        ? {
            '/api': proxyTarget,
            '/media': proxyTarget,
          }
        : undefined,
    },
  }
})
