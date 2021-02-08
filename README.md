# nss-board-and-hoard

The purpose of this application is to allow its users the ability to search for board games based off their preferred filter(s) and add them to their library (hoard). When viewing the libary (hoard) page, the user will have sorting and filtering tools available to them that allow them to manipulate the games that they see.

## External API (Board Game Atlas) - KEY REQUIRED
Board game information is pulled from the [BoardGameAtlas API](https://www.boardgameatlas.com/api/docs). 
In order for this application to function, you will need to retrieve your own key from Board Game Atlas for free by following [these steps](https://www.boardgameatlas.com/api/docs/apps)
Once you have your own key, navigate to the src file and create a file called key.js. Inside of that file add this code but put your key in where the placeholder is:

```javascript
const BGAKey = "YourKeyHere";
export default BGAKey;
```

Once you have saved that, the program will be able to use the key to make fetch calls and retrieve game information from Board Game Atlas.

## Node Version 6.14.8

Node JS is required for this application

[Download link for Node JS](https://nodejs.org/en/download/)

## JSON Server

This program requires JSON Server to run.

If you need this, please run the following code:

**npm install -g json-server** at the root level of board-and-hoard

## Basic Instructions

1. CD into the api folder of board-and-hoard and run the following code: "json-server -p 8088 -w info.json"
2. With JSON server running, open another terminal window navigate to the root folder for the project and "npm start"
3. A browser window will open up at the Login Page of the application. Unless you already have login credentials, register a new user. Note, there is no password to log into the       application, this is due to the requirements of the project from NSS
4. Basic page information:
    - **SearchPage**: Allows use of input filters to look for relevant games. You can get more info by clicking the details button and add the game to your library (hoard) by clicking on the hoard button for any particular board game card.
    - **HoardPage**: Saved board games will appear here. There are also filters here that can be used to narrow down which game you are looking for. These work in the same way that the SearchPage filters work but categories and mechanics will only include what is currently saved to your library instead of all of them.