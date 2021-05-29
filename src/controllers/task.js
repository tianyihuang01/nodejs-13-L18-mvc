// const {
// 	getAllTask,
// 	getTaskById,
// 	addTask,
// 	updateTaskById,
// 	deleteTaskById,
// } = require("../models/task");
const Task = require("../models/task");

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: Object
 *       required:
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: auto generated unique identifier
 *         description:
 *           type: string
 *           description: description of the task
 *         done:
 *           type: boolean
 *           description: status of the task
 *       example:
 *         id: 1
 *         description: task No.1
 *         done: false
 *
 */


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task is successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 * 
 */
//task 1.4 create a new task (add descritpion value ONLY)
function addTask(req, res) {
	const { description } = req.body;
	// should do some data validation, but will leave to future
	const task = Task.addTask({ description });
	return res.json(task);
	// return res.status(201).json(task);
}

/**
 * @swagger
 * /tasks:
 *   get:
 *    summary: Return all tasks
 *    tags: [Tasks]
 *    parameters:
 *      - name: description
 *        in: query
 *        description: filter tasks by description
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The array of tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 *
 */
// task 1.1 get all tasks (allow query params for filtering)
function getAllTask(req, res) {
	const { description } = req.query;
	const tasks = Task.getAllTask({ description });
	return res.json(tasks);
}

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *    summary: Get task by id
 *    tags: [Tasks]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: task id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The task by id
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Task'
 *      404:
 *        description: Task not found
 *
 */
//task 1.2 get task by id
function getTaskById(req, res) {
	const { id } = req.params;
	const task = Task.getTaskById(id);//注：不要带大括号。
	return res.json(task);
}

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *    summary: Update a task
 *    tags: [Tasks]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: task id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The task successfully updated
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Task'
 *      404:
 *        description: Task not found
 *
 */
//task 1.3 update task by id (BODY CAN INCLUDE description & done)
function updateTaskById(req, res) {
	const { id } = req.params;
	const { description, done } = req.body;
	const task = Task.updateTaskById(id, { description, done });
	return res.json(task);
}

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *    summary: Delete a task
 *    tags: [Tasks]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: task id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: The task successfully deleted
 *      404:
 *        description: Task not found
 *
 */
//task1.5 delete task by id
function deleteTaskById(req, res) {
	const { id } = req.params;
	Task.deleteTaskById(id);
	return res.sendStatus(204);
}

module.exports = {
	getAllTask,
	getTaskById,
	updateTaskById,
	deleteTaskById,
	addTask,
};
