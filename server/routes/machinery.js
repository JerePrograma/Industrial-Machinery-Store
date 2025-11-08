const express = require('express');
const router = express.Router();
const machineryController = require('../controllers/machineryController');


// Route to get all new machinery
router.get('/new', machineryController.getNewMachinery);

// Route to get all used machinery
router.get('/used', machineryController.getUsedMachinery);

// Route to get all machinery offers
router.get('/offers', machineryController.getOffers);


// Route to filter machinery by category and brand
router.get('/filter', machineryController.filterMachinery);

// Route to get machinery by ID
router.get('/:id', machineryController.getMachineryById);


module.exports = router;