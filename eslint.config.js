import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";

export default [
  js.configs.recommended,
  {
    plugins: {
      cypress
    },
    ignores: [
      "/cypress/screenshots/**",
      "/cypress/videos/**",
      "/cypress/results/**",
      "/cypress/downloads/**"
    ],
    languageOptions: {
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        assert: "readonly",
        it: "readonly",
        describe: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
        process: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "cypress/no-unnecessary-waiting": "error",
      "cypress/assertion-before-screenshot": "warn"
    }
  }
];
