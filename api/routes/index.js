const express = require("express");
const router = express.Router();
const r1Controller = require('../controllers/r1');
const r2Controller = require('../controllers/r2');
const r3Controller = require('../controllers/r3');
const r4Controller = require('../controllers/r4');
const r5Controller = require('../controllers/r5');

router.get("/R1", r1Controller);
router.get("/R2", r2Controller);
router.get("/R3/:key", r3Controller);
router.get("/R4/:key", r4Controller);
router.get("/R5/:key", r5Controller);

module.exports =router;
