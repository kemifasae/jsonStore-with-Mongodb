// grab the user model
var Json = require('../models/jsonModel');
var checkJson = require('../helpers/checkJson');
var randomString = require('../helpers/genId');



class jsonController{

  static createNewData(req,res){
      var id = randomString;
      var jsonfile = req.body.value;
        if(checkJson(jsonfile)){
          let newJson;
          Json.findOne({ jsonid: id }, function(error, json){
            if(error){
                res.json(error);
            }
            else if(json == null){
              newJson = Json({
                "jsonid": id,
                "data": jsonfile
              });

            // save the data
            newJson.save(function(err) {
              if (err) throw err;
              let url = 'http://localhost:8080/docs/'+id;
              res.status(200).json({
                message: 'json file saved successfully',
                url: url
              })
            });

            }
            else{
              var newid = randomString;
              newJson = Json({
                "jsonid": newid,
                "data": jsonfile
              });
              // save the data
            newJson.save(function(err) {
              if (err) throw err;
              let url = 'http://localhost:8080/docs/'+id;
              res.status(200).json({
                message: 'json file saved successfully',
                url: url
              })
            });
          }
        });
        }else{
            res.status(500).json({message: 'invalid json'})
          }
      }


  static getData(req,res){
    const reqId = req.params.id;
    Json.findOne({ jsonid: reqId }, function(error, json){
      if(error){
          res.json(error);
      }
      else if(json == null){
          res.json('no such json data!')
      }
      else{
            res.json(json.data);
          }
    });
  }

  static deleteData(req,res){
    const reqId = req.params.id;
    Json.findOneAndRemove({ jsonid: reqId }, function(error, json){
      if(error){
          res.json(error);
      }
      else if(json == null){
          res.json('no such json data!')
      }
      else{
            res.json({message: 'data deleted successfully'});
          }
    });
  }

  static updateData(){
    let reqId = req.params.id
    Json.findOne({ jsonid: reqId }, function(error, json){
      if(error){
          res.json(error);
      }
      else if(json == null){
          res.json('no such json data!')
      }
      else{
        json.save(function(err) {
          if (err) throw err;
          res.status(200).json({
            message: 'json file updated successfully',
            data: json.data
          })
        });
      }
    });
  }
}

module.exports = jsonController;
