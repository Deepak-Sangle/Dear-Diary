const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    createdAt : {
        type : Date,
        required : true
    },
    detail : {
        type : String
    },
    initVector : {
        type : String,
        required : true
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;