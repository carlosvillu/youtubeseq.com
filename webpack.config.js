const getConfig = require('hjs-webpack')
const webpack = require('webpack')

const config = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  html: context => {
    /*eslint-disable */
    return {
      'index.html': [
        '<html>',
          '<head>',
            '<meta charset="utf-8" />',
            '<link href="' + context.css + '" rel="stylesheet" type="text/css" />',
          '</head>',
          '<body>',
            '<div id="root"></div>',
            '<script src="' + context['shared.[hash].js'] + '"></script>',
            '<script src="' + context.main + '"></script>',
            '<script src="https://apis.google.com/js/client.js?onload=OnLoadCallback"></script>',
          '</body>',
        '</html>'
      ].join('')
    }
    /*eslint-enable */
  }
})

config.output.chunkFilename = '[name].[hash].chunk.js'
config.plugins.push(new webpack.optimize.CommonsChunkPlugin('shared.[hash].js'))

module.exports = config
