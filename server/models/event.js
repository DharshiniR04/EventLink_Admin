const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    teamsize: {
        type: Number,
        default: null
    },
    reminder: {
        type: String,
        default: null
    },
    department: {
        type: String,
        default: null
    },
    rules: {
        type: [String],
        default: []
    },
    adminname: {
        type: String,
        default: ""
    },
    admincontact: {
        type: String,
        default: ""
    },
    adminemail: {
        type: String,
        default: ""
    },
    adminprofile: {
        type: String,
        default: ""
    }
});

const Event = mongoose.model('events', EventSchema);
module.exports = Event;
