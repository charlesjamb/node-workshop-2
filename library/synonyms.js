// BT key = http://words.bighugelabs.com/api/2/ba18e233f529f9face16f984325c57ec/word/json

var request = require('request');

function SynonymAPI(apiKey) {
	this.key = apiKey;
}

SynonymAPI.prototype.getSynonyms = function(word, callback) {
	request('http://words.bighugelabs.com/api/2/'+ this.key + '/' + word + '/json', function(err, result) {
		if (err) {
			// console.log('err1');
			callback(err);
		}
		else {
			// console.log('err2');
			callback(null, JSON.parse(result.body));
		}
	})
}

exports.SynonymAPI = SynonymAPI;