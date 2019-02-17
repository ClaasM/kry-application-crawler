# KRY Application - Crawler

This is the crawler that `GET`s the service URLs from the API, tests them, and if their status changed sends a `PUT` request back to the API.

### Prerequisites
* Install [Node.js](http://nodejs.org)
* Install dependencies: `npm install`

### How to run:

* Set the `SERVER_URL` environment variable to point to the API, e.g. `http://localhost:8080/`
* run `node app.js`