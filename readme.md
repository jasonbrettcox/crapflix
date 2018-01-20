TRELLO BOARD / USER STORIES : https://trello.com/b/hmUfFdFE/flops

GITHUB REPO: https://github.com/jasonbrettcox/shitflix

App deployed on Heroku: https://peaceful-escarpment-87562.herokuapp.com/


WIREFRAME IMAGES:
https://github.com/jasonbrettcox/crapflix/blob/master/splash.jpg
https://github.com/jasonbrettcox/crapflix/blob/master/login-new-acct.jpg
https://github.com/jasonbrettcox/crapflix/blob/master/createnew.jpg
https://github.com/jasonbrettcox/crapflix/blob/master/ohcrap.jpg
https://github.com/jasonbrettcox/crapflix/blob/master/searchby.jpg
https://github.com/jasonbrettcox/crapflix/blob/master/results.jpg

OVERVIEW:

Flops is a basic movie search app that connects to the The Movie Database (TMDB).  
The unique feature of this app is that it allows people to search for bad movies - thus the name, Hot Flops 

Many times I want a movie that I don't have to pay much attention to. Maybe I'm not feeling well and know I'll just fall asleep anyways. Perhaps I just want some background music, or I'm tired and don't want anything actually has a plot. This app allows you to search those kinds of movies by upending the normal search-by-ratings function. 

In this app, search results from the database are sorted by rating. Poorly rated movies are returned first. Users can save movies to a list for future viewing and delete those movies once watched. Or maybe not watched, if they are just too bad. 

APPROACH:
My main approach was to keep it simple and start with basics. I also wanted to work mor eon the back end stuff as it is easy for me to spend all of my time on front-end polishing. I tackled the Passport issue first as it was presented as the hardest piece.  From there I did very simple bootstrap stuff and got it up on Heroku. 

STRETCH GOALS:
Stretch goals include the ability to search specifically for straight-to-video releases and to search by actors known for bad moviers, such as Steve Gutenberg or Jon Travolta. 


KNOWN ISSUES: 
- It's ignoring the requirement that the movies have a rating in between 2 and 8. I believe there is an issue with the API having a limit to the number of query parameters allowed on a search. It's returning bad moviues but not as bad as I would like. 


TECHNOLOGIES USED:

FRONT END:
Bootstrap
JQuery and JS



BACK END:
Node
Express
EJS
Passport
Mongo/Mongoose
MongoDB
Heroku
