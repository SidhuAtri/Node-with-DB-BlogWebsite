const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent =
  "Motivation is your desire to do something with your personal life, at work, in school, in sports, or in any hobbies. Having the motivation to do something can help you achieve your big goals and dreams, whatever they may be.Knowing how to motivate yourself can help you accomplish anything you set your mind to, so let’s get to that next.";
const aboutContent =
  " I am well-organized, known for the thorough and methodical approach that I take when researching and planning. An excellent team-player, able to listen, negotiates and communicates persuasively and encouragingly with people. I am a Full Stack Web Developer & Programmer. To Know More Visit - https://sidharthatri.netlify.app/ ";
const contactContent = "To be Updated Soon .....";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://sidharth:Test123@cluster0-myvio.mongodb.net/blogDB",
  { useNewUrlParser: true }
);

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
