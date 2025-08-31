import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";
import dotenv from "dotenv";

const env = process.env.ENV?.toUpperCase() || "DEV";

// Get environment variables
let dotenvConfig;
switch (env) {
    case "PROD":
        dotenvConfig = { path: ".env.prod" };
        break;
    case "QA":
        dotenvConfig = { path: ".env.qa" };
        break;
    default:
        dotenvConfig = { path: ".env.dev" };
        break;
}
const { parsed } = dotenv.config(dotenvConfig);

console.log("Loaded " + env + " environment\n");

export default defineConfig({
  plugins: [react()],
  define: parsed,
  build: {
    outDir: "out",
  },
  server: env === "DEV" ? {
    open: true,
    port: 8901,
    https:  {
        key: fs.readFileSync(
            process.env.HOME + "/.sinergia/ssl/localhost-key.pem",
        ),
        cert: fs.readFileSync(
            process.env.HOME + "/.sinergia/ssl/localhost.pem",
        ),
    },
  } : undefined,
})
