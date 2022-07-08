module.exports = {
  rootDir: '.',
  testTimeout: 15000,
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testMatch: ['**/tests/**/*.spec.ts', '**/tests/**/*.e2e-spec.ts'],
  moduleDirectories: ['node_modules'],
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['lcov', 'cobertura', 'text'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/admin.module.ts',
    '!src/**/database/migrations/*',
    '!src/main.ts',
    '!src/cron.ts',
    '!src/@types/*',
    '!src/**/ormconfig.ts',
    '!src/config/*',
  ],
};
