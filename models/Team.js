const mongoose = require('mongoose');
const slugify = require('slugify');
const countries = require('./Country');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    budget: {
        type: Number,
        min: [0, 'Budget must be bigger than 0']
    },
    country: {
        type: String,
        required: true,
        enum: countries
    },
    competition: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
          'sp1',
          'sp2',
          'it1',
          'fr1',
          'ger1',
          'champions'
        ]
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    arenaName: {
        type: String,
        required: [true, 'please add an Arena Name'],
        maxlength: [50, 'Arena name can not be more than 50 characters']
    },
    arenaSize: Number,
    fans: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
});

// Create bootcamp slug from the name
TeamSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Cascade delete courses when a bootcamp is deleted
TeamSchema.pre('remove', async function(next) {
    console.log(`Players being removed from team ${this._id}`);
    await this.model('Player').deleteMany({ bootcamp: this._id });
    next();
});

// Reverse populate with virtuals
TeamSchema.virtual('players', {
    ref: 'Player',
    localField: '_id',
    foreignField: 'team',
    justOne: false
});

module.exports = mongoose.model('Team', TeamSchema);