# api-justify
API developed in the context of a technical interview, in the span of approx. a week.

RESTful API deployed [here](https://justify-api-vde-guil.herokuapp.com) on heroku and
access to the API doc can be found [here](https://justify-api-vde-guil.herokuapp.com/api-docs)

Make sure that you use a tool like vscode extension 'resful API', 'Postman' or 'insomnia' to communicate with the API.

## Description

This API receives a text in parameter and returns said text [justified](https://en.wikipedia.org/wiki/Typographic_alignment#Justified) with a limit of 80 characters per line.

The route ```api/justify``` is token protected and a limit rate of 80000 words per 24 hours and per user is also set on that route.

You need to create an account via the ```/api/register``` route and sign in via ``` /api/login ``` to receive an authentication token that you need to pass through the header to access the ``` api/justify ``` route.

check the API documentation [here](https://justify-api-vde-guil.herokuapp.com/api-docs) for more details

## Stack

- NodeJS 15
- NPM
- PostgreSQL 13
- [Sqitch 0.9999](http://sqitch.org/download/)
- redis-server 6.2.1

Those tools are necessary for the good execution of the API.

## Installation

Clone the repo locally

```bash
git clone <repo url>
```

then, once in the cloned directory, install the dependencies

```bash
npm i
```

Finally create a postgresql database and deploy the Sqitch project on it

```bash
createdb verify
sqitch deploy db:pg:verify
```

Please configure PostgreSQL (or provide the necessary environment variables) so that the `createdb` and `sqitch` command can execute properly.

make sure to create and a .env file and filling it accordingly based on the .env.example file provided.

### Launch

```bash
npm start
```