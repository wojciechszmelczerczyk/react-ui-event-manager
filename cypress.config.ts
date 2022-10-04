import { defineConfig } from "cypress";
import { configurePlugin } from "cypress-mongodb";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on);
    },
  },
});
