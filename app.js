const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactdance", { useNewUrlParser: true });

// define mongoose scheme
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  description: String,
});
const contact = mongoose.model("contact", contactSchema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

//Endpoints
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("this data has been send to database");
    })
    .catch(() => {
      res.status(400).send("items was not saved");
    });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
