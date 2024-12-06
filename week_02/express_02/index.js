const express = require("express");
const { check, validationResult } = require("express-validator");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));

// //setting ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const urlMap = new Map();
app.get("/", (req, res) => {
  res.render("index", { urlMap });
});

app.post("/shorten", [check("url", "Not a valid link").isURL()], (req, res) => {
  const getUrl = req.body.url;
  const errors = validationResult(req);
  //check for errors
  if (!errors.isEmpty()) return res.send(errors.errors[0].msg);

  //creation of shortened url
  const shortened = Math.random().toString(36).slice(3, 9);
  const shortenedURL = `${shortened}.ly`;

  //adding the shortened and actual url to the the map
  urlMap.set(shortenedURL, getUrl);

  res.redirect("/");
});

app.get("/:shortCode", (req, res) => {
  const { shortCode } = req.params;

  if (urlMap.has(shortCode)) {
    // Redirect to the original URL
    res.redirect(urlMap.get(shortCode));
  } else {
    // Handle case where the shortened URL doesn't exist
    res.status(404).send("Shortened URL not found.");
  }
});

//starting server
let PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
