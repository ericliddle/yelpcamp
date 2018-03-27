const mongoose = require("mongoose"),
  Campground = require("./models/campground");

seedDB = () => {
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Removed Campgrounds")
    }
  })
}

module.exports = seedDB;