var firstName = "";
var secondName = "";
var percentage = "";
var calcQueryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + firstName + "&sname=" + secondName;
var settings = "";
var poemURL = "https://thundercomb-poetry-db-v1.p.rapidapi.com/linecount/" + percentage;
var poemArray = [];
var poemToDisplay = [];

function loveName() {
	reset();
	firstName = $("#f-name").val().trim();
	secondName = $("#l-name").val().trim();

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


	$.ajax(settings).done(function (response) {

		percentage = response.percentage;
		$("#percentage").text(percentage + "%");
		poemLines();
		displayPoem();


	});
}

function poemLines(loveName) {
	// console.log(percentage);

	var poemURL = "https://thundercomb-poetry-db-v1.p.rapidapi.com/linecount/" + percentage;


	// console.log(poemURL);
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
	$.ajax(settings).done(function (response) {
		for (var i = 0; i < response.length; i++) {
			if (response[i].linecount === percentage) {
				poemArray.push(response[i])
				// var numOfPoems = response.length;
			}
		}

		var number = Math.floor(Math.random() * poemArray.length);
		var poemToDisplay = poemArray[number].lines;

		// for (j = 0; j < response[number].lines.length; j++) {
        //     console.log(response[number].lines[j]);
        // }

		// console.log(poemArray[number]);
		// console.log(response)
		// console.log(response.length);
		// console.log(poemArray.length);
		// console.log(poemToDisplay);

		for (i = 0; i < poemToDisplay.length; i++) {
			var poemDiv = $("<div>").text(poemToDisplay[i]);
			$("#poem").append(poemDiv);
		}
	});

}

function displayPoem() {
	// console.log(poemToDisplay);
}

function reset() {
	firstName = "";
	secondName = "";
	percentage = "";
	poemArray = [];
}

$(document).ready(function () {
	$("#go").on("click", function (event) {
		event.preventDefault();
		loveName();
		$("#poem").empty();
	});
});