/**
 * Created by Leo on 16/2/13.
 */

var fs = require('fs-extra');

module.exports = {
  writeFile: function(updateFile,monthAndDay,writeContent,callback){
    var data = fs.readFileSync(updateFile, 'utf-8');
    if (data.toString().indexOf(monthAndDay) == -1) {
      fs.open(updateFile, 'a', 666, function( e, id ) {
        fs.write(id, writeContent + "\n", null, 'utf8', function () {
          fs.close(id, function () {
            callback(null, "update success !");
          });
        });
      });
    }else{
      callback(null,"already updated !");
    }
  }
};
