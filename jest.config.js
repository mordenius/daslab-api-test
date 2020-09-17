module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  moduleNameMapper: {
    "@App/(.*)": "<rootDir>/src/$1"
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ]
};