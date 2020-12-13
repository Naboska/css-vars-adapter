module.exports = {
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx)', '**/*.test.+(ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
