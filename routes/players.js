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
 
router.route('/')
    .get(advancedResults(Player, {
        path: 'team',
        select: 'name position'
    }), getPlayers)
    .post(addPlayer);

router.route('/:id')
    .get(getPlayer)
    .put(updatePlayer)
    .delete(deletePlayer);

module.exports = router;