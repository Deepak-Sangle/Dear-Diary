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
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;