const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
    },
    eventName: {
        type: String,
        required: true,
    },
    position:{
        default:"NA",
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    issuedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {timestamps: true});

const certificate=mongoose.model('Certificate', certificateSchema);

module.exports = certificate;