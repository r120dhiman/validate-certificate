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
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const certificate=mongoose.model('Certificate', certificateSchema);

module.exports = certificate;