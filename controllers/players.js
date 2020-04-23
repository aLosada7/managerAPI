const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Player = require('../models/Player');
const Team = require('../models/Team');

// @desc Get players
// @route GET /api/v1/players
// @route GET /api/v1/teams/:playerId/players
// @access Public
exports.getPlayers = asyncHandler(async (req, res, next) => {
    if (req.params.teamId) {
        const players = await Player.find({ team: req.params.teamId });

        return res.status(200).json({
            success: true,
            count: players.length,
            data: players
        })
    } else {
        res.status(200).json(res.advancedResults);
    }
});

// @desc Get a single players
// @route GET /api/v1/players/:id
// @access Public
exports.getPlayer = asyncHandler(async (req, res, next) => {
    const player = await Player.findById(req.params.id).populate({
        path: 'team',
        select: 'name description'
    });

    if(!player) {
        return next(new ErrorResponse(`No player with the id of ${req.params.id}`), 404);
    }

    res.status(200).json({
        success: true,
        data: player
    })
});

// @desc Add a players
// @route POST /api/v1/teams/:teamId/players
// @access Private
exports.addPlayer = asyncHandler(async (req, res, next) => {
    req.body.team = req.params.teamId;

    const team = await Team.findById(req.params.teamId);

    if(!team) {
        return next(new ErrorResponse(`No team with the id of ${req.params.teamId}`), 404);
    }

    const player = await Player.create(req.body);

    res.status(200).json({
        success: true,
        data: player
    })
});

// @desc Update a player
// @route PUT /api/v1/players/:id
// @access Private
exports.updatePlayer = asyncHandler(async (req, res, next) => {
    let player = await Player.findById(req.params.id);

    if(!player) {
        return next(new ErrorResponse(`No player found with the id of ${req.params.teamId}`), 404);
    }

    player = await Player.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: player
    })
});

// @desc Remove a player
// @route DELETE /api/v1/players/:id
// @access Private
exports.deletePlayer = asyncHandler(async (req, res, next) => {
    const player = await Player.findById(req.params.id);

    if(!player) {
        return next(new ErrorResponse(`No player found with the id of ${req.params.teamId}`), 404);
    }

    await player.remove();

    res.status(200).json({
        success: true,
        data: {}
    })
});