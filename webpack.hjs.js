const webpack = require('webpack')
const getConfig = require('hjs-webpack')
const isDev = (process.env.NODE_ENV || 'development') === 'development'
const isProd = !isDev && process.env.NODE_ENV === 'production'

const PRO_PUBLIC_PATH = ''
const DEV_PUBLIC_PATH = ''

const PUBLIC_PATH = isProd ? PRO_PUBLIC_PATH : DEV_PUBLIC_PATH
const GA_ID = 'UA-XXXXX-Y'
const GA_SCRIPT = isProd ? 'analytics' : 'analytics_debug'

const config = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  html: context => {
    return {
      'index.html': `
        <html mode="${process.env.NODE_ENV || 'development'}">
          <head>
            <meta charset="utf-8" />
            <link href="${context.css}" rel="stylesheet" type="text/css" />
          </head>
          <body>
            <div id="root"></div>
            <script deferred src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.4.2/localforage.nopromises.min.js"></script>
            <script deferred src="https://www.gstatic.com/firebasejs/3.2.0/firebase.js"></script>
            <script src="${PUBLIC_PATH}${context.vendor}"></script>
            <script src="${PUBLIC_PATH}${context.main}"></script>
            <script deferred src="https://apis.google.com/js/client.js?onload=OnLoadCallback"></script>
            <script>
              window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
              ga('create', '${GA_ID}', 'auto');
              ga('send', 'pageview');
            </script>
            <script async src="https://www.google-analytics.com/${GA_SCRIPT}.js"></script>
          </body>
        </html>
      `
    }
  }
})

config.output.filename = '[name].[hash].js'
config.output.chunkFilename = '[name].[chunkhash].js'

if (isProd) {
  config.entry = {
    main: config.entry,
    vendor: [
      'react', 'react-dom', 'babel-polyfill', 'isomorphic-fetch',
      'debug', 'react-router', 'react-youtube-player', 'sequence-titles'
    ]
  }

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    })
  )

  config.output.publicPath = PUBLIC_PATH

  // Remove Dedupe plugin
  // https://github.com/HenrikJoreteg/hjs-webpack/issues/22
  config.plugins = config.plugins.filter((_, i) => i !== 1)
}

module.exports = config
