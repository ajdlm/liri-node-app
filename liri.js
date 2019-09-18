require("dotenv").config();

var Spotify = require("node-spotify-api");

var axios = require("axios");

var moment = require("moment");
moment().format();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

switch (process.argv[2]) {
    case "concert-this":
        var userInput = process.argv;

        var artist = "";

        for (var i = 3; i < userInput.length; i++) {
            if (i > 3) {
                artist += "+" + userInput[i];
            }

            else {
                artist += userInput[i];
            };
        };

        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        artist = artist.replace(/\+/g, " ");

        console.log("\nSEARCH: " + artist + "\n\n----------------------------------");

        axios.get(queryURL)
            .then(function (response) {
                evData = response.data;

                for (var j = 0; j < evData.length; j++) {
                    eventDate = moment(evData[j].datetime).format("MM/DD/YYYY");

                    console.log("\nEVENT #" + (j + 1) + "\n\nVenue Name: " + evData[j].venue.name + "\nVenue Location: " + evData[j].venue.city + ", " + evData[j].venue.country + "\nEvent Date: " + eventDate + "\n");

                    if ((j + 1) < evData.length) {
                        console.log("----------------------------------");
                    };
                };

                // The following can be uncommented to print the entire result in JSON:
                //console.log(JSON.stringify(response.data, undefined, 2));
            })
            .catch(function (error) {
                console.log(error);
            });

        break;
    case "spotify-this-song":
        var userInput = process.argv;

        var song = "";

        var noSearch = false;

        if (process.argv.length < 4) {
            song = "The+Sign+(US+Album)";
            noSearch = true;
        }

        else {
            for (var k = 3; k < userInput.length; k++) {
                if (k > 3) {
                    song += "+" + userInput[k];
                }

                else {
                    song += userInput[k];
                };
            };
        };

        spotify
            .search({ type: "track", query: song, limit: 1 })
            .then(function (response) {
                if (noSearch === true) {
                    console.log("\nSEARCH: No search term provided.\n\n----------------------------------");
                }

                else {
                    song = song.replace(/\+/g, " ");

                    console.log("\nSEARCH: " + song + "\n\n----------------------------------");
                };

                if (response.tracks.items.length > 0) {
                    var songData = response.tracks.items[0];

                    var songArtists = "";

                    var previewURL;

                    if (songData.preview_url === null) {
                        previewURL = "none available";
                    }

                    else {
                        previewURL = songData.preview_url;
                    };

                    for (var l = 0; l < songData.artists.length; l++) {
                        if (l > 0) {
                            songArtists += ", " + songData.artists[l].name;
                        }

                        else {
                            songArtists += songData.artists[l].name;
                        };
                    }

                    console.log("\nArtist(s): " + songArtists + "\nSong Name: " + songData.name + "\nSpotify Preview Link: " + previewURL + "\nAlbum: " + songData.album.name + "\n");
                }

                else {
                    console.log("\nNo results.\n")
                };

                // The following can be uncommented to print the entire result in JSON:
                // console.log(JSON.stringify(songData, undefined, 2));
            })
            .catch(function (err) {
                console.log(err);
            });

        break;
    case "movie-this":
        var userInput = process.argv;

        var movie;

        var noSearch = false;

        if (process.argv.length < 4) {
            movie = "Mr.+Nobody";
            noSearch = true;
        }

        else {
            movie = userInput.slice(3).join("+");
        };
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        axios.get(queryURL)
            .then(function (response) {
                if (noSearch === true) {
                    console.log("\nSEARCH: No search term provided.\n\n----------------------------------");
                }

                else {
                    movie = movie.replace(/\+/g, " ");

                    console.log("\nSEARCH: " + movie + "\n\n----------------------------------");
                }

                var data = response.data;

                var rottenRating;

                var isRotten = false;

                if (data.Ratings) {
                    for (var m = 0; m < data.Ratings.length; m++) {
                        if (data.Ratings[m].Source === "Rotten Tomatoes") {
                            rottenRating = data.Ratings[m].Value;
                            isRotten = true;
                        };
                    };
                };

                if (isRotten === false) {
                    rottenRating = "not available";
                };

                console.log("\nMovie Title: " + data.Title + "\n\nYear Released: " + data.Year + "\n\nIMDB Rating: " + data.imdbRating + "\n\nRotten Tomatoes Rating: " + rottenRating + "\n\nCountry of Origin: " + data.Country + "\n\nLanguage: " + data.Language + "\n\nPlot: " + data.Plot + "\n\nActors: " + data.Actors + "\n");
            })
            .catch(function (error) {
                console.log(error);
            });

        break;
    case "do-what-it-says":
        //stuff
        break;
};