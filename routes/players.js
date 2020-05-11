const express = require('express');
const { 
    getPlayers,
    getPlayer,
    addPlayer,
    updatePlayer,
    deletePlayer
} = require('../controllers/players');

const Player = require('../models/Player');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');
 
router.route('/')
    .get(advancedResults(Player, {
        path: 'team',
        select: 'name position'
    }), getPlayers)
    .post(protect, authorize('user', 'admin'), addPlayer);

router.route('/:id')
    .get(getPlayer)
    .put(protect, authorize('user', 'admin'), updatePlayer)
    .delete(protect, authorize('user', 'admin'), deletePlayer);

module.exports = router;