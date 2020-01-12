const jestConfig = require("./jest.config");

module.exports = {
  ...jestConfig,
  ...{ testMatch: ["**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"] }
};
