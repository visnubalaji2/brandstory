const express = require('express');
const router = express.Router();
const controller = require('../controllers/contents.controller');

router.get('/', controller.getAllContents);
router.post('/', controller.createContent);

module.exports = router;
