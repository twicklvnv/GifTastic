var topics = ["Star Wars", "Groundhog Day", "Raiders of the Lost Ark", 
"Elf", "Anchorman", "Dodgeball", "Spiderman",
"Talladega Nights", "The Terminator", "There's Something About Mary",
"Die Hard", "Blazing Saddles", "Spaceballs", "O Brother, Where Art Thou?",
"The Big Lebowski", "Blades of Glory"]
console.log(topics.length);

//adding the buttons to call the gifs
function addButtons() {
	$("#buttons-view").empty();
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("movie");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#buttons-view").append(a);
	}
}
var topic;


$("#addMovie").on("click", function() {
		//event.preventDefualt();
		var newMovie = $("#movie-input").val().trim();
		console.log(newMovie);
		topics.push(newMovie);
		console.log(topics.length);
		console.log(topics);
		addButtons();
		return false;
	})
addButtons();

$("body").on("click", "button", function() {
		var topic = $(this).data("name");
		console.log(topic);
	$("#gifs-view").empty();
	

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + 
	"&api_key=c7dNKafEbnZZEYQyd2RGChajqv9ZZaFo&limit=10";

 	console.log(queryURL);

	$.ajax( {
		url: queryURL,
		method: "GET",
	})
	.done(function(response) {
		var results = response.data;
		console.log(response.data);
	

	for (var i = 0; i < results.length; i++) {
		var rating = results[i].rating;
		console.log(rating);

		var movieDiv = $("<div class='item'>");


		var p = $("<p>").text("Rating: " + rating);

		var still = results[i].images.fixed_height_still.url;

		var animate = results[i].images.fixed_height.url;

		var gifImage = $("<img>");

		gifImage.attr("src", still);

		gifImage.attr("data-still", still);

		gifImage.attr("data-animate", animate);

		gifImage.attr("data-state", "still");

		gifImage.addClass("gif");



		movieDiv.append(p);
	    movieDiv.append(gifImage);

	    $("#gifs-view").append(movieDiv);
	}



  })

})


	$(document).on("click", ".gif", function() {
		var state = $(this).attr("data-state");
		if (state == "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}
	})

	/*$("#addMovie").on("click", function() {
		//event.preventDefualt();
		var newMovie = $("#movie-input").val().trim();
		topics.push(newMovie);
		console.log(topics);
		addButtons();
		return false;
	})*/

	//addButtons();