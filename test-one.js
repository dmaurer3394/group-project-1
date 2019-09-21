var firstName = "";
var secondName = "";
var percentage = "";
var queryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + firstName + "&sname=" + secondName;
var settings = "";

$("#go").on("click", function(event) {
	event.preventDefault();
	// reset();
	firstName = $("#f-name").val().trim();
	lastName = $("#l-name").val().trim();
	console.log(firstName);
	console.log(lastName);
	queryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + firstName + "&sname=" + secondName;

	settings = {
		"async": true,
		"crossDomain": true,
		"url": queryURL,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "love-calculator.p.rapidapi.com",
			"x-rapidapi-key": "57f0a93f82msh11e9e8d0340f0b5p1eb386jsn6513d6683f3e"
		}
	}
	
	$.ajax(settings).done(function (response) {
		console.log(response);
		console.log(queryURL);
		percentage = response.percentage;
		console.log(percentage);
		console.log(firstName);
		console.log(lastName)
		$("#percentage").text(percentage + "%");
		});

	// $("#percentage").text(percentage + "%");
	// $("#poem").text(poem);
})

function reset() {
	firstName = "";
	secondName = "";
	percentage = "";
}