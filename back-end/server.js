const express = require("express");

// use process.env variables to keep private variables,
require("dotenv").config();

// Express Middleware
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
var db = require("knex")({
  client: "mysql",
  connection: {
    host: "psta-db",
    user: "psta",
    password: "psta3211",
    database: "pstadb",
    port: "3306",
  },
});

// Controllers - aka, the db queries
const main = require("./controllers/main");

// App
const app = express();

// App Middleware
const corsOptions = {
  origin: "http://localhost:3000", // 허용되는 Origin
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("combined")); // use 'tiny' or 'combined'
// App Routes - Auth
app.post("/adduser", (req, res) => main.addUser(req, res, db));
app.post("/login", (req, res) => main.login(req, res, db));
app.post("/getuser", (req, res) => main.getUser(req, res, db));
app.get("/getalluser", (req, res) => main.getAllUser(req, res, db));
app.delete("/deleteuser", (req, res) => main.deleteUser(req, res, db));

app.get("/", (req, res) => res.send("hello world"));
app.post("/board", (req, res) => main.getBoard(req, res, db));
app.get("/board/:id", (req, res) => main.getOneBoard(req, res, db));
app.post("/boardpost", (req, res) => main.insertBoard(req, res, db));
app.put("/board/:id", (req, res) => main.updateBoard(req, res, db));
app.delete("/board/:id", (req, res) => main.deleteBoard(req, res, db));

app.post("/userpost/:type", (req, res) => main.getPostList(req, res, db));
app.post("/userpost", (req, res) => main.insertPost(req, res, db));
app.delete("/userpost/:id", (req, res) => main.deletePost(req, res, db));
app.put("/userpost/:id", (req, res) => main.updatePost(req, res, db));
app.get("/userpostdetail/:id", (req, res) => main.getOnePost(req, res, db));
app.get("/usertypepost/:btype", (req, res) =>
  main.getOneTypePost(req, res, db)
);

// App Server Connection
app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT || 3001}`);
});
