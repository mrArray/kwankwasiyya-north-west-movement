const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

// Public route - anyone can download PDF with registration number
router.get('/:registrationNumber', pdfController.generatePDF);

module.exports = router;
