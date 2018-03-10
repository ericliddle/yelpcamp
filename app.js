const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs")

app.get("/", (req, res) =>{
  res.render("landing")
})


app.get("/campgrounds", (req, res) => {
  let campgrounds = [
    {name: "Salmon Creek", image:"http://www.mbpost.com/images/original/271559.jpg"},
    {name: "Crystal Lake", image:"http://www.davessierrafishing.com/photos300/crystal_lake2.jpg"},
    {name: "Narin Falls", image:"https://scontent-ort2-1.cdninstagram.com/vp/31a5cc819e88d001d8be8a59ce2c6851/5B3ED071/t51.2885-15/e35/28435082_211679469604582_1009801280064847872_n.jpg"},
    {name: "Coachwood Camping", image:"http://www.findacamp.com.au/pictures/large_522.JPG"}
  ];
  res.render("campgrounds", {campgrounds: campgrounds})
})

app.listen(3000, () => {
  console.log("YelpCamp server: Listening on port 3000.");
});