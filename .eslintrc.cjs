module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  plugins: ["simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  ignorePatterns: ["!.storybook", "dist"],
  reportUnusedDisableDirectives: true,
  settings: { react: { version: "detect" } },
  rules: {
    "no-unused-vars": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "off",
    // Only warn on unused variables, and ignore variables starting with `_`
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
  },
}
