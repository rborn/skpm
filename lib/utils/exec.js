var childProcess = require('child_process')

module.exports.exec = function (command, options) {
  return new Promise(function (resolve, reject) {
    childProcess.exec(command, options, function (error, stdout, stderr) {
      if (error) {
        return reject(error)
      }
      resolve({
        stdout: stdout,
        stderr: stderr
      })
    })
  })
}

module.exports.execFile = function (command, options) {
  return new Promise(function (resolve, reject) {
    childProcess.execFile(command, options, function (error, stdout, stderr) {
      if (error) {
        return reject(error)
      }
      resolve({
        stdout: stdout,
        stderr: stderr
      })
    })
  })
}

module.exports.spawn = function (command, args, options) {
  return new Promise(function (resolve, reject) {
    var child = childProcess.spawn(command, args, {
      cwd: process.cwd(),
      stdio: 'inherit'
    })

    child.on('exit', function () {
      resolve()
    })

    child.on('error', function (err) {
      reject(err)
    })
  })
}
