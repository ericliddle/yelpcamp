const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/yelpcamp");

//Schema:
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Harrison Hot Springs",
//   image: "http://www.news1130.com/wp-content/blogs.dir/sites/9/2017/07/03/harrison-fire-e1499104828226.jpg"
// }, (err, newcamp) => {
//   if(err){
//     console.log("Campground not created.")
//     console.log(err)
//   } else {
//     console.log("Campground created.")
//     console.log(newcamp)
//   }
// });


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

// let campgrounds = [
//   { name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg" },
//   { name: "Crystal Lake", image: "http://www.davessierrafishing.com/photos300/crystal_lake2.jpg" },
//   { name: "Narin Falls", image: "https://scontent-ort2-1.cdninstagram.com/vp/31a5cc819e88d001d8be8a59ce2c6851/5B3ED071/t51.2885-15/e35/28435082_211679469604582_1009801280064847872_n.jpg" },
//   { name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg" },
//   { name: "Crystal Lake", image: "http://www.davessierrafishing.com/photos300/crystal_lake2.jpg" },
//   { name: "Narin Falls", image: "https://scontent-ort2-1.cdninstagram.com/vp/31a5cc819e88d001d8be8a59ce2c6851/5B3ED071/t51.2885-15/e35/28435082_211679469604582_1009801280064847872_n.jpg" },
//   { name: "Salmon Creek", image: "http://www.mbpost.com/images/original/271559.jpg" },
//   { name: "Crystal Lake", image: "http://www.davessierrafishing.com/photos300/crystal_lake2.jpg" },
//   { name: "Narin Falls", image: "https://scontent-ort2-1.cdninstagram.com/vp/31a5cc819e88d001d8be8a59ce2c6851/5B3ED071/t51.2885-15/e35/28435082_211679469604582_1009801280064847872_n.jpg" },
//   { name: "Coachwood Camping", image: "http://www.findacamp.com.au/pictures/large_522.JPG" }
// ];


// Originally this just found the campgrounds in the array above.
// Now campgrounds is pulled from mongo
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log("Cant find campgrounds");
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: campgrounds });
    }
  })
});

app.post("/campgrounds", (req, res) => {
  let campName = req.body.name;
  let campImage = req.body.image;
  let newCampground = { name: campName, image: campImage };
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
});

app.get("/campgrounds/new", (req, res) => {
  res.render("addcampground")
});

app.listen(3000, () => {
  console.log("YelpCamp server: Listening on port 3000.");
});