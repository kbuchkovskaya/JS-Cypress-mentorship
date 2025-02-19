import { writeFile, readFile } from 'fs';
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Register custom tasks
      on('task', {
        // Task to write content to a file
        writeFileToFixtures({ filename, content }) {
          const filePath = `cypress/fixtures/${filename}`;
          return new Promise((resolve, reject) => {
            writeFile(filePath, content, (err) => {
              if (err) {
                return reject(err);
              }
              resolve(`File written successfully to ${filePath}`);
            });
          });
        },

        //to read
        readFileFromFixtures({ filename }) {
          const filePath = `cypress/fixtures/${filename}`;
          return new Promise((resolve, reject) => {
            readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(data); // Return file content
            });
          });
        },

        // Task to clear file content
        clearFileContent({ filename }) {
          const filePath = `cypress/fixtures/${filename}`;
          return new Promise((resolve, reject) => {
            writeFile(filePath, '', (err) => { // Overwrite with empty content
              if (err) {
                return reject(err);
              }
              resolve(`File content cleared successfully in ${filePath}`);
            });
          });
        },
      });
      return config;
    },
    supportFile: "support/e2e.js", 
  } 
});
