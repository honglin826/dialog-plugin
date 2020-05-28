let path = require('path')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'firstPlugin.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
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
  }
}