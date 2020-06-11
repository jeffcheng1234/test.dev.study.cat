const simpleGit = require('simple-git');
const git = simpleGit(workingDirPath);

const simpleGit = require('simple-git');
const git = simpleGit(); // or git = simpleGit(workingDir);
git.init(onInit).addRemote('origin', 'git@github.com:steveukx/git-js.git', onRemoteAdd);
 
function onInit (err, initResult) { }
function onRemoteAdd (err, addRemoteResult) { }