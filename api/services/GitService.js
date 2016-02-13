/**
 * Created by Leo on 16/2/13.
 */

var Git = require("nodegit");
var path = require("path");
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var fileName = "newfile.txt";
var fileContent = "hello world";
var directoryName = "salad/toast/strangerinastrangeland/theresnowaythisexists";
fse.ensureDir = promisify(fse.ensureDir);

module.exports = {
  updateGit: function (callback) {
    // Clone a given repository into the `./tmp` folder.
    var repo;
    var index;
    var oid;

    Git.Repository.open("/Users/Leo/Documents/github/others/fitness")
      .then(function(repoResult) {
        repo = repoResult;
        return fse.ensureDir(path.join(repo.workdir(), directoryName));
      }).then(function(){
        return fse.writeFile(path.join(repo.workdir(), fileName), fileContent);
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
          "zmliu0077@gmail.com", 123456789, 60);
        var committer = Git.Signature.create("Leo Liu",
          "zmliu0077@github.com", 987654321, 90);

        return repo.createCommit("HEAD", author, committer, "message", oid, [parent]);
      })
      .done(function(commitId) {
        console.log("New Commit: ", commitId);
        callback(null,commitId);
      });
  }
};
