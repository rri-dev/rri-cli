if (process.env.NEW_RELIC_APP_NAME) require("newrelic");
require('dotenv').config();
import express from 'express';
import { forceHttps } from './middleware/util';
import { Pool } from 'pg';

// Warm up the pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query("SELECT 1").then(() => console.log("Warmed up the pool")).catch(err => console.error("Failed to warm up the pool:", err));

// setup the app & middleware
let app = express();
let helmet = require('helmet');
let port = Number(process.env.PORT || 3030);
let bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.use(helmet());
app.use(forceHttps);
// // todo: add api_auth middleware to check for shared key in the header
// // app.use(api_auth);

// set up the routes
app.use('/health', require('./routes/health'));

// start the server
app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});

export {
    app
} // for testing