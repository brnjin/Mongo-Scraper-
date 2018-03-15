var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
//Scrapers 
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3030;

var app = express();

//middleware

app.use(logger("dev"));
//body-parse for form submissions
app.use(bodyParser.urlencoded({extended: false}));
//Use public folder as static directory
app.use(express.static("public"));
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));


//Connect to mongoDB
mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.connect(MONGODB_URI, {
	useMongoClient: true
});

//Get route to scrape from NY Times
app.get("/scrape", function(req, res) {
	axios.get("https://www.nytimes.com/section/us?module=SectionsNav&action=click&version=BrowseTree&region=TopBar&contentCollection=U.S.&pgtype=sectionfront")
	.then(function(response) {
		//Saving into a eaiser selector
		var $ = cheerio.load(response.data);

		//Grabbing the h2 header  
		$("div.story-meta").each(function(i, element) {
			//Used to store headlines
			var result = {};

			//Goes in and grabs all the headline texts
			result.title = $(this)
				.children("h2.headline")
				.text()
				.trim();
			result.summary = $(this)
				.children("p.summary")
				.text()
				.trim();
			result.status = false;
/*			result.url = $(this)
				.children("h2.headline")
				.attr("href");*/

			//Create new article that is saved in result
			db.Article
				.deleteMany({})
				.create(result)
				.then(function(dbArticle) {
					console.log(dbArticle);
				})
				//If an error occurred
				.catch(function(err) {
					return res.json(err);
				});
		});
	})
	res.redirect('/');
})

require("./routes/api-routes.js")(app);

app.listen(PORT, ()=> {
	console.log("App running on port " + PORT)
})