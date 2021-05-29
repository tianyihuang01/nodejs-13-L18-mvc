const express = require("express");
const taskRouter = require("./task");

const router = express.Router();

router.use("/tasks", taskRouter);

module.exports = router;
