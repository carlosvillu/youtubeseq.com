// NO USADO!
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeEnv = process.env.NODE_ENV || 'development'
const isDev = nodeEnv === 'development'
const isProd = nodeEnv === 'production'
const GA_SCRIPT = isDev ? 'analytics_debug' : 'analytics'

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    main: [
      'app', 'pages/LayoutPage'
    ],
    vendor: [
      'react', 'react-dom', 'babel-polyfill', 'isomorphic-fetch'
    ]
  },
  output: {
    path: path.join(__dirname, './public'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel',
            query: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      ga: GA_SCRIPT
    })
  ],
  devServer: {
    contentBase: './public',
    noInfo: true
  }
}
