/**
 * Created by Leo on 16/2/13.
 */

var Git = require("nodegit");
var path = require("path");
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var fs = require('fs');
require('date-utils');

var directoryName = ".tmp";
fse.ensureDir = promisify(fse.ensureDir);

module.exports = {
  updateGit: function (content,passed,callback) {
    // Clone a given repository into the `./tmp` folder.
    var repo;
    var index;
    var oid;
    var fileName = new Date().toFormat('YYYY-MM')+'.mds';
    var fileContent = sails.config.auth.fileContent;
    var passedContent = (passed == true ? '√' : '⨉');
    repoPath = sails.config.auth.repositoryPath;
    checkInPath = sails.config.auth.checkInPath;
    dateTime = new Date().toFormat('YYYY-MM');
    monthAndDay = new Date().toFormat('MM.DD');
    updateFile = checkInPath+'/'+dateTime+'.mds';
    isFileExists =  fs.existsSync(updateFile);

    writeContent = '| '+monthAndDay+' | '+content+' | '+ passedContent +' |';


    if(isFileExists){
      fs.open(updateFile, 'a', 666, function( e, id ) {
        fs.write( id,  writeContent  + "\n", null, 'utf8', function(){
          fs.close(id, function(){
            console.log('file is updated');
          });
        });
      });
    }else{
      Git.Repository.open(repoPath)
        .then(function(repoResult) {
          repo = repoResult;
          return fse.ensureDir(path.join(repo.workdir()+'/checkIn', directoryName));
        }).then(function(){
          return fse.writeFile(path.join(repo.workdir()+ '/checkIn', fileName), fileContent);
        })
        .then(function() {
          return fse.writeFile(
            path.join(repo.workdir(), directoryName, fileName),
            fileContent
          );
        })
        .then(function() {
          return repo.openIndex();
        })
        .then(function(indexResult) {
          index = indexResult;
          return index.read(1);
        })
        .then(function() {
          // this file is in the root of the directory and doesn't need a full path
          return index.addByPath(fileName);
        })
        .then(function() {
          // this file is in a subdirectory and can use a relative path
          return index.addByPath(path.join(directoryName, fileName));
        })
        .then(function() {
          // this will write both files to the index
          return index.write();
        })
        .then(function() {
          return index.writeTree();
        })
        .then(function(oidResult) {
          oid = oidResult;
          return Git.Reference.nameToId(repo, "HEAD");
        })
        .then(function(head) {
          return repo.getCommit(head);
        })
        .then(function(parent) {
          var author = Git.Signature.create("Leo Liu",
            "zmliu0077@gmail.com", new Date().getTime()/1000, 60);
          var committer = Git.Signature.create("Leo Liu",
            "zmliu0077@github.com", new Date().getTime()/1000, 60);

          return repo.createCommit("HEAD", author, committer, "update "+new Date().toFormat('YYYY-MM-DD')+' check in!', oid, [parent]);
        })
        .done(function(commitId) {
          console.log("New Commit: ", commitId);
          callback(null,commitId.toString());
        });
    }


  }
};
