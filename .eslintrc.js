module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    plugins: ['prettier'],
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'spaced-comment': [2, 'always'],
    },
}
