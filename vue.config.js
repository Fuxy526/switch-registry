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
      },
    },
  },
};
