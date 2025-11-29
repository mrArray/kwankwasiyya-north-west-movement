const express = require('express');
const router = express.Router();
const supporterController = require('../controllers/supporterController');
const authMiddleware = require('../middleware/authentication');

// Public routes
router.post('/register', supporterController.register);
router.get('/verify/:registrationNumber', supporterController.verify);

// Protected routes (require authentication)
router.get('/', authMiddleware, supporterController.getAll);
router.get('/statistics', authMiddleware, supporterController.getStatistics);
router.get('/export/csv', authMiddleware, supporterController.exportCSV);
router.get('/:id', authMiddleware, supporterController.getById);

module.exports = router;
