var chalk = require('chalk')
var runPluginCommand = require('run-sketch-plugin')

function SketchCommandPlugin (options) {
  return {
    apply: function (compiler) {
      var bundleURL = options.bundleURL
      var commandIdentifier = options.commandIdentifier

      if (bundleURL && commandIdentifier) {
        compiler.plugin('after-emit', function (compilation, callback) {
          runPluginCommand({
            bundleURL: bundleURL,
            identifier: commandIdentifier
          })
          .then(function (res) {
            if (res.stderr) {
              console.error(chalk.red('error') + ' Error while running the command after build')
              console.error(res.stderr)
            }
            res.stdout.split('\\n').map(function (line) { console.log(line) })
          })
          .then(function () { callback() })
          .catch(function (err) {
            console.error(chalk.red('error') + ' Error while running the command after build')
            console.error(err)
            callback()
          })
        })
      }
    }
  }
}

module.exports = SketchCommandPlugin
