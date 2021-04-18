require("dotenv").config();
require("./config/dbConnection");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// const cors = require("cors");
const cron = require('node-cron');
const Contract = require("./models/Contract");

const app = express();

app.use(logger("dev")); // Shows incoming requests with status codes in the console

app.use(express.json()); // Sets all data sent as application/json in req.body (AJAX)
app.use(express.urlencoded({ extended: false })); // Sets all data sent as application/x-www-form-urlencoded (Synchronous forms) in req.body
app.use(cookieParser()); // Parses Cookie header and populate req.cookies
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//   })
// );

app.use(express.static(path.join(__dirname, "public"))); //  serve static files such as images, CSS files, and JavaScript files,
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Stores the session in the Database, if the server crashes / restarts, session is preserved.
    secret: process.env.SESSION_SECRET, // Cookie encryption secret.
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    cookie: { secure: process.env.NODE_ENV === "production" ? true : false },
  })
); // Establishes a session between client & server (via cookie)

//run everyday at midnight
cron.schedule('0 0 0 * * *', async () => {
  const today = new Date();
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  console.log('running a task every day');
  console.log('today : ', today);
  try {
    const activeContract = await Contract.updateMany({dateStart:today},{status:"active"})
    console.log('pending to active =>', activeContract);
    const finishedContract = await Contract.updateMany({dateEnd:tomorrow},{status:"finished"})
    console.log('active to finish =>', finishedContract);
  } catch (error) {
    console.error(error);
  }
  });

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/contract", require("./routes/contract"));
app.use("/api/option", require("./routes/option"));
// app.use("/api/auth", require("./routes/auth"));

module.exports = app;
