const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

app.use(express.json({ extended: false }));

//cross origin resource sharing
app.use(cors());

//databse connection
connectDB();

//routes
app.use("/", require("./routes"));

app.listen(5000, () => console.log("Server is running"));
