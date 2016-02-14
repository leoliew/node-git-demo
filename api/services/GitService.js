/**
 * Created by Leo on 16/2/13.
 */

var path = require("path");
var fs = require('fs-extra');
require('date-utils');


var simpleGit = require('simple-git')(sails.config.auth.repositoryPath);

module.exports = {
  updateGit: function (content,passed,callback) {
    var fileName = new Date().toFormat('YYYY-MM') + '.md';
    var fileContent = sails.config.auth.fileContent;
    var passedContent = (passed == true ? '√' : '⨉');
    repoPath = sails.config.auth.repositoryPath;
    checkInPath = sails.config.auth.checkInPath;
    dateTime = new Date().toFormat('YYYY-MM');
    monthAndDay = new Date().toFormat('MM.DD');
    updateFile = checkInPath + '/' + dateTime + '.md';
    isFileExists = fs.existsSync(updateFile);
    writeContent = '| ' + monthAndDay + ' | ' + content + ' | ' + passedContent + ' |';
    if(isFileExists){
      writeFileService.writeFile(updateFile,monthAndDay,writeContent,function(err,result){
        callback(err,result);
      })
    }else{
      fs.writeFileSync(path.join(checkInPath, fileName), fileContent);
      writeFileService.writeFile(updateFile,monthAndDay,writeContent,function(err,result){
        callback(err,result);
      });
    }
  },


  pullRepo: function(callback){
    simpleGit.pull(sails.config.auth.remote,sails.config.auth.branch, function(err, update) {
      callback(err,update);
    })
  },

  addAndCommit: function(callback){
    var commitComment = "update " + new Date().toFormat('YYYY-MM-DD') + ' check in!';
    simpleGit.add('./*').commit(commitComment).push('origin', sails.config.auth.branch,function(err, update) {
      callback(err,update);
    });
  }


};
