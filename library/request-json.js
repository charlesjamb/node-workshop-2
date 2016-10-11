var request = require('request');

function requestJSON(url, callback) {
	request(url, function(err, result) {
		if (err) {
			callback(err)
		}
		try {
			callback(null, JSON.parse(result.body));
		}
		catch(error) {
			callback(error);
		}
	})	
}

exports.requestJSON = requestJSON;