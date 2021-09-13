import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const setAlias = (alias: [string, string][]) => alias.map(v => { return { find: v[0], replacement: path.resolve(__dirname, v[1]) } })

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
    const root = process.cwd()
    const env = loadEnv(mode, root) as unknown as ImportMetaEnv
    return {
        resolve: {
            alias: setAlias([
                ['/@', 'src']
            ])
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://47.94.100.144:8333/api/v1',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        },
        build: {
            sourcemap: true,
            manifest: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'element-plus': ['element-plus']
                    }
                }
            },
            chunkSizeWarningLimit: 600
        },
        plugins: [
            vue()
        ]
    }
}
