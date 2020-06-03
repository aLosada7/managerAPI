const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Competition = require('../models/Competition');

// @desc Get all competitions
// @route GET /api/v1/competitions
// @access Public
exports.getCompetitions = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc Get a single competition
// @route GET /api/v1/competition/:id
// @access Public
exports.getCompetition = asyncHandler(async (req, res, next) => {
    const competition = await Competition.findById(req.params.id);

    if(!competition) {
        return next(new ErrorResponse(`Competition not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ 
        success: true, 
        data: competition
    });
});

// @desc Create new competition
// @route POST /api/v1/teams
// @access Private
exports.createCompetition = asyncHandler(async (req, res, next) => {
    // Add user to req body
    req.body.user = req.user.id

    const competition = await Competition.create(req.body);

    res.status(200).json({ 
        success: true, 
        data: competition
    });
});

// @desc Update competition
// @route UPDATE /api/v1/competitions/:id
// @access Private
exports.updateCompetition = asyncHandler(async (req, res, next) => {
    let competition = await Competition.findById(req.params.id);

    if(!competition) {
        return next(new ErrorResponse(`Competition not found with id of ${req.params.id}`, 404));
    }

    if(req.user.role !== 'admin') {
        return next (new ErrorResponse(`User ${req.user.id} is not authorized to update this competition`), 401);
    }

    // Make sure it's the admin
    competition = await Competition.findOneAndUpdate(req.params.id, req.body, {
        new: true, // return updated data,
        runValidators: true
    });


    res.status(200).json({ 
        success: true, 
        data: competition
    });
});

// @desc Delete competition
// @route DELETE /api/v1/competitions/:id
// @access Private
exports.deleteCompetition = asyncHandler(async (req, res, next) => {
    const competition = await Competition.findById(req.params.id)

    if(!competition) {
        return next(new ErrorResponse(`Competition not found with id of ${req.params.id}`, 404));
    }

    if(req.user.role !== 'admin') {
        return next (new ErrorResponse(`User ${req.user.id} is not authorized to delete this team`), 401);
    }

    competition.remove();

    res.status(200).json({ 
        success: true, 
        data: {}
    });
}); 