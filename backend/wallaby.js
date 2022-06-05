module.exports = function () {
  return {
    files: [
      "src/**/*.ts", // adjust if required
      "!src/**/*.spec.ts",
    ],

    tests: [
      "src/**/*.spec.ts", // adjust if required
    ],

    env: {
      type: "node",
    },
  };
};
