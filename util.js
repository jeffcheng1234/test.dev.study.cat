const path = require("path");
const fs = require("fs");

var util = {
    
    //lists files/folders one level deep from root path 
    listDir : function(root, fn) {

        rootDir = path.join(__dirname, root);

        fs.readdir(rootDir, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //listing all files
            files.forEach(function (file) {
                fn(file); 
            });
        });

    },

    listDirSync : function(root, fn) {
        rootDir = path.join(__dirname, root);

        var list = fs.readdirSync(rootDir);
        list.forEach(function(file) {
            fn(file)
        });
    },

    deepListDir : function(root, fn) {
        rootDir = path.join(__dirname, root);

        var list = fs.readdirSync(rootDir);
        list.forEach(function(file) {
            //return to original root absolute path
            rootDir = path.join(__dirname, root);
            var stat = fs.statSync(path.join(rootDir, file));
            if (stat && stat.isDirectory()) { 
                /* Recurse into a subdirectory */
                util.deepListDir(path.join(root, file), fn);
            } else { 
                fn(path.join(root,file));
            }
        });
    }
}

module.exports = util;