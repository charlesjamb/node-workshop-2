var requestJSON = require('./library/request-json.js').requestJSON;
var prompt = require('prompt');
var colors = require('colors');
var moment = require('moment');
var Table = require('cli-table');

prompt.get('Where are you right now?', function(err, input) {
	if (err) {
		console.log('error');
	}
	else {

		var userInput = input['Where are you right now?'].toLowerCase();

		requestJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput, function(err, result){
				// console.log(result);
				var userLatitude = result.results[0].geometry.location.lat;
				var userLongitude = result.results[0].geometry.location.lng;
				// console.log(userLatitude);
				// console.log(userLongitude);

				requestJSON('https://api.darksky.net/forecast/e8f3ee7861134c0e319a1e881f59ee7c/' + userLatitude + ',' + userLongitude, function(err, result) {
					// variables
					var daily = result['daily'];
					var nextDays = [];
					var nextSummarys = [];
					
					var table = new Table({
						head: ['Next Days'.white, 'Summary'.white],
					});

					for (var i = 1; i <= 5; i++) {
						var day = moment(daily.data[i].time*1000).format("ddd, Do");
						var summary = daily.data[i].summary;

						table.push({
							[day.blue]: summary.green
						})
					}

					// console.logs
					console.log("This week's summary: ".blue, daily.summary.green);
					console.log(table.toString());

				})

		});
	}
})