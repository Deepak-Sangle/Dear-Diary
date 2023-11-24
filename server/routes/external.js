const express = require('express');
const router = express.Router();
require("dotenv").config();

//Getting all requests

router.get('/external/pat-cs360', (req,res)=> {
  res.status(200)
  .header('Access-Control-Allow-Origin', 'https://deepak-sangle.github.io/Computer-Graphics/')
  .send({success : true, data : process.env.PAT_FOR_CG});
});

module.exports = router;