const User = require('../models/user');
const jwt = require("jsonwebtoken");

async function isTokenValid(req, res, next){
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send({message : "Cookies not present for authorization", success : false});
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(401).send({message : "Invalid JWT Token for authorization", success : false});
    const user = await User.findById({_id : verified.id});
    if (!user) return res.status(401).send({message : "User with given JWT Payload does not exists", success : false});
    req.id = verified.id;
    return next();
  } catch (err) {
    return res.status(500).json({error: err.message, success : false });
  }
}

module.exports = {
  isTokenValid
}