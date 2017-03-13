const https = require('https');
const http = require('http');
const api = require('./api.json');

// print function
function printMessage( temperture, climate ){
	const message = `It's ${climate} and temperture ${temperture}`;
	console.log(message);
}

// Print out error message
function printError(error){
	console.error(error.message);
}

function get(lat, lon){
	try	{
		// Connect to API URL
		const request = https.get(`https://api.darksky.net/forecast/${api.key}/${lat},${lon}`, response => {
			if( response.statusCode === 200 ){
				let body = '';

				// Read the data
			    response.on('data', data => {
			      body += data.toString();
			    });

				response.on('end', () => {
					try {
						// Parse data
						const weather = JSON.parse(body);
						printMessage(weather.currently.temperature, weather.currently.summary);
					} catch (error){
						printError(error);
					}
				})
			} else {
				const message = `There was an error getting the information for ${lat}, ${lon} (${http.STATUS_CODES[response.statusCode]})`
				const statusCodeMessage = new Error(message);
				printError(statusCodeMessage);
			}

		})
	} catch (error){
		printError(error);
	}
}

// Export module for app use
module.exports.get = get;

// TODO: handle errors