const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Game = require('../models/Game');
const Team = require('../models/Team');

const GameRepository = require('../repositories/game').GameRepository;

// @desc Get all games
// @route GET /api/v1/games
// @access Public
exports.getAllGames = asyncHandler(async (req, res, next) => {
    if (req.params.teamId) {
        const games = await Game.find({$or:[{ homeTeam: req.params.teamId },{ visitorTeam: req.params.teamId }]}, 'homeTeam visitorTeam homePoints visitorPoints winner')
        .populate({
            path: 'homeTeam',
            select: 'name'
        }).populate({
            path: 'visitorTeam',
            select: 'name'
        });;

        return res.status(200).json({
            success: true,
            count: games.length,
            data: games
        })
    } else {
        res.status(200).json(res.advancedResults);
    }
});

// @desc Get a single game
// @route GET /api/v1/games/:id
// @access Public
exports.getSingleGame = asyncHandler(async (req, res, next) => {
    const game = await Game.findById(req.params.id).populate({
        path: 'homeTeam',
        select: 'name arenaName arenaSize'
    }).populate({
        path: 'visitorTeam',
        select: 'name'
    });

    if(!game) {
        return next(new ErrorResponse(`Game not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ 
        success: true, 
        data: game
    });
});

// @desc Create new game
// @route POST /api/v1/games
// @access Private
exports.createGame = asyncHandler(async (req, res, next) => {
    // Add user to req body

    const newGame = {
        "homeTeam": req.body.home,
        "visitorTeam": req.body.visitor,
        "homePoints": 0,
        "visitorPoints": 0,
        "gameStandings": {
            "localStandings": [],
            "visitorStandings": []
        },
        "scoreByQuarter": [
            {
                "homePoints": 0,
                "visitorPoints": 0
            },
            {
                "homePoints": 0,
                "visitorPoints": 0
            },
            {
                "homePoints": 0,
                "visitorPoints": 0
            },
            {
                "homePoints": 0,
                "visitorPoints": 0
            }
        ],
        "user": req.user.id
    }

    const game = await Game.create(newGame);

    res.status(200).json({ 
        success: true, 
        data: game
    });
});

// @desc Simulate game
// @route PUT /api/v1/games/:id/simulate
// @access Private
exports.simulateGame = asyncHandler(async (req, res, next) => {
    GameRepository.simulateGame(req.params.id)
     .then(result => {
        res.status(200).json({ 
            success: true, 
            data: result
        });
     })
     .catch(err => {
        res.status(400).json({ 
            success: false, 
            data: {}
        });
     })

});
 