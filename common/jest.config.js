/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    "."
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "dist",
    "tests-reports",
    "frontend"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  maxConcurrency: 1,
  maxWorkers: 1,
  collectCoverage: true,
  coverageReporters: [
    "json",
    "html",
    "text-summary",
    "lcov",
    "clover"
  ],
  coverageDirectory: "tests-reports/coverage",
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "./tests-reports",
      "filename": "jest-report.html",
      "expand": true,
      enableMergeData: true,
      dataMergeLevel: 2,
      pageTitle: "SmartCafe Application Test Report",
      includeConsoleLog: true,
      }
    ],
  ]
}
