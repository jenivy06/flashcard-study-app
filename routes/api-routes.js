// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the flashcards
  app.get("/api/flashcards/", function(req, res) {
    db.Flashcard.findAll({})
      .then(function(dbFlashcard) {
        res.json(dbFlashcard);
      });
  });

  // Get route for returning Flashcards of a specific category
  app.get("/api/flashcards/category/:category", function(req, res) {
    db.Flashcard.findAll({
      where: {
        subject: req.params.subject
      }
    })
      .then(function(dbFlashcard) {
        res.json(dbFlashcard);
      });
  });

  // Get route for retrieving a single Flashcard
  app.get("/api/flashcards/:id", function(req, res) {
    db.Flashcard.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbFlashcard) {
        res.json(dbFlashcard);
      });
  });

  // POST route for saving a new post
  app.post("/api/flashcards", function(req, res) {
    console.log(req.answer);
    db.Flashcard.create({
      question: req.body.question,
      answer: req.body.answer,
      subject: req.body.subject
    })
      .then(function(dbFlashcard) {
        res.json(dbFlashcard);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/flashcards/:id", function(req, res) {
    db.Flashcard.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbFlashcard) {
        res.json(dbFlashcard);
      });
  });

  // PUT route for updating posts
  app.put("/api/flashcards", function(req, res) {
    db.Flashcard.update(req.answer,
      {
        where: {
          id: req.answer.id
        }
      })
      .then(function(dbFlashcard) {
        res.json(dbFlashcard);
      });
  });
};
