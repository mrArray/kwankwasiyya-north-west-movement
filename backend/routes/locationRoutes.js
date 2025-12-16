const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Get all states
router.get('/states', locationController.getStates);

// Get LGAs for a specific state
router.get('/lgas', locationController.getLGAs);

// Get all states with their LGAs
router.get('/all', locationController.getAllStatesWithLGAs);

module.exports = router;
