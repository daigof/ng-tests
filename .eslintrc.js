module.exports = {
  'extends': [
    'eslint:recommended'
  ],
  'ecmaFeatures': {
    // 'arrowFunctions ': true,
    // 'classes': true,
    // 'defaultParams ': true,
    // 'destructuring': true,
    // 'generators': true,
    // 'restParams': true,
    // 'spread': true,
    // 'templateStrings': true,
    // 'jsx': true,
    'forOf': true,
    'blockBindings': true,
    'modules': true
  },
  'env': {
    // 'jquery': true,
    // 'mocha': true,
    // 'jasmine': true,
    // 'phantomjs': true,
    // 'protractor': true,
    'browser': true,
    'node': true,
    'es6': true
  },
  'globals': {
    // 'angular': true
  },
  'rules': {
    'no-unused-vars': [ 1, {
      'vars': 'local'
    } ],
    'no-console': 0,
    'quotes': [
      2,
      'single'
    ],
    'indent': [
      2,
      2
    ],
    'semi': [
      2,
      'always'
    ]
  }
};
