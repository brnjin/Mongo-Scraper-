var db = require("../models");
var mongojs = require("mongojs");

module.exports = function(app) {

	//inital data retrieval
	app.get("/", function(req, res) {
	db.Article
		.find({status: false})
		.then(function(dbArticle) {
			return dbArticle
		})
		.then(function(result) {
			res.render("index", 
				{"dbArticle": result})
		})
		.catch(function(err) {
			res.json(err)
		})
		.remove({})

	});

	//used to change status of saved articles
	app.post("/:id", function(req, res) {
		db.Article
		.create(req.status)
		.then(function(dbArticle) {
			return db.Article.findOneAndUpdate({_id: req.params.id}, {status: true}, {new: true})
		})
		.then(function(dbArticle){
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err)
		})
	})


//Save articles 
	app.get("/saved", function(req, res) {
		db.Article
			.find({status: true})
			.then(function(dbArticle){
				return dbArticle
			})
			.then(function(result) {
				res.render("saved",
					{"dbArticle": result})
			})
			.catch(function(err) {
				res.render(err)
			})
	})
	app.post("/saved/:id", function(req, res) {
		db.Article
			.findOne({id: req.params.id})
			.then(function(dbArticle){
				res.render("saved", 
					{"dbArticle": result})
			})
			.catch(function(err) {
				res.render(err)
			})
	})
	//create new notes
	app.post("/notes", function(req, res) {
	  // Create a new Note in the db
	  db.Note
	    .create(req.body)
	    .then(function(dbNote) {

	      return db.Article.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
	    })
	    .then(function(dbArticle) {
	      // If the User was updated successfully, send it back to the client
	      res.render("saved", 
				{"dbnotes": result});
	    })
	    .catch(function(err) {
	      // If an error occurs, send it back to the client
	      res.json(err);
	    });
	});
		// populate with note
	app.get("/notes/:id", function(req, res) {
	  // 
	  db.Article
	    .findOne({ _id: req.params.id })
	    //
	    .populate("note")
	    .then(function(dbArticle) {
	      // I
	      res.json(dbArticle);
	    })
	    .catch(function(err) {
	      // 
	      res.json(err);
	    });
	});

	// Save/update note
	app.post("/notes/:id", function(req, res) {
	  // 
	  db.Note
	    .create(req.body)
	    .then(function(dbNote) {
	      // 
	      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
	    })
	    .then(function(dbArticle) {
	      // 
	      res.json(dbArticle);
	    })
	    .catch(function(err) {
	      // 
	      res.json(err);
	    });
	});

	//delete article
	app.get("/delete/:id", function(req, res) {
	  // Remove a note using the objectID
	  db.Article.remove(
	    {
	      _id: mongojs.ObjectID(req.params.id)
	    },
	    function(error, removed) {
	      // Log any errors from mongojs
	      if (error) {
	        console.log(error);
	        res.send(error);
	      }
	      else {
	        // Otherwise, send the mongojs response to the browser
	        // This will fire off the success function of the ajax request
	        console.log(removed);
	        res.send(removed);
	      }
	    }
	  );
});

}
