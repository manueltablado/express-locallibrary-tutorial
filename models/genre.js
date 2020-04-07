var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema (
    {
        name: {type: String, required: true, min: 3, max: 100}
    }
);

// Virtual for genreinstance's URL
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
  // return '/catalog/genreinstance/' + this._id;
});

//Export Model
module.exports = mongoose.model('Genre', GenreSchema);