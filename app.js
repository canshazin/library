const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const sequelize = require("./util/database");
const Book = require("./models/book.js");
const path = require("path");

var cors = require("cors");
// app.use(bodyParser.urlencoded({ extended: false }));

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(routes);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
//   sequelize
//   // .sync({ force: true })
//   .sync()
//   .then((result) => {
//     return Student.findByPk(1);
//     // console.log(result);
//   })
//   .then((student) => {
//     if (!student) {
//       return Student.create({ name: "Max", email: "test@test.com" });
//     }
//     return student;
//   })
//   .then((student) => {
//     // console.log(student);
//     app.listen(3000);
//   })

//   .catch((err) => {
//     console.log(err);
//   });
