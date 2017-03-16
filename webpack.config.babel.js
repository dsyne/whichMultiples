import path from 'path'
import webpack from 'webpack'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

export default {
  target: 'web',
  entry: './src/js/script.js',
  output: {
    path: path.join(process.cwd(), '/dist'),
    filename: 'script.js',
  },
  resolve: {
    extensions: ['.js', '.scss'],
  },
  plugins: [
    new BrowserSyncPlugin({
      server: './',
      files: [
        './src/**/*.{js,scss}',
      ],
      host: 'localhost',
      port: 7000,
      open: true,
      reloadOnRestart: true,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
}

