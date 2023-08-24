import path from "path"
import react from "@vitejs/plugin-react"
import {defineConfig, loadEnv} from "vite"
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({command, mode})=> {
  const env = loadEnv(mode, process.cwd());
  return {
    define: {
      'process.env': env
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react(), tsconfigPaths()],
    base: env.VITE_HOME
  }
})