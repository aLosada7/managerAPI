const mongoose = require('mongoose');

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
        enum: ['PG', 'PF', 'SG', 'SF', 'C']
    },
    createdAt: {
        type: Date,
        defailt: Date.now
    },
    team: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        require: true
    }
});

module.exports = mongoose.model('Player', PlayerSchema);