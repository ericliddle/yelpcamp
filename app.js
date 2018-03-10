const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) =>{
  res.render("landing");
});

let campgrounds = [
  {name: "Salmon Creek", image:"http://www.mbpost.com/images/original/271559.jpg"},
  {name: "Crystal Lake", image:"http://www.davessierrafishing.com/photos300/crystal_lake2.jpg"},
  {name: "Narin Falls", image:"https://scontent-ort2-1.cdninstagram.com/vp/31a5cc819e88d001d8be8a59ce2c6851/5B3ED071/t51.2885-15/e35/28435082_211679469604582_1009801280064847872_n.jpg"},
  {name: "Coachwood Camping", image:"http://www.findacamp.com.au/pictures/large_522.JPG"}
];

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
  let campName = req.body.name;
  let campImage = req.body.image;
  let newCampground = {name: campName, image: campImage};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("newcampground")
});

app.listen(3000, () => {
  console.log("YelpCamp server: Listening on port 3000.");
});