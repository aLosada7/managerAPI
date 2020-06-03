const express = require('express');
const { 
    getReport,
} = require('../controllers/report');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));
 
router
    .route('/')
    .get(getReport)

module.exports = router;