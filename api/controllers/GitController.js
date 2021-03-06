/**
 * GitController
 * @description :: Server-side logic for managing Git
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GitController)
   */

  update:function(req,res){
    var passed = false;
    var content = 'level1';
    if(req.body.status && req.body.status == "passed"){
      passed = true
    }
    if(req.body.content){
      content = req.body.content;
    }
    GitService.updateGit(content,passed,function(err,result){
      if(err){
        res.json({err:err});
      }else{
        res.json({msg:'success',data:result});
      }
    });
  },


  pullRepo:function(req,res){
    GitService.pullRepo(function(err,result){
      if(err){
        res.json({code:1,err:err});
      }else{
        res.json({code:0,msg:'success',data:result});
      }
    });
  },

  addAndCommit:function(req,res){
    GitService.addAndCommit(function(err,result){
      if(err){
        res.json({code:1,err:err});
      }else{
        res.json({code:0,msg:'success',data:result});
      }
    });
  },

  _config: {
    rest: true,
    actions: true,
    shortcuts: true
  }


};
