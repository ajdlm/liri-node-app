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

* If no song name is entered after "spotify-this-song," LIRI Bot will return information on the song "The Sign" by Ace of Base.

## Finding Information About Movies

* Use the bash command line to navigate into the LIRI Bot app's repository.

* At the bash command line, enter "node liri.js movie-this" followed by the name of any movie that you want to find information on.

* LIRI Bot will then query the OMDb API and attempt to return information on a movie that matches the user's search term.

* If successful, it will list the movie's title, the year it was released, its rating on IMDb, its rating on Rotten Tomatoes, the country where it was made, its language, a summary of its plot and some of its principal actors and actresses.

* If unsuccessful, it will tell the user that there are no results.

* If no movie name is entered after "movie-this," LIRI Bot will return information on the movie "Mr. Nobody."

## Using random.txt to Find Information

* If, rather than type any of the aforementioned things into the command line, the user types "do-what-it-says" instead, LIRI Bot will read text from the random.txt file in its repository and use that to guide its search.

* For example, if the file reads, "spotify-this-song,'I Want It That Way'," "do-what-it-says" will split that text into an array at the comma, then use the first part to decide what kind of search to do.

* In this case, it would search the Spotify API for "I Want It That Way" and return the song of the same name by the Backstreet Boys.

* Alternatively, if random.txt were to contain the text "movie-this,'The Matrix'," LIRI Bot would search the OMDb API and return information on "The Matrix."

## The Structure of LIRI Bot's Code

* LIRI Bot is structured around a function that contains a switch statement.

* This function takes in only one parameter, which is used as the switch statement's expression.

* Based upon the value of this parameter, the switch statement determines which type of search the user wishes to do and executes the appropriate block of code to make that happen.

* In the case of searches that don't use random.txt, it feeds process.argv[2] (the first command entered after "liri.js") into the function to serve as its parameter.

* If random.txt is used, it instead feeds the first value of the array split from that file's text into the function to serve as its parameter. (In the context of the code in liri.js, that would be fileCommands[0].)

* Whenever a new search is initiated, liri.js declares a variable called "term" and sets its value to a string created from all command line commands entered from the fourth on (including "node" and "liri.js").

* This variable's value is later used as a search term in whatever API call ends up happening as a result of the function containing the switch statement.

* Should random.txt be used, the "term" variable's value will be reset to the second value of the array split from that file's text immediately before the function containing the switch statement is called.

* As such, when the user enters the "do-what-it-says" command, the information provided by random.txt will be used in place of any initially taken from the command line.

## Technologies Used

* JavaScript

* Node.js

* Node Spotify API Node package (https://www.npmjs.com/package/node-spotify-api)

* Axios Node package (https://www.npmjs.com/package/axios)

* Moment Node package (https://www.npmjs.com/package/moment)

* dotenv Node package (https://www.npmjs.com/package/dotenv)

## Author

Antonio de las Morenas (planned and wrote all of the code in liri.js)