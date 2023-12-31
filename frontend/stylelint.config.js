export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
  ],
  ignoreFiles: [
    '**/normalize.css',
    'dist/**/*.css',
  ],
  rules: {
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(_[a-z0-9]([-]?[a-z0-9]+)*)?(_[a-z0-9]([-]?[a-z0-9]+)*)?' +
        '(__[a-z0-9]([-]?[a-z0-9]+)*)?(_[a-z0-9]([-]?[a-z0-9]+)*)?(_[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        resolveNestedSelectors: true,
        message: function expected(selectorValue) {
          return `Expected class selector '${selectorValue}' to match BEM CSS pattern https://bem.info/methodology/css`;
        },
      },
    ],
  },
};
