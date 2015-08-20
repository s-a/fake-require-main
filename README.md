## About
Fakes ```process.mainModule``` and ```require.main``` for debug and testing purposes.

[![NPM Version](http://img.shields.io/npm/v/fake-require-main.svg)](https://www.npmjs.org/package/fake-require-main)
[![Build Status](https://travis-ci.org/s-a/fake-require-main.svg)](https://travis-ci.org/s-a/fake-require-main)


## Usage

```javascript

// Always overwrite the main module. Use this to code your own conditions for an overwrite.
require("fake-require-main").fake(require, __filename);

// Overwrite the main module if called by a specific command line application.
require("fake-require-main").fakeFor(require, __filename, "electron");

```

See [/test/main.js](/test/main.js) for more details.

## [Contributing](/CONTRIBUTING.md)

## [License](/LICENSE.md)