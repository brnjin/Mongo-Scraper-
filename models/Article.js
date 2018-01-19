var mongoose = require("mongoose");

//Schema constructor saved 
var Schema = mongoose.Schema

var ArticleSchema = new Schema({
	//Saves the article title into the db
	title: {
		type: String,
		required: true
	},
	//Used to save the note according to the ObjectId of the title
	summary: {
		type: String,
		required: true
	},
	status: {
		type: Boolean
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

//Saves the model from the schema above according to the monooose method
var Article = mongoose.model("Article", ArticleSchema);

//Export the Article model to be used 
module.exports = Article