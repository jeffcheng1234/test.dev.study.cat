const util = require("./util");



var exist = false;
var value = "gameplay";
util.listDir("testFiles", function(file) {exist = exist || value == file;console.log(exist);});
console.log(exist);