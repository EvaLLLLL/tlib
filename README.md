## TLIB

Zero config for building a Typescript library.

### Usage

```
npx tlib-cli
```

That's it, things will setup.

### NPM scripts

- `yarn lint`: Lints code
- `yarn dev`: Run `yarn build:dev` in watch mode
- `yarn build:dev`: Generate bundles and typings with sourcemap
- `yarn build:pro`: Generate minified bundles and typings with terser

### Features

Already includes:

- [x] Module bundler: RollupJs
- [x] Code style: Eslint + Prettier
- [ ] Test: Jest
- [ ] Automatic releases and changelog

### License

MIT
