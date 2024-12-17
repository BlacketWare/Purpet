module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
	  project: 'tsconfig.json',
	  tsconfigRootDir: __dirname,
	  sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin', '@stylistic'],
	extends: [
	  'plugin:@typescript-eslint/recommended',
	],
	root: true,
	env: {
	  node: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
	  '@typescript-eslint/interface-name-prefix': 'off',
	  '@typescript-eslint/explicit-function-return-type': 'off',
	  '@typescript-eslint/explicit-module-boundary-types': 'off',
	  '@typescript-eslint/no-explicit-any': 'off',
	  '@typescript-eslint/no-unused-vars': 'warn',

	  // purpet rules
	  '@stylistic/quotes': ['error', 'double'],
	  'max-depth': 'error',
	  '@stylistic/array-bracket-newline': ["error", { "multiline": true, "minItems": 2 }],
	  '@stylistic/array-bracket-spacing': ["error", "always", { "singleValue": false, "objectsInArrays": false, "arraysInArrays": false}],
	  '@stylistic/arrow-parens': ["error", "always"],
	  '@stylistic/arrow-spacing': "error",
	  '@stylistic/block-spacing': "error",
	  '@stylistic/brace-style': "error",
	  '@stylistic/comma-dangle': ["error", "always-multiline"],
	  '@stylistic/comma-spacing': ["error", { "before": false, "after": true }],
	  '@stylistic/dot-location': ["error", "property"],
	  '@stylistic/indent': "error",
	  '@stylistic/no-trailing-spaces': "error",
	  '@stylistic/type-annotation-spacing': "error",
	  '@stylistic/spaced-comment': ["error", "always"],
	  '@stylistic/semi': ["error", "never"]
	},
  };