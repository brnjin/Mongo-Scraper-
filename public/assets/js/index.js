//button to scrape with cherrio
//save into mongo
//handlebars to display the data 
	//button to save article
//2 routes
	//home page 
	//saved articles
		//display with handlebars 
			//show add note button 
				//modal to show to note
					//save into db using the id of the article 
			//show delete button 
/*$.getJSON("/articles", function(data){
	res.render("index", 
			{"dbArticle": result})
		})
})*/


//onclick function to toggle status 
$(document).on("click", ".saveArticle", function(event) {
	event.preventDefault();
	var id = $(this).data("id");
	var buttonId = $(this).attr("id");

	$.ajax({
		method: "POST",
		url:"/" + id,
		data: {
			status: true
		}
	}).then(function() {
		location.reload();
	})
});

$(document).on("click", ".scrapeNew", function(event) {
});
