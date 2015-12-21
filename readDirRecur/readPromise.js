var fs = require('fs');
var readdir = promisify(fs.readdir);
var stat = promisify(fs.stat);
var readFile = promisify(fs.readFile);

// 简单实现一个promisify
function promisify(fn) {
  return function() {
    var args = arguments;
    return new Promise(function(resolve, reject) {
      [].push.call(args, function(err, result) {
        if(err) {
          reject(err);
        }else {
          resolve(result);
        }
      });
      fn.apply(null, args);
    });
  }
}
function readDirRecur(file, callback) {
    return readdir(file).then(function(files) {
      files = files.map(function(item) {
        var fullPath = file + '/' + item; 
        return stat(fullPath).then(function(stats) {
            if (stats.isDirectory()) {
                return readDirRecur(fullPath, callback);
            }else{
              /*not use ignore files*/
              if(item[0] == '.'){
                //console.log(item + ' is a hide file.');
              }else{
                return readFile(fullPath, 'utf8').then(function(data){
                  callback(item, data, fullPath);
                });
              }
            }
          })
      });
      return Promise.all(files);
    });
}

