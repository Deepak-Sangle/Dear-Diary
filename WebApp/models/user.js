const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    entry : {
        type : Array,
    },
    DP : {
        type : String,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;