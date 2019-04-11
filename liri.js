require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var command = process.argv[2];

if (command === "movie-this") {
    getMovie();
}

if (command === "song-this") {
    getSong();
}

// SPOTIFY functionality
function getSong() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items);
    });
}

// OMDB functionality
function getMovie() {
    var baseURL = "http://www.omdbapi.com/";
    var apiKey = "trilogy";
    var movieTitle = process.argv[3];
    axios.get(
        `${baseURL}?apikey=${apiKey}&t=${movieTitle}`
    )
    .then(function (data) {
        console.log(data);
        console.log(`Title: ${data.data.Title}`);
        console.log(`Released: ${data.data.Year}`);
        console.log(`IMDB Rating: ${data.data.imdbRating}`);
        console.log(`RT Rating: There is no RT rating...`);
        console.log(`Country: ${data.data.Country}`);
        console.log(`Language: ${data.data.Language}`);
        console.log(`Plot: ${data.data.Plot}`);
        console.log(`Actors: ${data.data.Actors}`);
    })
    .catch(function (error) {
        console.log(error);
    });
}