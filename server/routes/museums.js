const express = require('express');
const router = express.Router();
const db = require("../models/index");

router.get("/", (req, res) => {
  db.Museum.find().then(museums => {
    res.send(museums);
  }).catch(err => {
    res.status(404).send({ message: `Museums not found: ${ err }` });
  })
});

router.get("/:id", (req, res) => {
  db.Museum.findById(req.params.id).then(museum => {
    res.send(museum);
  }).catch(err => {
    res.status(404).send({ message: `Museum not found: ${err}` });
  });
});

router.post("/", (req, res) => {
  db.Museum.findOne({ name: req.body.name }).then(museum => {
    if (museum) {
      return res.status(409).send({ message: "Museum already exists in database"});
    } else {
      db.Museum.create(req.body).then(newMuseum => {
        res.redirect("/museums/");
      }).catch(err => {
        res.status(500).send({ message: `Could not add museum: ${err}` });
      });
    }
  }).catch(err => {
    res.status(500).send({ message: `Could not add museum ${err}` });
  });
});

module.exports = router;