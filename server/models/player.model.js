const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]},
    position: {type: String}}, 
    {timestamps: true});

module.exports.Player = mongoose.model('Player', PlayerSchema);