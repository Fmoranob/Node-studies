const weather = require('./weather');

const query = process.argv.slice(2);

weather.get(query[0],query[1]);

// const lat = '37.8267';
// const lon = '-122.4233';