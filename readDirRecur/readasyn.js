var fs = require('fs'),
	path = require('path');
var readDirRecur = function(file, callback) {
	fs.readdir(file, function(err, files) {
		if (err) throw err;
		files.forEach(function(item) {
				var fullPath = file + '/' + item;
				fs.stat(fullPath, function(err, stats) {
					if (err) throw err;
					if (stats.isDirectory()) {
						readDirRecur(fullPath, callback);
					} else {
						/*not use ignore files*/
						if (item[0] == '.') {
							//console.log(item + ' is a hide file.');
						} else {
							fs.readFile(fullPath, 'utf8', function(err, data) {
								callback(item, data, fullPath);
							})
						}
					}
				})
			},
			function(err) {
				if (err) throw err;
			})
	})
}



readDirRecur(path.join(__dirname+'/../readDirRecur'),function(file,data,fullpath){
	// console.log('file',file);
	// console.log('data',data);
	console.log('fullpath',fullpath)
})