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

  // GET route for getting all of the blogs
  app.get("/api/blogs/", function(req, res) {
    db.Blog.findAll({})
      .then(function(dbBlog) {
        res.json(dbBlog);
      });
  });

  // Get route for returning blogs of a specific category
  app.get("/api/blogs/category/:category", function(req, res) {
    db.Blog.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbBlog) {
        res.json(dbBlog);
      });
  });

  // Get route for returning blogs of a specific location
  app.get("/api/blogs/location/:location", function(req, res) {
    db.Blog.findAll({
      where: {
        location: req.params.location
      }
    })
      .then(function(dbBlog) {
        res.json(dbBlog);
      });
  });

  // Get route for retrieving a single blog
  app.get("/api/blogs/:id", function(req, res) {
    db.Blog.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbBlog) {
        res.json(dbBlog);
      });
  });

  // POST route for saving a new post
  app.post("/api/blogs", function(req, res) {
    console.log(req.body);
    db.Blog.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      location: req.body.location
    })
      .then(function(dbBlog) {
        res.json(dbBlog);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/blogs/:id", function(req, res) {
    db.Blog.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbBlog) {
        res.json(dbBlog);
      });
  });

  // PUT route for updating posts
  app.put("/api/blogs", function(req, res) {
    db.Blog.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbBlog) {
        res.json(dbBlog);
      });
  });
};
