const express = require('express');
const router = express.Router();
require("dotenv").config();

//Requiring Models Schemas
const User = require('../models/user');

//Getting all requests

router.get('/', (req,res)=> {
    res.status(200).send({"Message" : "Hello..."});
});

router.post('/savename', (req,res)=>{
    const user = new User({name : req.body.name});
    user.save((err)=> {
        if(err) {
            console.log(err);
            return res.status(500).send({"success":false});
        }
        return res.status(200).send({"success":true});
    });
});

router.get('/getallnames', (req,res)=> {
    User.find()
        .then((user)=> {
            return res.json({User : user})
        })
        .catch((err)=> console.log(err));
});

module.exports = router;