const express = require("express");
const router = express.Router();
const r1Controller = require('../controllers/r1');
const r2Controller = require('../controllers/r2');
const r3Controller = require('../controllers/r3');
const r4Controller = require('../controllers/r4');
const r5Controller = require('../controllers/r5');
const getBlockedController = require('../controllers/blockedKeys');
const getAvailableController = require('../controllers/availableKeys');

router.get("/generate-key", r1Controller);
router.post("/get-key", r2Controller);
router.put("/unblock/:key", r3Controller);
router.delete("/delete/:key", r4Controller);
router.put("/keep-alive/:key", r5Controller);
router.get("/blocked", getBlockedController);
router.get("/available", getAvailableController);

module.exports =router;
