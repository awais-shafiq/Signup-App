const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Knex = require("knex");
const knexConfig = require("./knexfile");
const {Model} = require("objection");
const cors = require("cors");

const dbConfig = require("./db/DatabaseConfig");

dbConfig.initializeDB();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const route = require("./routes/index");
//const userRoute = require("./routes/users");

app.use(cors());

app.use("/", route);
//app.use("/signup", userRoute);

app.listen(4000, function() {
    console.log("App Started!");
});