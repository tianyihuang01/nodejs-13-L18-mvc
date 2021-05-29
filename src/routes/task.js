const express = require("express");
const {
	getAllTask,
	getTaskById,
	addTask,
	updateTaskById,
	deleteTaskById,
} = require("../controllers/task");
const checkTaskExist = require("../middleware/checkTaskExist");
const parseId = require("../middleware/parseId");

const router = express.Router();

//task 1.4 create a new task (add descritpion value ONLY)
router.post("", addTask);

// task 1.1 get all tasks (allow query params for filtering)
router.get("", getAllTask);

//task 1.2 get task by id
router.get("/:id", parseId, checkTaskExist, getTaskById);

//task 1.3 update task by id (BODY CAN INCLUDE description & done)
router.put("/:id", parseId, checkTaskExist, updateTaskById);

//task1.5 delete task by id
router.delete("/:id", parseId, checkTaskExist, deleteTaskById);

module.exports = router;
