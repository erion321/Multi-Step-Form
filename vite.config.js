/* import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isDevEnv = mode === "development";

  return {
    plugins: [isDevEnv && react()],
  };
});
 */

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
  });
};
