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

this is a basic movie search app that connects to the Internet Move Database (IMDB).  I recommend this API as easy to use and well-documented. It's also free. 

The unique feature of this app is that it allows people to search for bad movies - thus the name, Hot Flops 

Many times I want a movie that I don't have to pay much attention to. Maybe I'm not feeling well and know I'll just fall asleep anyways. Perhaps I just want some background music, or I'm tired and don't want anything actually has a plot. This app allows you to search those kinds of movies by upending the normal search-by-ratings function. 

In this app, search results from the database are sorted by rati npoorly rated movies are returned first. Stretch goals include the ability to search specifically for straight-to-video releases and to search by actors known for bad moviers, such as Steve Gutenberg or Jon Travolta. 

KNOWN ISSUES: 
- It's ignoring the requirement that the movies have a rating in between 2 and 8.
- it's not working on Heroku - search throws an unknown internal server error. 

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