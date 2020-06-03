const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Competition = require('../models/Competition');
const Team = require('../models/Team');
const Player = require('../models/Player');

// @desc Get report information
// @route GET /api/v1/report
// @access Public
exports.getReport = asyncHandler(async (req, res, next) => {
    const teams = await Team.countDocuments();
    const players = await Player.countDocuments();
    const competitions = await Competition.countDocuments();

    const expensivePlayers = await Player.find({}).limit(5).sort({price: -1});
    const topPlayers = await Player.find({}).limit(5).sort({average: -1});

    res.status(200).json({ 
        success: true, 
        data: {
            totals: {
                teams,
                players,
                competitions
            },
            players: {
                expensivePlayers,
                topPlayers
            }
        }
    });
});

