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
				// console.log(result);
				var table = new Table({
					head: ['Noun'.white, 'Adjective'.white, 'Adverb'.white, 'Verb'.white],
				});
				var noun = (result.noun && result.noun.syn) || [];
				var adj = (result.adjective && result.adjective.sim) || [];
				var adv = (result.adverb && result.adverb.syn) || [];
				var verb = (result.verb && result.verb.syn) || [];

				table.push(
					[noun.join('\n'),
					 adj.join('\n'),
					 adv.join('\n'),
					 verb.join('\n')]
				)

				console.log(table.toString());
			}
		});
	}
})