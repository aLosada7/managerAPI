const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Team = require('../models/Team');

// @desc Get all teams
// @route GET /api/v1/teams
// @access Public
exports.getTeams = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc Get a single team
// @route GET /api/v1/team/:id
// @access Public
exports.getTeam = asyncHandler(async (req, res, next) => {
    const team = await Team.findById(req.params.id);

    if(!team) {
        return next(new ErrorResponse(`Team not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ 
        success: true, 
        data: team
    });
});

// @desc Create new team
// @route POST /api/v1/teams
// @access Private
exports.createTeam = asyncHandler(async (req, res, next) => {
    const team = await Team.create(req.body);

    res.status(200).json({ 
        success: true, 
        data: team
    });
});

// @desc Update team
// @route UPDATE /api/v1/teams/:id
// @access Private
exports.updateTeam = asyncHandler(async (req, res, next) => {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // return updated data,
        runValidators: true
    })

    if(!team) {
        return next(new ErrorResponse(`Team not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ 
        success: true, 
        data: team
    });
});

// @desc Delete team
// @route DELETE /api/v1/teams/:id
// @access Private
exports.deleteTeam = asyncHandler(async (req, res, next) => {
    const team = await Team.findById(req.params.id)

    if(!team) {
        return next(new ErrorResponse(`Team not found with id of ${req.params.id}`, 404));
    }

    team.remove();

    res.status(200).json({ 
        success: true, 
        data: {}
    });
}); 

// @desc Upload photo for team
// @route PUT /api/v1/teams/:id/photo
// @access Private
exports.teamPhotoUpload = asyncHandler(async (req, res, next) => {
    const team = await Team.findById(req.params.id)

    if(!team) {
        return next(new ErrorResponse(`Team not found with id of ${req.params.id}`, 404));
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    file.name = `photo_${team._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.error(err);
            return next(new ErrorResponse(`There is a problem with the file upload`, 500));
        }

        await Team.findByIdAndUpdate(req.params.id, { photo: file.name });

        res.status(200).json({
            success: true,
            data: file.name
        })
    });
}); 