const express = require('express');
const router = express.Router();
const controller = require('../controllers/navmenu.controller');

router.get('/', controller.getAllMenus);
router.post('/', controller.createMenu);

module.exports = router;
