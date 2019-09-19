# LIRI Bot

A node app that takes in parameters from the bash command line and then returns information to the user.

One of three types of information can be searched for -- information about concerts, information about songs and information about movies.

## Finding Information About Concerts

* Use the bash command line to navigate into the LIRI Bot app's repository.

* At the bash command line, enter "node liri.js concert-this" followed by the name of any artist or band that you want to find concerts or other such events for.

* LIRI Bot will then query the Bandsintown API and attempt to return information on multiple such events (if it can find them).

* If successful, it will return information on the name of the venue for each event, the location of the venue for each event and the date of each event.

* If unsuccessful, either because the artist wasn't found or no events were found for the artist, it will tell the user that there are no results.

## Finding Information About Songs

* Use the bash command line to navigate into the LIRI Bot app's repository.

* At the bash command line, enter "node liri.js spotify-this-song" followed by the name of any song that you want to find information on.

* LIRI Bot will then query the Spotify API and attempt to return information on the first song that it finds.

* If successful, it will list the artist or artists responsible for the song, the name of the song, a link to a preview of the song on Spotify (if available) and the name of the album that the song is from.

* If unsuccessful, it will tell the user that there are no results.

## Finding Information About Movies

* Use the bash command line to navigate into the LIRI Bot app's repository.

* At the bash command line, enter "node liri.js movie-this" followed by the name of any movie that you want to find information on.

* LIRI Bot will then query the OMDb API and attempt to return information on a movie that matches the user's search term.

* If successful, it will list the movie's title, the year it was released, its rating on IMDb, its rating on Rotten Tomatoes, the country where it was made, its language, a summary of its plot and some of its principal actors and actresses.

* If unsuccessful, it will tell the user that there are no results.
