import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import env from "dotenv";
env.config({ path: "../.env" });

export default defineConfig({
    plugins: [react()],
    define: {
        "process.env": process.env
    },
    resolve: {
        alias: {
            "@components": "/src/components",
            "@contexts": "/src/contexts",
            "@utils": "/src/utils",
        }
    },
    css: {
        modules: {
            scopeBehaviour: "local",
            localsConvention: "camelCaseOnly",
            generateScopedName: "[name]__[local]--[hash:base64:5]&camelCase"
        }
    },
    server: {
        warmup: {
            clientFiles: ["/src/main.tsx"]
        },
        hmr: {
            overlay: false
        }
    },
    build: {
        outDir: "../../prod/frontend/dist",
        emptyOutDir: true,
        minify: "terser",
        cssCodeSplit: true,
        cssMinify: true,
        terserOptions: {
            compress: {
                drop_console: false,
                drop_debugger: false
            },
            ecma: 2015,
            safari10: true,
            format: {
                comments: false
            },
            mangle: true,
            keep_classnames: false,
            keep_fnames: false
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react"],
                    "react-dom": ["react-dom"]
                }
            }
        },
        chunkSizeWarningLimit: 1000
    }
});
