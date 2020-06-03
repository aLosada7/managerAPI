const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    homeTeam: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        require: true
    },
    visitorTeam: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        require: true
    },
    winner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
    },
    homePoints: {
        type: Number,
        required: [true, 'Please add home team points']
    },
    visitorPoints: {
        type: Number,
        required: [true, 'Please add visitor team points']
    },
    mostValuablePlayer: {
        type: String,
        trim: true
    },
    scoreByQuarter: {
        // Array of objects
        type: [{}],
        required: true,
    },
    gameActions: {
        // Array of objects
        type: [{}]
    },
    gameStandings: {
        type: {},
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', GameSchema);