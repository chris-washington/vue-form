module.exports = {
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "json", "vue"],

  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.(js|jsx)?$": "babel-jest"
  },

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],

  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40
    }
  },

  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "results",
        outputName: "junit.xml",
        suiteName: "FUSE Vue Core Test Results"
      }
    ]
  ],

  testEnvironment: "jest-environment-jsdom-fifteen",
  transformIgnorePatterns: ["/node_modules/(?!lodash-es).+\\.js$"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  snapshotSerializers: ["jest-serializer-vue"],

  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)",
    "!**/.stryker-tmp/**/*.spec.(js|jsx|ts|tsx)"
  ],

  testURL: "http://localhost/",
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  preset: "@vue/cli-plugin-unit-jest"
};
