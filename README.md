# TLIB

Zero config for building a Typescript library.

## Usage

```shell
npx tlib-cli
```

After entering the project name and package manager, it will automatically configure and install the related dependencies.

## NPM scripts

- `dev`: Run `build:dev` in watch mode

- `test`: Test the test cases under the test/ directory

- `build:dev`: Generate bundles and typings with sourcemap

- `build:pro`: Generate minified bundles and typings with terser

## Features

Already includes:

- [x] Module bundler: RollupJs

- [x] Code style: Eslint + Prettier

- [x] Code consistency: lint-staged + husky + commitlint

- [x] Test: Jest

- [ ] Automatic releases and changelog

## License

MIT
