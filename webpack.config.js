let path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js', 'tsx', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  // useBuiltIns: 内置polyfill, 3种可能取值
                  // : false 不用polyfill，自己手动配置
                  // : entry 只在“入口模块”处导入“polyfills”
                  // : usage 什么都不用写，babel会根据browserslist配置的目标环境，自动补充
                  'useBuiltIns': 'usage',
                  'corejs': '3.6'
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        oneOf: [{
          resourceQuery: /^\?raw$/,
          use: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            require.resolve('postcss-loader')
          ]
        }, {
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  context: path.resolve(__dirname, 'src'),
                  hashPrefix: 'my-custom-hash'
                }
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        }]
      },
      {
        test: /\.(png|jpeg|jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 3000,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        header: {
          // Cookie: '',
          // Authorization: `Bearer token`
        }
      }
    }
  }
}