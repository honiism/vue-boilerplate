import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'

const isProd = process.env.NODE_ENV == 'production'

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        minify: isProd,
        outDir: 'dist',
        assetsDir: 'assets'
    },
    server: {
        open: true
    },
    plugins: [
        vue(),
        createHtmlPlugin({
            minify: isProd,
            entry: '/./src/index.js',
            template: './src/index.html',
            inject: {
                data: {
                    title: 'vendor',
                    injectScript: './src/js/vendor.js'
                },
                tags: [
                    {
                        injectTo: 'body-prepend',
                        tag: 'div',
                        attrs: {
                            id: 'tag'
                        }
                    }
                ]
            }
        })
    ]
})