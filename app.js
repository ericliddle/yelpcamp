const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/yelpcamp");

//Schema:
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Harrison Hot Springs",
//   image: "http://www.news1130.com/wp-content/blogs.dir/sites/9/2017/07/03/harrison-fire-e1499104828226.jpg",
//   description: "Harrison Hot Springs is a small town with a lake at the foot of the river.  Up a logging road you'll find pebble beach campgrounds."
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

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log("Cant find campgrounds");
      console.log(err);
    } else {
      res.render("index", { campgrounds: campgrounds });
    }
  })
});

app.post("/campgrounds", (req, res) => {
  let campName = req.body.name;
  let campImage = req.body.image;
  let campDesrcipton = req.body.description;
  let newCampground = { name: campName, image: campImage, description: campDesrcipton };
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

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      req.params.id
      res.render("show", {campground: foundCampground});
    };
  });
});

app.listen(3000, () => {
  console.log("YelpCamp server: Listening on port 3000.");
});