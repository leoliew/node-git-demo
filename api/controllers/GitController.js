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
    GitService.updateGit(function(err,result){
      if(err){
        res.json({err:err});
      }else{
        res.json({msg:'success',data:result});
      }
    });

  },

  _config: {
    rest: true,
    actions: true,
    shortcuts: true
  }


};
