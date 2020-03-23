import express from "express";
import mongoose from "mongoose";
require('dotenv').config();
import bodyParser from "body-parser";
import cors from "cors"
import routes from "./routes/index.js";

const app = express();

/**
 * Connect to the database
 */

// mongoose.connect("mongodb://localhost");
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser:true,useUnifiedTopology: true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});

/**
 * Middleware
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// catch 400
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(400).send(`Error: ${res.originUrl} not found`);
  next();
});

// catch 500
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(`Error: ${err}`);
  next();
});

/**
 * Register the routes
 */

routes(app);

export default app;
