// Declare global variables
var firstName = "";
var secondName = "";
var percentage = "";
var calcQueryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + firstName + "&sname=" + secondName;
var settings = "";
var poemURL = "https://thundercomb-poetry-db-v1.p.rapidapi.com/linecount/" + percentage;
var poemArray = [];
var poemToDisplay = [];

// This function grabs the values from the name inputs and assigns them to variables, which are inserted into the query URL.
function loveName() {
	reset();
	firstName = $("#f-name").val().trim();
	secondName = $("#l-name").val().trim();

	// It makes a GET request to get your "compatibility percentage" which is displayed on screen.
	calcQueryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + firstName + "&sname=" + secondName;
	settings = {
		"async": true,
		"crossDomain": true,
		"url": calcQueryURL,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "love-calculator.p.rapidapi.com",
			"x-rapidapi-key": "57f0a93f82msh11e9e8d0340f0b5p1eb386jsn6513d6683f3e"
		}
	}

	// We then call the functions to display the poem.
	$.ajax(settings).done(function (response) {
		percentage = response.percentage;
		$("#percentage").text(percentage + "%");
		poemLines();
	});
}

// Here we put the percentage you were given into the poem API query URL to return a poem with the same linecount.
function poemLines(loveName) {

	var poemURL = "https://thundercomb-poetry-db-v1.p.rapidapi.com/linecount/" + percentage;

	settings = {
		"async": true,
		"crossDomain": true,
		"url": poemURL,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "thundercomb-poetry-db-v1.p.rapidapi.com",
			"x-rapidapi-key": "2ab08fa6e5msh6a35a71dc08653cp1d8de2jsn9999fa7a0623"
		}
	}

	// The responses we get sometimes have the wrong linecount, so we loop though to check the linecount, and put correct ones in their own array.
	$.ajax(settings).done(function (response) {
		for (var i = 0; i < response.length; i++) {
			if (response[i].linecount === percentage) {
				poemArray.push(response[i])
			}
		}

		// We then generate a random number to pull a random poem so you're not given the same poem if you hit "go" again.
		var number = Math.floor(Math.random() * poemArray.length);
		var poemToDisplay = poemArray[number].lines;
		$(".loader").remove();

		// After we choose a poem, we loop through to display the poem on the page.
		for (i = 0; i < poemToDisplay.length; i++) {
			var poemDiv = $("<p>").text(poemToDisplay[i]);
			$("#poem").append(poemDiv);
		}
	});

}

// This blanks out both text fields, the percentage variable, and the array of correct linecount poems.
// Clearing the names and percentage is mostly for convenience, but the array would stack with the old poems if not cleared.
function reset() {
	firstName = "";
	secondName = "";
	percentage = "";
	poemArray = [];
}

// On click function to start the process.
$(document).ready(function () {
	$("#go").on("click", function (event) {
		event.preventDefault();

		// If either text field is empty, the button will not execute any function.
		if ($("#f-name").val().trim() != "" && $("#l-name").val().trim() != "" ) {
			loveName();
			$("#poem").empty();
			$("#poem").append("<div class='loader'>");
		}
	});
});