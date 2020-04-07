var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {

// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case

  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }

  return fullname;
});

AuthorSchema
.virtual('lifespan_formated')
.get(function () {
  return (moment(this.date_of_birth).format('MMMM Do, YYYY') + ' - ' + (moment(this.date_of_death).format('MMMM Do, YYYY')));
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return (this.born_formatted.getYear() - this.date_of_birth.getYear()).toString();
});


// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);


// Otro tipo de Constructor con todas los tipos de atributos.
// var schema = new Schema(
//     {
//       name: String,
//       binary: Buffer,
//       living: Boolean,
//       updated: { type: Date, default: Date.now() },
//       age: { type: Number, min: 18, max: 65, required: true },
//       mixed: Schema.Types.Mixed,
//       _someId: Schema.Types.ObjectId,
//       array: [],
//       ofString: [String], // You can also have an array of each of the other types too.
//       nested: { stuff: { type: String, lowercase: true, trim: true } }
//     })