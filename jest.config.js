// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} **/
// module.exports = {
//   testEnvironment: "node",
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testMatch: ['**/*.spec.ts'],
//   transform: {
//     ...tsJestTransformCfg,
//   },
//   testPathIgnorePatterns: ['/dist/'],

//   transformIgnorePatterns: [
//     '/node_modules/(?!uuid)/'
//   ],

// };
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset({
  tsconfig: 'tsconfig.spec.json'
}).transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  transform: {
    ...tsJestTransformCfg,
  },
  testPathIgnorePatterns: ['/dist/'],
  transformIgnorePatterns: [
    '/node_modules/(?!uuid)/'
  ],
};
