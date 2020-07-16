module.exports = {
  configureWebpack: {
    target: 'electron-renderer',
  },
  devServer: {
    port: 10086,
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'SwitchRegistry',
        artifactName: '${productName}-${version}.${ext}',
        win: {
          target: ['nsis', 'zip'],
        },
        nsis: {
          artifactName: '${productName}-Setup-${version}.${ext}',
        },
      },
    },
  },
  productionSourceMap: false,
  css:{
    extract: false,
  },
};
