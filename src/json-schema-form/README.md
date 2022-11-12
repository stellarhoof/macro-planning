# Keywords

- `validate(schema, data)`: Validation time. Should return a boolean.
- `code(context)`: Compilation time. It generates code string that gets evaluated.
- `compile(schema, parentSchema, context)`: Compilation time. Should return a validation function that behaves just like `validate`
- `macro(schema, parentSchema, context)`: Compilation time. Should return a schema that will extend the current schema. It does not override the current schema.

`useDefaults` and `coerceTypes` use code generation so once the validation code has been generated we cannot change its behavior, like for example, changing ajv options to turn on/off coercing

Add a keyword with `compile` fn that is able to turn pick up the `useDefaults` flag

# Schema compilation options

Global overrides on backend schemas are always applied. Computed properties such as user metrics should be marked readOnly. All listed options should remove readOnly properties from schema

1. Compile schema at the app level
2. Compile schema at the form level
   - Can pre-process the schema with further overrides, omit/pick etc...
3. Compile schema at the form level for casting/defaults and every time it's validated

# Potentially useful keywords

- [dynamicDefaults](https://ajv.js.org/packages/ajv-keywords.html#dynamicdefaults)
- [instanceof](https://ajv.js.org/packages/ajv-keywords.html#instanceof)
- [regexp](https://ajv.js.org/packages/ajv-keywords.html#regexp)
  - Only for strings
- [transform](https://ajv.js.org/packages/ajv-keywords.html#transform)
  - Only for strings
  - toEnumCase looks interesting
