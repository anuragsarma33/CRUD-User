const express = require('express');
const connectDB = require('./config/db');
const app = express();

app.use(express.json({extended: false}))

//databse connection
connectDB();
//routes
app.use('/',require('./routes'));

app.listen(5000,() => console.log('Server is running'));