const mongoose = require('mongoose');
const countries = require('./Country');

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, ' Please add a player name']
    },
    average: {
        type: Number,
        required: [true, 'Please add a player average']
    },
    age: {
        type: Number,
        required: [true, 'Please add a player age']
    },
    price: {
        type: Number,
        required: [true, 'Please add a player price']
    },
    number: {
        type: Number,
        required: [true, 'Please add a player number']
    },
    position: {
        type: String,
        required: [true, 'Please add a player position'],
        enum: ['Guard', 'Forward', 'Center']
    },
    country: {
        type: String,
        required: true,
        enum: countries
    },
    attributes: {
        type: {},
        required: [true, 'Please add player attributes']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    team: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        require: true
    }
});

module.exports = mongoose.model('Player', PlayerSchema);