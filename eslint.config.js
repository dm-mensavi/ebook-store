// eslint.config.js
import next from "eslint-config-next";

export default [
  ...next(),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // Add custom rules here if needed
    },
  },
];
