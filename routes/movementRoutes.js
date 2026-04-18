const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createMovement, getMovements } = require("../controllers/movementController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createMovement);
router.get("/", getMovements);

module.exports = router;
