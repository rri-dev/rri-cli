# rri-something-np

A simple template for creating npm packages.

## 1) Develop the Package

### Write Code, Install Node Modules

> npm i

### Build a Dist

> npm run build

The package will need a `dist/index.js` file that includes whatever it exports. If you run `npm run build` it will compile the ts files into js files and output them into `dist`. When you create the NPM package, those files are included by default. You can specify additional files to be included by adding a `files` string array to `package.json`:
```json
"files": [
    "dist",
    "src/templates",
    "postinstall.js"
],
```

## 2) Test Installing in Another Project

### Create a Tarball

> npm pack

### Install Tarball in Another Project

> npm install /path/to/package.tgz

