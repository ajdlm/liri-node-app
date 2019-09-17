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

        console.log("\nARTIST: " + artist + "\n\n----------------------------------");

        axios.get(queryURL)
            .then(function (response) {
                evData = response.data;

                for (var j = 0; evData.length; j++) {
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
                if (error.response) {
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                }
            });

        break;
    case "spotify-this-song":
        var userInput = process.argv;

        var song = "";

        var noSearch = false;

        if (process.argv.length < 4) {
            song = "The+Sign";
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

        console.log(song);

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
                            songArtists += ", " + songData.artists[l].extname;
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
        // stuff
        break;
    case "do-what-it-says":
        //stuff
        break;
};