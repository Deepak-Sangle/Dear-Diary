require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true
}));

app.use(cookieParser());

//Set up MongoDB Database 
mongoose.connect(process.env.MONGOURI);

mongoose.connection.on('connected',()=>{
    console.log("Database connection On");
});
mongoose.connection.on('error',(err)=>{
    console.log("Error Connecting: ", err);
});

//Middleware Functions
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Route Requests
app.use(require('./routes/auth'));
app.use(require('./routes/event'));
app.use(require('./routes/external'));

//Listen Port
app.listen(PORT, (req,res)=>{
    console.log(`Listening to the port ${PORT}`);
});