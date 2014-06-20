# Paaltjesvoetbal

Our game is based on the dutch game called "Paaltjesvoetbal". This is a game you play with a football and cones. Everyone has his own cone and needs to prevent it from collapsing. There can be multiple footballs which players need to use to make other peoples cones collapse while defending their own. In our game every player has a pole which he/she needs to defend with a shield.

## Project

This game has been create by Group 6 of the gaming contextproject on the TU Delft. The game is meant to entertain and distract people who are waiting for something, which can be anything, ranging from the dentist to a movie theatre.

## Tech

Any piece of software is programmed in a language and possibly uses frameworks and/or libraries. Every language or framework has its advantages and disadvantages. This is a game which has to be extremely easy to pick up and play preferably without preparing anything.

We assume that nearly everyone nowadays has a capable smartphone. Because of this we chose to create a browser-based game. Unity etc would prove difficult since you would needs apps etc. The best client-side programming language is done with JavaScript. That is why we chose to use JavaScript. It is suitable for visuals and hosting both so that is great.

### Libs

We looked into JavaScript game engines but it was very difficult to find a lightweight good-physics game engine. Because of this we decided to write a very minimalistic game engine which was suited for explicitly our purposes. This made sure we really understood how the game worked inside out and we're able to make quick changes in the code behind.

The server uses NodeJS and the NodeJS-library Socket.IO. This library will handle all the differences in the implementation of websockets in browsers. When using Socket.IO it is easy to let the server run a function on a certain call from a client. Furthermore it is easy to send and retrieve JSON-data from the server, which can be useful as no conversion is needed for JavaScript to read this data. 

There is a whole bunch of classes we created. We went for a OOP approach since we could structure our code the best way using this. JavaScript has some OOP support but it's quite hard to work with. That is why we used a class from internet named "Base.js". This is a class which we could extend to create a good OOP system; making sure we could inherit.

### Server

The server has 2 types of connections, one to a player and one to a mainscreen. The player only needs the data of positions of balls and other game object which should be drawn on it's own screen, while the mainscreen needs data from all the game-objects and even highscores.

All 3 network objects - Server, Client & Mainscreen - have their own class for handling communication. Sockets.io is a really easy to use framework. On an abstract level you could say that you are actually are calling functions on the other end of the network including sending parameters.

## Test

We use the Mocha framework for this. We create a javascript file with the tests and by opening a certain local webpage the Mocha framework runs these tests and shows the results on the open webpage. See the next example for a fragment of the test webpage.

## Docs

To make the code understandable as well we use a javascript version of JavaDocs named YUIDoc. By following the YUIDoc protocols we are able to automaticly generate documentation for our classes and systems.