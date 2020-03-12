// Require Mongoose node module
const mongoose = require('mongoose');

// TODO: Create Creator Schema, name, image, birth year, death year
const creatorSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous'
  },
  image: {
    type: String,
    default: 'http://www.placekitten.com/200/200'
  },
  birthyear: String,
  deathyear: String
});

// TODO: Create Piece Schema name, image, creator, museum
const pieceSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Untitled'
  },
  image: {
    type: String,
    required: true
  },
  creator: creatorSchema,
  museum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Museum'
  }
});

// TODO: Use Piece schema to create Piece model
const Piece = mongoose.model('Piece', pieceSchema);

// TODO: Export Piece Model
module.exports = Piece;