import { defineConfig, loadEnv } from "vite";
import path, { resolve } from "path"; // 主要用于alias文件路径别名
import viteCompression from "vite-plugin-compression";
import react from "@vitejs/plugin-react";
import versionUpdatePlugin from "./versionUpdatePlugin.js";
const now = new Date().getTime();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, resolve(__dirname, "env"));
	return {
		envDir: "./env",
		plugins: [
			react(),
			viteCompression({
				verbose: true,
				disable: false,
				threshold: 10240,
				algorithm: "gzip",
				ext: ".gz"
			}),
			env.VITE_NODE_ENV == "production"
				? versionUpdatePlugin({
						version: now
				  })
				: ""
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src")
			}
		},
		define: {
			"process.env": env
		},
		//环境配置
		base: "./",
		mode: "development",
		css: {
			// css预处理器
			preprocessorOptions: {
				less: {
					// 支持内联 JavaScript
					javascriptEnabled: true, // 一般只需要配置  javascriptEnabled就行，modifyVars也可以稍微配置
					charset: false,
					modifyVars: {
						// 更改主题在这里
						"primary-color": "#52c41a",
						"link-color": "#1DA57A",
						"border-radius-base": "2px"
					}
					// additionalData: '@import "./src/assets/style/global.less";',
				}
			}
		},
		// 预构建插件包
		optimizeDeps: {
			include: ["axios", "react-dom"]
		},
		// 打包配置
		build: {
			target: "modules",
			outDir: "dist", //指定输出路径
			assetsDir: "assets", // 指定生成静态资源的存放路径
			minify: "terser", // 混淆器，terser构建后文件体积更小
			chunkSizeWarningLimit: 2000,
			// 移除console
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true
				}
			},
			rollupOptions: {
				output: {
					manualChunks(id: any): string {
						if (id.includes("node_modules")) {
							return id.toString().split("node_modules/")[1].split("/")[0].toString();
						}
					},
					// 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
					entryFileNames: "js/[name].[hash].js",
					// 用于命名代码拆分时创建的共享块的输出命名
					chunkFileNames: "js/[name].[hash].js",
					assetFileNames: "[ext]/[name].[hash].[ext]"
				}
			},
			sourcemap: false // 这个生产环境一定要关闭，不然打包的产物会很大
		},
		server: {
			port: 3000, // 开发环境启动的端口
			host: "0.0.0.0",
			open: true, // 项目启动时自动打开浏览器
			proxy: {
				"/api": {
					target: env.VITE_API_DOMAIN, // 当遇到 /api 路径时，会将其转换成 target 的值
					changeOrigin: true // 如果接口跨域，需要进行这个参数配置
					// 一般情况下，配置上面两个即可
					// secure: false,      // 如果是 https 接口，需要配置这个参数
					// rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
				}
			}
		}
	};
});
