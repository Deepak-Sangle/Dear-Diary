const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Requiring Models Schemas
const User = require('../models/user');
const { isTokenValid } = require('../middleware/authorization');
const { encryptData, NUM_BYTES, getMasterInitVector, getMasterSecretKey } = require('../helper/cryptography');

//Getting all requests

router.get('/', (req,res)=> {
    res.status(200).send("The backend server is up and running!");
});

router.post('/register', async (req,res)=>{
    try{
        let {name, password, cpassword} = req.body;
        if(!name || !password || !cpassword) return res.status(203).send({message : "Please enter all the fields", success : "false"});
        if(password !== cpassword) return res.status(203).send({message : "Enter the same password twice for verification", success : "false"});
        const existingUser = await User.findOne({name : name});
        if(existingUser) return res.status(203).send({message : "An account with this name already exists", success : "false"});

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const originalKey = crypto.randomBytes(NUM_BYTES).toString('hex');
        
        const newUser = new User({
            name,
            password: hashedPassword,
            secretKey : encryptData(originalKey, getMasterInitVector(), getMasterSecretKey())
        });

        const savedUser = await newUser.save();
        if(savedUser) return res.status(201).send({message : "New user succesfully created : ", success : true});
        else return res.status(500).send({message: err.message, success : false});
        
    } catch (err) {
        return res.status(500).send({message: err.message, success : false});
    }
});

router.post('/login', async (req, res) => {
    try {
        let {name, password} = req.body;
        if(!name || !password) return res.status(203).send({message : "Please enter all the fields", success : "false"});
        const existingUser = await User.findOne({name : name});
        if(!existingUser) return res.status(203).send({message : "An account with this name does not exists", success : "false"});
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) return res.status(400).json({message: "Invalid credentials", success : false});
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn : '1d'
        });
        const tommorow = new Date(Date.now());
        tommorow.setDate(tommorow.getDate() + 1);
        return res
            .cookie('token', token, {
                expires: tommorow,
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
            })
            .status(200)
            .send({message : "Login Successful", success : true, data : existingUser});
    } catch(err){
        return res.status(500).send({message: err.message, success : false});
    }
});

router.get('/getallnames', (req,res)=> {
    User.find()
        .then((users)=> {
            return res.status(200).send({data : users.map((user) => user.name), success : true});
        })
        .catch((err)=> {
            console.log(err)
            return res.status(500).send({message : err, success : false})
        });
});

router.get("/logout", isTokenValid, (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .send({message: "Successfully logged out", success : true});
});

router.get('/verify-user', isTokenValid, async (req, res)=> {
    return res.status(200).send({message : "user is authorized for the given request", success : true}); 
});

module.exports = router;