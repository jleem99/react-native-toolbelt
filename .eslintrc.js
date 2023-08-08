module.exports = {
	env: { browser: true, es2021: true },
	extends: ['jleem/react-native'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react-native/no-inline-styles': 'warn',
		'@typescript-eslint/ban-ts-comment': 'off',
	},
}
