const express = require('express');
const router = express.Router();
require("dotenv").config();

//Requiring Models Schemas
const User = require('../models/user');

//Getting all requests

router.get('/', (req,res)=> {
    res.status(200).send({"Message" : "Hello..."});
});

router.get('/getdata', (req,res)=> {
    return res.status(200).send({"Message" : "Data..."});
});

module.exports = router;
