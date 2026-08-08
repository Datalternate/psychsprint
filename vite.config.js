import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If your repo is github.com/<you>/psychsprint and you're using the default
// https://<you>.github.io/psychsprint/ URL, keep base as "/psychsprint/".
// If you point a custom domain at it (via a CNAME file), change base to "/".
export default defineConfig({
  plugins: [react()],
  base: "/psychsprint/",
});
