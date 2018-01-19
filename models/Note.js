var mongoose = require("mongoose");

//Save Schema 
var Schema = mongoose.Schema;

//Object setup for the new notes that will be saved
var NoteSchema = new Schema ({
	title: String,
	body: String
});

//Saves the new Note Schema to be exported
var Note = mongoose.model("Note", NoteSchema);

//Exports the Note Schema 
module.exports = Note;