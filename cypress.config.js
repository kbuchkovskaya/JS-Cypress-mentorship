import { writeFile, readFile } from 'fs/promises';
import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.GITLAB_API_TOKEN = process.env.GITLAB_API_TOKEN;
      // Register custom tasks
      on('task', {
        // Task to write content to a file
        async writeFileToFixtures({ filename, content }) {
          const filePath = `cypress/fixtures/${filename}`;
          try {
            await writeFile(filePath, content);
            return `File written successfully to ${filePath}`;
          } catch (err) {
            throw new Error(`Failed to write file: ${err.message}`);
          }
        },

        // Task to read file content
        async readFileFromFixtures({ filename }) {
          const filePath = `cypress/fixtures/${filename}`;
          try {
            return await readFile(filePath, 'utf8');
          } catch (err) {
            throw new Error(`Failed to read file: ${err.message}`);
          }
        },

        // Task to clear file content
        async clearFileContent({ filename }) {
          const filePath = `cypress/fixtures/${filename}`;
          try {
            await writeFile(filePath, ''); // Overwrite with empty content
            return `File content cleared successfully in ${filePath}`;
          } catch (err) {
            throw new Error(`Failed to clear file: ${err.message}`);
          }
        },
      });

      // Configure Allure Reporter
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      return config;
    },
    
    supportFile: "cypress/support/e2e.js", 
  },

  reporter: "mocha-junit-reporter",
  reporterOptions: {
    mochaFile: "results/test-results-[hash].xml",
    toConsole: true
  }

});
