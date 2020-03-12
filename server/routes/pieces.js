const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res) => {
  db.Piece.find(req.query).populate('museum')
  .then(pieces => res.send(pieces))
  .catch(err=>res.send({ message: 'Error in getting all pieces', err}));
});

router.post('/', (req, res) => {
  let newPiece = {
    name: req.body.pName,
    image: req.body.pImage,
    museum: req.body.museum,
    creator: {
      name: req.body.cName,
      image: req.body.cImage,
      birthYear: req.body.birthYear,
      deathYear: req.body.deathYear
    }
  }
  Object.keys(newPiece).forEach((key) => (newPiece[key] == '') && delete newPiece[key]);
  Object.keys(newPiece.creator).forEach((key) => (newPiece.creator[key] == '') && delete newPiece.creator[key]);

  db.Piece.create(newPiece)
  .then(piece => res.send(piece))
  .catch(err=>res.send({ message: 'Error in creating a piece', err}));
})

router.get('/:id', (req, res) => {
  db.Piece.findById(req.params.id).populate('museum')
  .then(piece => res.send(piece))
  .catch(err=>res.send({ message: 'Error in getting one piece', err}));
})

module.exports = router;