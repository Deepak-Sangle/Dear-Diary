const express = require('express');
const router = express.Router();
require("dotenv").config();

//Requiring Models Schemas
const User = require('../models/user');
const Event = require('../models/event');

const { isTokenValid } = require('../middleware/authorization');

router.post('/add-event', isTokenValid, async (req,res)=> {
    const id = req.id;
    console.log({id});
    const user = await User.findOne({_id : id});
    if(!user) return res.status(403).send({message : "Hacked!", success : false});

    const currentDate = Date.now();
    const event = new Event({
        createdBy : user._id,
        createdAt : currentDate,
        detail : req.body.detail
    });
    if(user.lastEntry !== null){
        const dateDiff = currentDate - user.lastEntry.getTime();
        console.log({currentDate, lastEntry : user.lastEntry.getTime(), dateDiff});
        if(dateDiff < 1000*60*60*24) return res.status(400).send({message : "Cannot add event so soon", success : true});
    }
    user.lastEntry = currentDate;
    const savedUser = await user.save();
    if(!savedUser) return res.status(500).json({message: "Could not update the given user data", success : false});

    event.save()
        .then((result)=> {
            return res.status(201).send({message : "New event succesfully created : ", success : true, data : event});
        })
        .catch((err)=> {
            console.log(err);
            return res.status(500).json({message: err.message, success : false});
        })
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

router.get('/get-all-events/:id', isTokenValid, async (req,res)=> {
    console.log("Above : ", Date.now());
    await sleep(1000*60);
    console.log("Below : ", Date.now());

    const id = req.params.id;
    console.log({paramId : id, loggedId : req.id});
    if(id != req.id) return res.status(403).send({data : null, success : false});
    
    Event.find({createdBy : id})
        .then((result) => {
            return res.status(200).send({data : result, success : true});
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({message: err.message, success : false});
        })
});

module.exports = router;