const themeConfig = require('./src/theme/themeConfig.ts')
module.exports = {
  plugins: {
    'postcss-preset-env': {
      importFrom: themeConfig, // 配置样式变量
      stage: 1,
      preserve: false,
    }
  }
}