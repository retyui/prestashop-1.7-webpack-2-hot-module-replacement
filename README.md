# PrestaShop Classic Theme Example hot module replacement, webpack.config.js - for webpack 2.x version.

## Get started 
1) Clone demo repo:
```bash
# go to themes folder
cd ./themes

# clone theme (hmr-webpack2 is name theme, look config/theme.yml)
git clone https://github.com/retyui/prestashop-1.7-webpack-2-hot-module-replacement ./hmr-webpack2
```
2) Install dependency:
```bash
cd ./hmr-webpack2/_dev
npm install 
# or
yarn 
```
3) Configurate paths:

  3.1) Open file: `_dev/hot.webpack.js`
  
  3.2) Check `themeFolderName` and `webpackConfig.output.publicPath`

4) Start hot mode:
```bash
# Hot mode:
npm run hot
# or
yarn hot
```

### Other
[Example Hot Module Replacement for `Webpack 1.x` Prestashop 1.7](https://github.com/retyui/prestashop-1.7-webpack-hot-module-replacement)

[Example Hot Module Replacement for `Webpack 2.x` Prestashop 1.7](https://github.com/retyui/prestashop-1.7-webpack-2-hot-module-replacement)

[Example Hot Module Replacement for `Webpack 3.x` Prestashop 1.7](https://github.com/retyui/prestashop-1.7-webpack-3-hot-module-replacement)
