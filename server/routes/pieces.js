const express = require('express');
const router = express.Router();
const db = require("../models/index");

router.get("/", (req, res) => {
  db.Piece.find().then(pieces => {
    res.send(pieces);
  }).catch(err => {
    res.status(404).send({ message: `Pieces not found: ${ err }` });
  })
});

router.get("/:id", (req, res) => {
  db.Piece.findById(req.params.id).then(piece => {
    res.send(piece);
  }).catch(err => {
    res.status(404).send({ message: `Piece not found: ${err}` });
  });
});

router.post("/", (req, res) => {

  const formPiece = {
    name: req.body.name,
    image: req.body.image,
    creator: {
      name: req.body.artist_name,
      image: req.body.artist_image,
      birthyear: req.body.birthyear,
      deathyear: req.body.deathyear
    }
  }

  db.Museum.findOne({ name: req.body.museum_name }).then(museum => {
    if (museum) {
      formPiece.museum = museum._id;
      db.Piece.create(formPiece).then(newPiece => {
        res.send(newPiece);
      }).catch(err => {
        res.status(500).send({ message: `Could not add piece: ${err}` });
      });
    } else {
      db.Museum.create({
        name: req.body.museum_name,
        city: req.body.museum_city,
        country: req.body.museum_country,
        image: req.body.museum_image
      }).then(newMuseum => {
        formPiece.museum = newMuseum._id;
        db.Piece.create(formPiece).then(newPiece => {
          res.send(newPiece);
        }).catch(err => {
          res.status(500).send({ message: `Could not add piece: ${err}` });
        });
      }).catch(err => {
        res.status(500).send({ message: `Could not add piece: ${err}` });
      });
    }
  }).catch(err => {
    res.status(500).send({ message: `Could not add piece: ${err}` });
  });
});



module.exports = router;