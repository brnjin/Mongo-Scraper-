$(document).on("click", ".deleteArticle", function() {
	event.preventDefault();
	var id = $(this).data("id");
	var buttonId = $(this).attr("id");

	$.ajax({
		type: "GET",
		url: "/delete/" + id
	}).then(function() {
		location.reload();
	})
});

$(document).on("click", ".noteArticle", function(){
	event.preventDefault();
	var id = $(this).data("id");
	var buttonId = $(this).attr("id");

	$.ajax({
		type: "GET",
		url: "/notes/" + id
	})
	.then(function() {

      // The title of the article
      $('"#' + id + '"').append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $('"#' + id + '"').append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $('"#' + id + '"').append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $('"#' + id + '"').append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });

})