module.exports = {
    env: {
        browser: true,
        es2020: true,
        commonjs: true,
        amd: true,
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
    globals: {
        document: true,
        localStorage: true,
        window: true,
    },
}
