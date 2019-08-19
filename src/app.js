const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express Config

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views lication
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Abhishek"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me ",
    name: "Abhishek"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    messege: "This is some helpful text.",
    name: "Abhishek"
  });
});
//Sending HTML
app.get("/", (req, res) => {
  res.send("<h1>Weather</h1>");
});

//Sending JSON
// app.get("/help", (req, res) => {
//   res.send(
//     {
//       name: "Andrew"
//     },
//     {
//       name: "Sarah"
//     }
//   );
// });

//Sendign HTML
// app.get("/about", (req, res) => {
//   res.send("<h1>Everything About the page here</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  // address: req.query.address
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: "There has been error in the geocode block" });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: "There has been error in forecast block"
          });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Abhishek",
    errorMessage: "Help Article  Not Found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Abhishek",
    errorMessage: "Page Not Found"
  });
});
//app.com
//app.com/help
//app.com/about

app.listen(8000, () => {
  console.log("Sever is running on port 8000");
});
