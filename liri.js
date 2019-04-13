require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var command = process.argv[2];

if (command === "movie-this") {
    getMovie();
}

if (command === "spotify-this-song") {
    getSong();
}

if (command === "concert-this") {
    getShows();
}

// if (command === "test") {
//     test();
// }

// function test() {
//     spotify
//         .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//         .then(function (data) {
//             console.log(data);
//         })
//         .catch(function (err) {
//             console.error('Error occurred: ' + err);
//         });
// }

// SPOTIFY functionality
function getSong() {
    var songTitle = process.argv[3];
    spotify.search({ type: 'track', query: `${songTitle}` }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(JSON.stringify(data, null, 2));
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

// BANDS-IN-TOWN functionality

function getShows() {
    var artist = process.argv[3];
    var queryURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
    axios
      .get(queryURL)
      .then(function(data) {
          for (var i = 0; i < data.data.length; i++) {
              console.log(`Venue: ${data.data[i].venue.name}`);
              console.log(`City: ${data.data[i].venue.city}, ${data.data[i].venue.region}`);
              console.log(`Date: ${data.data[i].datetime}\n`);
          }
        // console.log(data.data[0]);
      })
      .catch(function(error) {
        console.log(error);
      });
}