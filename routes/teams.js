const express = require('express');
const { 
    getTeams,
    getTeam,
    createTeam,
    updateTeam,
    deleteTeam,
    teamPhotoUpload
} = require('../controllers/teams');

const Team = require('../models/Team');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const playerRouter = require('./players');
const gameRouter = require('./games');

// Re-route into other resource routers
router.use('/:teamId/players', playerRouter);
router.use('/:teamId/games', gameRouter);

router
    .route('/:id/photo')
    .put(protect, authorize('user', 'admin'), teamPhotoUpload);
 
router
    .route('/')
    .get(advancedResults(Team, 'players'), getTeams)
    .post(protect, authorize('user', 'admin'), createTeam);

router
    .route('/:id')
    .get(getTeam)
    .put(protect, authorize('user', 'admin'), updateTeam)
    .delete(protect, authorize('user', 'admin'), deleteTeam);

module.exports = router;