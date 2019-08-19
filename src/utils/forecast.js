const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/6d0815ed5d56781f49a59128519f4714/" +
    latitude +
    "," +
    longitude;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services !", undefined);
    } else if (body.error) {
      callback("Unable to find the location ", undefined);
    } else {
      callback(
        undefined,
        "The chances for rain are : " + body.currently.precipProbability
      );
    }
  });
};

module.exports = forecast;
