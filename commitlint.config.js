module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-max-line-length': [0, 'always', 30000],
        'header-max-length': [0, 'always', 3000],
        'footer-max-length': [0, 'always', 3000],
    },
};
