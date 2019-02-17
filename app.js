var schedule = require('node-schedule');
const request = require('request');


const SERVER_URL = process.env["SERVER_URL"];

const API_VERSION = "v1";

// Every minute...
schedule.scheduleJob('*/5 * * * * *', function () {
  // Get all the services from the API.
  request(SERVER_URL + API_VERSION + "/api/services/", {json: true}, (err, res, body) => {
    if (err) {
      return console.error(err);
    } else {
      // For each service to be monitored...
      for (var i = 0; i < body.length; i++) {
        let service = body[i]
        // Make a request to the service.
        request(service.serviceURL, (err, res, body) => {
          if (err) {
            console.error(err.toLocaleString())
            status = "DOWN"
          } else {
            status = "OK"
          }

          // If the status has changed...
          if (status !== service.status) {
            //Update the status.
            service.status = status
            request({
              url: service.url,
              method: 'PUT',
              json: service
            }, function(error, response, body){
              console.log(body);
            });
          }
        })
      }
    }
  });

});