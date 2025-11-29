const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authentication');

// All analytics routes require authentication
router.get('/trends', authMiddleware, analyticsController.getRegistrationTrends);
router.get('/by-state', authMiddleware, analyticsController.getSupportersByState);
router.get('/by-lg', authMiddleware, analyticsController.getSupportersByLG);
router.get('/metrics', authMiddleware, analyticsController.getKeyMetrics);

module.exports = router;
