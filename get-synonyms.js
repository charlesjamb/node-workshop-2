var SynonymAPI = require('./library/synonyms.js').SynonymAPI;
var prompt = require('prompt');
var colors = require('colors');
var moment = require('moment');
var Table = require('cli-table');

prompt.get('Give me a word', function(err, input) {
	var synonym = new SynonymAPI('ba18e233f529f9face16f984325c57ec');
	if (err) {
		console.log('Oops you fucked up, error in prompt.get');
	}
	else {
		var userInput = input['Give me a word'];
		// console.log(userInput);

		synonym.getSynonyms(userInput, function(err, result) {
			if (err) {
				console.log(err, 'Oops you fucked up, error in SynonymAPI prototype');
			}
			else {
				console.log(result.noun);
			}
		});
	}
})