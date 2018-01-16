// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var jsonSchema = new Schema({
  jsonid: { type: String, unique: true, required: true},
  data: { type: Object, required: true},
  //uniqueId: {type: String, required: true, unique: true},
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var data = mongoose.model('data', jsonSchema);

// on every save, add the date
jsonSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// Virtual for json's URL
jsonSchema
.virtual('url')
.get(function () {
  return '/docs/' + this._id;
});


// make this available to our users in our Node applications
module.exports = data;
