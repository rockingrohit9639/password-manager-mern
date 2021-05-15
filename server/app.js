const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

// SETTING UP DOTENV
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

// CONNECTING WITH DATABASE
require("./db/connection");

app.use(express.json());


// LINKING THE ROUTER FILES 
app.use(require("./router/routing"));




// LISTENING TO PORT 
app.listen(PORT, () =>
{
    console.log(`listening to port : http://localhost:${PORT}/`)
})