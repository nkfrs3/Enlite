const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const apiRouter = require('./api');

router.use('/api', apiRouter);

module.exports = router;
