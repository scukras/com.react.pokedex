const express = require('express');
const router = express.Router();
const rtResources = require('./resources');

router.get('/pokedex/api/connected', (req, res) => res.status(200).json({ connected: true }));
router.use('/pokedex/api/resources', rtResources);

module.exports = router;
