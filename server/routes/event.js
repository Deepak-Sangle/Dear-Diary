const express = require('express');
const router = express.Router();
const crypto = require('crypto');

require("dotenv").config();

//Requiring Models Schemas
const User = require('../models/user');
const Event = require('../models/event');

const { isTokenValid } = require('../middleware/authorization');
const { decryptData, encryptData, getMasterInitVector, getMasterSecretKey } = require('../helper/cryptography');

router.post('/add-event', isTokenValid, async (req,res)=> {
    const id = req.id;
    const user = await User.findOne({_id : id});
    if(!user) return res.status(403).send({message : "Hacked!", success : false});

    const currentDate = Date.now();
    const secretKeyHex = decryptData(user.secretKey, getMasterInitVector(), getMasterSecretKey());
    const secretKey = Buffer.from(secretKeyHex, 'hex');
    const initVector = crypto.randomBytes(16);
    const initVectorHex = initVector.toString('hex');

    const event = new Event({
        createdBy : user._id,
        createdAt : currentDate,
        initVector : encryptData(initVectorHex, getMasterInitVector(), secretKey),
        detail : encryptData(req.body.detail, initVector, secretKey)
    });
 
    if(user.lastEntry !== undefined){
        const dateDiff = currentDate - user.lastEntry.getTime();
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

router.get('/get-all-events/:id', isTokenValid, async (req,res)=> {

    const id = req.params.id;
    if(id != req.id) return res.status(403).send({data : null, success : false});
    
    const user = await User.findOne({_id : id});
    const secretKeyHex = decryptData(user.secretKey, getMasterInitVector(), getMasterSecretKey());
    const secretKey = Buffer.from(secretKeyHex, 'hex');

    Event.find({createdBy : id})
        .then((result) => {
            let decryptedResult = result.map((event) => {
                const initVectorHex = decryptData(event.initVector, getMasterInitVector(), secretKey);
                const initVector = Buffer.from(initVectorHex, 'hex');
                const decryptedDetails = decryptData(event.detail, initVector, secretKey);
                return {createdAt : event.createdAt, detail : decryptedDetails};
            })
            return res.status(200).send({data : decryptedResult, success : true});
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({message: err.message, success : false});
        })
});

module.exports = router;