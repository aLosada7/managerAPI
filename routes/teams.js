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

// Include other resource routers
const playerRouter = require('./players');

// Re-route into other resource routers
router.use('/:teamId/players', playerRouter);

router
    .route('/:id/photo')
    .put(teamPhotoUpload);
 
router
    .route('/')
    .get(advancedResults(Team, 'players'), getTeams)
    .post(createTeam);

router
    .route('/:id')
    .get(getTeam)
    .put(updateTeam)
    .delete(deleteTeam);

module.exports = router;