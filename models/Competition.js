const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, ' Please add a competition name']
    },
    thropyName: {
        type: String,
        trim: true,
        required: [true, 'Please add a thropy name']
    },
    thropyValue: {
        type: Number,
        required: [true, 'Please add a thropy value']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Competition', CompetitionSchema);