# PrestaShop Classic Theme Example hot module replacement

## If not working file watcher, add
```js
plugins.push(
  new webpack.OldWatchingPlugin()
);
```
in webpack.config.js, for webpack 1.12+ version.
Thx Damir Glax!


## Install :
```bash
cd _dev
npm i 
//or
yarn 
```

## Start hot:
```bash
npm run hot
//or
yarn run hot
```
## All changes:
https://github.com/retyui/prestashop-1.7-webpack-hot-module-replacement/commit/e25b5903f315609e7d4ec9a6c25a07be59c4c727
