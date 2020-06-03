const express = require('express');
const { 
    getCompetitions,
    getCompetition,
    createCompetition,
    updateCompetition,
    deleteCompetition
} = require('../controllers/competitions');

const Competition = require('../models/Competition');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
//const playerRouter = require('./players');

// Re-route into other resource routers
//router.use('/:teamId/players', playerRouter);
 
router
    .route('/')
    .get(advancedResults(Competition, null), getCompetitions)
    .post(protect, authorize('admin'), createCompetition);

router
    .route('/:id')
    .get(getCompetition)
    .put(protect, authorize('admin'), updateCompetition)
    .delete(protect, authorize('admin'), deleteCompetition);

module.exports = router;