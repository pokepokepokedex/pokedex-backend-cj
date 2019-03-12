# PokePokePokedex! API 

## Table of Conents
----
# Overview

This repository holds all back-end files and resources for PokePokePokedex application and its readme documentation

## Deployed

https://pokepokepokedex.herokuapp.com

## DATA SET 

*Found in:* https://www.kaggle.com/rounakbanik/pokemon


## SCHEMA

`users`
```
{
  "id": 1,                            // Integer [Primary key]
  "username": "admin",                // String [Required, Unique]
  "password": "password",             // String [Required]
  "email": "admin@administrator.com"  // String [Required, Unique]
}
```

`pokemon`
```
{
  "id": 1,                                      // Integer
  "name": "Bulbasaur",                          // Text
  "pokedex_number": 1,                          // Integer
  "type1": "grass",                             // Text
  "type2": "poison",                            // Text
  "height_m": 0.7,                              // Numeric(3, 1)
  "weight_kg": 6.9,                             // Numeric(4, 1)
  "abilities": "['Overgrow', 'Chlorophyll']",   // Text
  "base_happiness": 70,                         // Integer
  "hp": 45,                                     // Integer
  "attack": 49,                                 // Integer
  "defense": 49,                                // Integer
  "sp_attack": 65,                              // Integer
  "sp_defense": 65,                             // Integer
  "speed": 45,                                  // Integer
  "generation": 1,                              // Integer
  "capture_rate": "45"                          // Text
}
```

## Pagination

```
navigate at the end of url by: ?page=2

{
  "total": 1,
  "last_page": 1, 
  "per_page": 15,
  "current_page": 1,
  "from": 0,
  "to": 1,
  "data": []
}
```
## Test Accounts

```

  username: 'admin',
  password: 'password'


  username: 'beniscool',
  password: 'password'


  username: 'ceciljohn',
  password: 'password'

```

## API ENDPOINTS

| name | method | endpoint | description|
| ---- | ------ | -------- | ----------- |
| Register | POST | /auth/register| Creates a new `user` to the users table in the database |
|Login|POST|/auth/login|Checks whether payload from the `body` matches with a user in the database. On Succesful login, returns a message and a `JWT Token`|
|Get all users|GET|/api/users| `PROTECTED ROUTE` - Returns an array of user objects of all users|
|Get user by ID|GET|/api/users/:id| `PROTECTED ROUTE` - Returns an array of object of selected user by ID|
|Delete user by ID|DELETE|/api/users/:id| delete selected user by ID|
|Update user by ID|PUT|/api/users/:id| updates selected user property by ID using payload sent to the body|
|Get all pokemon|GET|/api/pokemon| `PROTECTED ROUTE` - Returns an array of pokemon objects of all pokemon|
|Get pokemon by ID|GET|/api/pokemon/:id| `PROTECTED ROUTE` - Returns an array of pokemon objects of selected pokemon by ID|
----

# AUTH ROUTES

## **REGISTER**
### **Registers a user**

*Method Url:* `/auth/register`


*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | Must be unique           |
| `email`        | String | Yes      | Must be unique           |
| `password`     | String | Yes      |                          |

*example:*

```
{
  username: "ceciljohn",
  password: "password",
  email: "cj@email.com"
}
```

#### Response

##### 200 (OK)
>If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{ 
  "message" : "You have registered, ceciljohn!"
}
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

____

## **LOGIN**
### **Logs a user in**

*Method Url:* `/auth/login`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`        | String | Yes      | Must match a username in the database |
| `password`     | String | Yes      | Must match a password in the database corresponding to above email |

*example:*

```
{
  username: "ceciljohn",
  password: "password"
}
```

#### Response

##### 200 (OK)
>If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "message": "Welcome ceciljohn!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE",
  "message": "Welcome ceciljohn!"
}
```
##### 400 (Bad Request)
>If you send in invalid fields or the passwords do not match, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 404 (Not Found)
>If you send in an email address that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

# USER ROUTES

## **GET ALL USERS**
### Returns all users

*Mehod Url:* `/api/users`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)
>If you successfully get al the users, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  {
    "total": 3,
    "last_page": 1,
    "per_page": 15,
    "current_page": 1,
    "from": 0,
    "to": 3,
    "data": [
      {
        "id": 1,
        "username": "admin",
        "email": "admin@administrator.com"
      },
      {
        "id": 2,
        "username": "beniscool",
        "email": "beniscool@administrator.com"
      },
      {
        "id": 3,
        "username": "ceciljohn",
        "email": "ceciljohn@administrator.com"
      }
    ]
  }
}
```


##### 400 (Bad Request)
>If you send in invalid fields or the password of the user corresponding to the token does not match the currentPassword field, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---

## **GET USER BY ID**
### Returns selected user by ID

*Mehod Url:* `/api/users/:id`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `id`| Int    | Yes      | Id of specific user |


#### Response

##### 200 (OK)
>If you successfully get al the users, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "id": 1,
  "username": "admin",
  "email": "admin@administrator.com"
}
```

##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---

# POKEMON ROUTES

## **GET ALL POKEMON**
### Returns all pokemon

*Mehod Url:* `/api/pokemon`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Response

##### 200 (OK)
>If you successfully get all the pokemon with pagination, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "total": 801,
  "last_page": 54,
  "per_page": 15,
  "current_page": 1,
  "from": 0,
  "to": 15,
  "data": [
    {
      "id": 1,
      "name": "Bulbasaur",
      "pokedex_number": 1,
      "type1": "grass",
      "type2": "poison",
      "height_m": 0.7,
      "weight_kg": 6.9,
      "abilities": "['Overgrow', 'Chlorophyll']",
      "base_happiness": 70,
      "hp": 45,
      "attack": 49,
      "defense": 49,
      "sp_attack": 65,
      "sp_defense": 65,
      "speed": 45,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 2,
      "name": "Ivysaur",
      "pokedex_number": 2,
      "type1": "grass",
      "type2": "poison",
      "height_m": 1,
      "weight_kg": 13,
      "abilities": "['Overgrow', 'Chlorophyll']",
      "base_happiness": 70,
      "hp": 60,
      "attack": 62,
      "defense": 63,
      "sp_attack": 80,
      "sp_defense": 80,
      "speed": 60,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 3,
      "name": "Venusaur",
      "pokedex_number": 3,
      "type1": "grass",
      "type2": "poison",
      "height_m": 2,
      "weight_kg": 100,
      "abilities": "['Overgrow', 'Chlorophyll']",
      "base_happiness": 70,
      "hp": 80,
      "attack": 100,
      "defense": 123,
      "sp_attack": 122,
      "sp_defense": 120,
      "speed": 80,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 4,
      "name": "Charmander",
      "pokedex_number": 4,
      "type1": "fire",
      "type2": null,
      "height_m": 0.6,
      "weight_kg": 8.5,
      "abilities": "['Blaze', 'Solar Power']",
      "base_happiness": 70,
      "hp": 39,
      "attack": 52,
      "defense": 43,
      "sp_attack": 60,
      "sp_defense": 50,
      "speed": 65,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 5,
      "name": "Charmeleon",
      "pokedex_number": 5,
      "type1": "fire",
      "type2": null,
      "height_m": 1.1,
      "weight_kg": 19,
      "abilities": "['Blaze', 'Solar Power']",
      "base_happiness": 70,
      "hp": 58,
      "attack": 64,
      "defense": 58,
      "sp_attack": 80,
      "sp_defense": 65,
      "speed": 80,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 6,
      "name": "Charizard",
      "pokedex_number": 6,
      "type1": "fire",
      "type2": "flying",
      "height_m": 1.7,
      "weight_kg": 90.5,
      "abilities": "['Blaze', 'Solar Power']",
      "base_happiness": 70,
      "hp": 78,
      "attack": 104,
      "defense": 78,
      "sp_attack": 159,
      "sp_defense": 115,
      "speed": 100,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 7,
      "name": "Squirtle",
      "pokedex_number": 7,
      "type1": "water",
      "type2": null,
      "height_m": 0.5,
      "weight_kg": 9,
      "abilities": "['Torrent', 'Rain Dish']",
      "base_happiness": 70,
      "hp": 44,
      "attack": 48,
      "defense": 65,
      "sp_attack": 50,
      "sp_defense": 64,
      "speed": 43,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 8,
      "name": "Wartortle",
      "pokedex_number": 8,
      "type1": "water",
      "type2": null,
      "height_m": 1,
      "weight_kg": 22.5,
      "abilities": "['Torrent', 'Rain Dish']",
      "base_happiness": 70,
      "hp": 59,
      "attack": 63,
      "defense": 80,
      "sp_attack": 65,
      "sp_defense": 80,
      "speed": 58,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 9,
      "name": "Blastoise",
      "pokedex_number": 9,
      "type1": "water",
      "type2": null,
      "height_m": 1.6,
      "weight_kg": 85.5,
      "abilities": "['Torrent', 'Rain Dish']",
      "base_happiness": 70,
      "hp": 79,
      "attack": 103,
      "defense": 120,
      "sp_attack": 135,
      "sp_defense": 115,
      "speed": 78,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 10,
      "name": "Caterpie",
      "pokedex_number": 10,
      "type1": "bug",
      "type2": null,
      "height_m": 0.3,
      "weight_kg": 2.9,
      "abilities": "['Shield Dust', 'Run Away']",
      "base_happiness": 70,
      "hp": 45,
      "attack": 30,
      "defense": 35,
      "sp_attack": 20,
      "sp_defense": 20,
      "speed": 45,
      "generation": 1,
      "capture_rate": "255"
    },
    {
      "id": 11,
      "name": "Metapod",
      "pokedex_number": 11,
      "type1": "bug",
      "type2": null,
      "height_m": 0.7,
      "weight_kg": 9.9,
      "abilities": "['Shed Skin']",
      "base_happiness": 70,
      "hp": 50,
      "attack": 20,
      "defense": 55,
      "sp_attack": 25,
      "sp_defense": 25,
      "speed": 30,
      "generation": 1,
      "capture_rate": "120"
    },
    {
      "id": 12,
      "name": "Butterfree",
      "pokedex_number": 12,
      "type1": "bug",
      "type2": "flying",
      "height_m": 1.1,
      "weight_kg": 32,
      "abilities": "['Compoundeyes', 'Tinted Lens']",
      "base_happiness": 70,
      "hp": 60,
      "attack": 45,
      "defense": 50,
      "sp_attack": 90,
      "sp_defense": 80,
      "speed": 70,
      "generation": 1,
      "capture_rate": "45"
    },
    {
      "id": 13,
      "name": "Weedle",
      "pokedex_number": 13,
      "type1": "bug",
      "type2": "poison",
      "height_m": 0.3,
      "weight_kg": 3.2,
      "abilities": "['Shield Dust', 'Run Away']",
      "base_happiness": 70,
      "hp": 40,
      "attack": 35,
      "defense": 30,
      "sp_attack": 20,
      "sp_defense": 20,
      "speed": 50,
      "generation": 1,
      "capture_rate": "255"
    },
    {
      "id": 14,
      "name": "Kakuna",
      "pokedex_number": 14,
      "type1": "bug",
      "type2": "poison",
      "height_m": 0.6,
      "weight_kg": 10,
      "abilities": "['Shed Skin']",
      "base_happiness": 70,
      "hp": 45,
      "attack": 25,
      "defense": 50,
      "sp_attack": 25,
      "sp_defense": 25,
      "speed": 35,
      "generation": 1,
      "capture_rate": "120"
    },
    {
      "id": 15,
      "name": "Beedrill",
      "pokedex_number": 15,
      "type1": "bug",
      "type2": "poison",
      "height_m": 1,
      "weight_kg": 29.5,
      "abilities": "['Swarm', 'Sniper']",
      "base_happiness": 70,
      "hp": 65,
      "attack": 150,
      "defense": 40,
      "sp_attack": 15,
      "sp_defense": 80,
      "speed": 145,
      "generation": 1,
      "capture_rate": "45"
    }
  ]
}
```

##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---

## **GET POKEMON BY ID**
### Returns selected pokemon by ID

*Mehod Url:* `/api/pokemon/:id`
*HTTP method:* **[GET]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `id`| Int    | Yes      | Id of specific pokemon |


#### Response

##### 200 (OK)
>If you successfully get the selected pokemon, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "id": 151,
  "name": "Mew",
  "pokedex_number": 151,
  "type1": "psychic",
  "type2": null,
  "height_m": 0.4,
  "weight_kg": 4,
  "abilities": "['Synchronize']",
  "base_happiness": 100,
  "hp": 100,
  "attack": 100,
  "defense": 100,
  "sp_attack": 100,
  "sp_defense": 100,
  "speed": 100,
  "generation": 1,
  "capture_rate": "45"
}
```

##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---


<!-- 
## **GET TOPICS**
### Gets an array of quiz topics

*Method Url:* `/api/quizzes/topics`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Response 

##### 200 (OK)

```
[
  {
    "id": 2,
    "name": "JavaScript"
  }
]
```

---
## **ADD NEW QUIZ**
### Adds a new quiz

*Method Url:* `/api/quizzes`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | Yes       |  |
| `topic`  | String | Yes       | Can be an existing or new topic |

*example:*
```
{
  title: "Array Methods",
  topic: "JavaScript"
}
```
#### Response 

##### 200 (OK)
>If you successfully create a new quiz the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
  12
]
```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---
## **EDIT SPECIFIC QUIZ**
### Edits one or more details of a specific quiz created by the current user.

*Method Url:* `/api/quizzes/:quizId/edit`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | No       | New title of the quiz |
| `topic`  | String | No       | Can be a new or existing topic |



*Example:*

```
{
  "title": "Object Methods",
  "topic": "JavaScript II"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated quiz quiz.

```
[
  12
]
  ```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, or you do not send in a token that matches the author of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
## **UPDATE QUIZ AND USER RELATIONSHIP**
### Edits the user specific information for a quiz, allowng users to favorite, vote for, and score.

*Method Url:* `/api/quizzes/:quizId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `vote`  | Int | No  | Default: 0. Must be -1, 0, 1 |
| `favorite` | Boolean | No   | Default: false.  |
| `score` | Int | No   | Default: 0. Cannot be larger than the amount of questions for the specified quiz.  |


*Example:*

```
{
  "vote": -1,
  "favorite": "true",
  "score": 3
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated quiz user relationship.

```
[
  8
]
  ```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
_____
## **DELETE QUIZ**
### Deletes quiz with specific id.

*Method Url:* `/api/quizzes/:quizId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the deleted quiz user relationship.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

# QUESTION ROUTES

## **GET QUESTIONS**
### Gets all the questions in a quiz

*Method Url:* `/api/quizzes/:quizId/questions`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Response 

##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and array of questions that have a quiz_id that matches the quizId passed in.

```
[
  {
    "id": 12,
    "question": "Here's a sample question 2",
    "options": [
      "sample option",
      "another 1",
      "This one is the answer shh don't tell",
      "yayyy"
    ]
  }
]
```

##### 404 (Not Found)
>If you pass in a quizId that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **GET SPECIFIC QUESTION**
### Gets a question by its ID.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |

#### Response 
##### 200 (OK)

>If the request if successful, the server will return an HTTP response with a status code `200` and the quiz object that matches the questionId and corresponding quizId passed in.

```
{
  "id": 12345,
  "question": "Here's a sample question 2",
  "options": [
    "sample option",
    "another 1",
    "This one is the answer shh don't tell",
    "yayyy"
  ],
  "quiz_id": 1
}
```

##### 404 (Not Found)
>If you pass in a quizId that does not match a quiz in the database, or a questionId that does not match a question associated with the passed in quizId, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **GET SPECIFIC QUESTION ANSWER**
### Gets a response of whether the passed in option to a specific question by its ID is correct or not.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId/response`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |
| `option` | Int | Yes       | Query parameter that matches an option # field on the specified question |

#### Response 
##### 200 (OK)

>If the request if successful, the server will return an HTTP response with a status code `200` and the question id and boolean reflecting whether the option was correct or not.

```
{
    "question": 3,
    "correct": false
}
```

##### 400 (Bad Request)
>If you do not send in a required field, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 404 (Not Found)
>If you pass in a quizId that does not match a quiz in the database, or a questionId that does not match a question associated with the passed in quizId, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **ADD NEW QUESTION**
### Adds a new question

*Method Url:* `/api/quizzes/:quizId/questions`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `question`| String | Yes     | title of the question |
| `option1`| String | Yes     |  |
| `option2`| String | Yes     |  |
| `option3`| String | No     |  |
| `option4`| String | No    |  |
| `answer`  | Int | Yes      | Must be an integer that corresponds to an existing option number.  |

*Example:*

```
{
	"question": "Here's a sample question 2",
	"option1": "sample option",
	"option2": "another 1",
	"option3": "This one is the answer shh don't tell",	
	"option4": "yayyy",
	"answer": 3
}
```

#### Response 
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the new question as below.
```
[
  5
] 
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **EDIT A QUESTION**
### Edits a question of the specified id

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |


#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `question`| String | No     | title of the question |
| `option1`| String | No     |  |
| `option2`| String | No     |  |
| `option3`| String | No     |  |
| `option4`| String | No    |  |
| `answer`  | Int | No      | Must be an integer that corresponds to an existing option number.  |

*Example:*

```
{
	"question": "Here's a sample question 2",
	"option1": "sample option",
	"option2": "another 1",
	"option3": "This one is the answer shh don't tell",	
	"option4": "yayyy",
	"answer": 4
}
```

#### Response 
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the edited question.
```
[
  5
] 
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId or questionId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **DELETE QUESTION**
### Deletes question with specific id.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the deleted question.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the questionId or quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

# POST ROUTES

## **GET ALL POSTS**
### Gets an array of post objects

*Method Url:* `/api/posts`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |


#### Response 

##### 200 (OK)

```
[
  {
    "id": 1,
    "title": "JavaScript n Things",
    "body": "Here's lots of stuff about JavaScript. So much about JavaScript. So many JavaScript things. All things JavaScript.",
    "created_at": "2018-12-11T04:47:28.998Z",
    "author": "dinolaur"
  }
]
```

___

## **GET ONE POST**
### Gets a post with the specified id

*Method Url:* `/api/posts/:postId`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |


#### Response 

##### 200 (OK)

>If you send a valid post id, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 1,
  "title": "JavaScript n Things",
  "body": "Here's lots of stuff about JavaScript. So much about JavaScript. So many JavaScript things. All things JavaScript.",
  "author": {
    "id": 10,
    "username": "dinolaur",
    "img_url": "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg"
  },
  "created_at": "2018-12-11T04:47:28.998Z"
}
```

##### 404 (Not Found)
>If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
---
## **ADD NEW POST**
### Adds a new posts

*Method Url:* `/api/posts`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | Yes       | |
| `body`  | String | Yes       |  |

*example:*
```
{
  title: "JavaScript n Things",
  body: "Here's lots of stuff about JavaScript. So much about JavaScript. So many JavaScript things. All things JavaScript."
}
```
#### Response 

##### 200 (OK)
>If you successfully create a new post the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
  12
]
```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---
## **EDIT SPECIFIC POST**
### Edits one or more details of a specific post created by the current user.

*Method Url:* `/api/posts/:postId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | No       | New title of the post |
| `body`  | String | No       | New body of post |



*Example:*

```
{
  "title": "JavaScript n Stuff",
  "body": "Some different things about JavaScript instead"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated post quiz.

```
[
  1
]
  ```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, or you do not send in a token that matches the author of the post, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **DELETE POST**
### Deletes quiz with specific id.

*Method Url:* `/api/posts/:postId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the post.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the post, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
# COMMENT ROUTES

## **GET COMMENTS**
### Gets all the questions in a comments

*Method Url:* `/api/posts/:postId/comments`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |


#### Response 

##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and array of comments that have a post_id that matches the postId passed in.

```
[
  {
    "id": 4,
    "text": "sup family!",
    "author": "dinolaur",
    "post_id": 2,
    "created_at": "2018-12-13T03:24:27.215Z"
  }
]
```

##### 404 (Not Found)
>If you pass in a postId that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **GET SPECIFIC COMMENT**
### Gets a comment by its ID.

*Method Url:* `/api/posts/:postId/comments/:commentId`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |
| `commentId`| Int    | Yes      | Id of specific comment |

#### Response 
##### 200 (OK)

>If the request if successful, the server will return an HTTP response with a status code `200` and the comment object that matches the commentId and corresponding postId passed in.

```
{
  "id": 4,
  "text": "sup family!",
  "author": {
    "id": 6,
    "username": "dinolaur",
    "img_url": null
  },
  "post_id": 2,
  "created_at": "2018-12-13T03:24:27.215Z"
}
```

##### 404 (Not Found)
>If you pass in a postId that does not match a post in the database, or a commentId that does not match a comment associated with the passed in postId, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **ADD NEW COMMENT**
### Adds a new comment

*Method Url:* `/api/posts/:postId/comments`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `post`| Int    | Yes      | Id of specific quiz |


#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `text`| String | Yes     | text body of comment |


*Example:*

```
{
	text: "Sup family!"
}
```

#### Response 
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the new question as below.
```
[
  5
] 
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
## **EDIT SPECIFIC COMMENT**
### Edits text of a specific commentcreated by the current user.

*Method Url:* `/api/posts/:postId/comments/:commentId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific quiz |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `text`  | String | Yes       | New text of comment |



*Example:*

```
{
  title: "Hellurrr"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated quiz quiz.

```
[
  12
]
  ```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId or commentId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
## **DELETE COMMENT**
### Deletes comment with specific commentId.

*Method Url:* `/api/posts/:postId/comments/:commentId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |
| `commentId`| Int    | Yes      | Id of specific comment |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the deleted question.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the comment, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the commentId or postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
} -->
