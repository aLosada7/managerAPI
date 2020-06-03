const express = require('express');
const { 
    getAllGames,
    getSingleGame,
    createGame,
    simulateGame
} = require('../controllers/games');

const Game = require('../models/Game');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');
 
router.route('/')
    .get(advancedResults(Game, [{
        path: 'homeTeam',
        select: 'name'
    },
    {
        path: 'visitorTeam',
        select: 'name'
    }]), getAllGames)
    .post(protect, authorize('user', 'admin'), createGame)

router.route('/:id/simulate')
    .put(protect, authorize('user', 'admin'), simulateGame)

router.route('/:id')
    .get(getSingleGame)

module.exports = router;