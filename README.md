# Games API
An API develop for practicing concepts of REST API. It's a game API, which we can register, read, update and delete games from database.

## This API was developed in:
 - Javascript
 - Nodejs
 - JWT
 - Express
 - MongoDB
 - Mongoose
 
 ## User Endpoints
 ### `POST` /register
 > Register a new user in database
 > 
 > Parameters: None
 > 
 > Authorization: None
 
 #### Body
 ```json
 {
  "nickname": "pedro",
  "email":"pedro@example.com",
  "password": "password"
 }
 ```
 #### Response
 ```json
 status 201 CREATED
 {
  "user": {
   "nickname": "pedro",
   "email": "pedro@example.com",
   "_id": "62b3463e206b9ca05057cdff",
   "__v": 0
  },
  "message": "Usuário criado"
 }
 ```
 ```json
 status 400 Bad Request
 {
  "error": "User already exists OR error in data body"
 }
 ```
 ### `POST` /auth
 > Authenticate user in API
 > 
 > Parameters: None
 > 
 > Authorization: None
 
 #### Body
 ```json
 {
  "nickname": "pedro",
  "password": "password"
 }
 ```
 #### Response
 ```json
 status 200 OK
 {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cC...",
  "user": {
   "_id": "62a2959b040d026feedf4807",
   "nickname": "pedro",
   "email": "pedro@example.com",
   "__v": 0
  }
 }
 ```
 ```json
 status 400 Bad Request
 {
  "error": "error in data body"
 }
 ```
 
 ```
 ```json
 status 404 Not Found
 {
  "error": "User not found OR incorrect password"
 }
 ```
 #
 ## Game Endpoints
 ### `POST` /game
 > Register a game in database
 > 
 > Parameters: None
 > 
 > Authorization: Yes
 
 #### Headers
 > access-token: "JWT token"
 #### Body
 ```json
  {
   "name": "God of War",
   "price": 90,
   "year": 2018
  }
 ```
 #### Response
 ```json
 status 201 CREATED
  {
   "_id": "629d4d633ed767f59edf4c82",
   "name": "God of War",
   "year": 2018,
   "price": 90,
   "__v": 0
  }
 ```
 ```json
 status 400 Bad request
 {
  "error": "Error in body data OR game already exists"
 }
 ```
 ```json
 status 401 Unauthorized
 {
  "error": "invalid token OR restricted access"
 }
 ```
 
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
  "error": "invalid token OR restricted access"
 }
 ```
 
 ### `GET` /game/:id
 > Return a specific game by ID
 > 
 > Parameters: Yes
 > 
 > Authorization: Yes
 
 #### Headers
 > access-token: "JWT token"
 #### Response
 ```json
 status 200 OK
  {
   "_id": "629d4d633ed767f59edf4c82",
   "name": "FIFA 22",
   "year": 2021,
   "price": 85,
   "__v": 0
  }
 ```
 ```json
 status 401 Unauthorized
 {
  "error": "invalid token OR restricted access"
 }
 ```
 ```json
 status 404 Not Found
 {
  "error": "Game not found"
 }
 ```
 
 ### `PUT` /game/:id
 > Update a specific game by ID
 > 
 > Parameters: Yes
 > 
 > Authorization: Yes
 
 #### Headers
 > access-token: "JWT token"
 #### Response
 ```json
 status 200 OK
 {
  "_id": "629e95b6e65d912a7be6a932",
  "name": "PES 2020",
  "year": 2022,
  "price": 0,
  "__v": 0
 }
 ```
 ```json
 status 400 Bad Request
 {
  "error": "ID parameter is required OR error in data body"
 }
 ```
 ```json
 status 401 Unauthorized
 {
  "error": "invalid token OR restricted access"
 }
 ```
 ```json
 status 404 Not Found
 {
  "error": "Game not found"
 }
 ```
### `DELETE` /game/:id
 > Delete a specific game by ID
 > 
 > Parameters: Yes
 > 
 > Authorization: Yes
 
 #### Headers
 > access-token: "JWT token"
 #### Body
 ```json
  {
   "name": "God of War",
   "price": 90,
   "year": 2018
  }
 ```
 #### Response
 ```json
 status 200 OK
 {
  "data": {
   "_id": "629e95b6e65d912a7be6a932",
   "name": "PES 2020",
   "year": 2022,
   "price": 0,
   "__v": 0
  },
  "message": "Game removido"
 }
 ```
 ```json
 status 400 Bad Request
 {
  "error": "ID parameter is required"
 }
 ```
 ```json
 status 401 Unauthorized
 {
  "error": "invalid token OR restricted access"
 }
 ```
 ```json
 status 404 Not Found
 {
  "error": "Game not found"
 }
 ```
 ## Installation
 ```shell
 npm install
 ```
 ## Running
 ```shell
 npm run dev
 ```
