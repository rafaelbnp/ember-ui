'use strict';

module.exports = {
  singleQuote: true,
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.hbs',
      options: {
        parser: 'glimmer',
        singleQuote: false,
      },
    },
  ],
};
