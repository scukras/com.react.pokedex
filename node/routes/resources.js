const express = require('express');
const router = express.Router();
const ctrlResources = require('../controllers/resources');

router.get('/landing', ctrlResources.landingMP4);

module.exports = router;