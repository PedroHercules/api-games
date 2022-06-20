# Games API
An API develop for practicing concepts of REST API. It's a game API, which we can register, read, update and delete games from database.

## This API was developed in:
 - Javascript
 - Nodejs
 - JWT
 - Express
 - MongoDB
 - Mongoose
 
 ## Endpoints
 <span style="color: blue;"> Games </span>
 ### `GET` /games
 > Return all games in database
 > 
 > Parameters: None
 > 
 > Authorization: Yes
 
 #### Headers
 > access-token: "JWT token"
 #### Response
 ```json
 status 200 OK
  [
   {
    "_id": "629d4d633ed767f59edf4c82",
    "name": "FIFA 22",
    "year": 2021,
    "price": 85,
    "__v": 0
   },
   {
    "_id": "629e9109b8bd0087ed2e50fd",
    "name": "Skyrim",
    "year": 2011,
    "price": 50,
    "__v": 0
   },
  ]
 ```
 ```json
 status 401 Unauthorized
 {
  "error": "token inválido OR acesso restrito"
 }
 ```
