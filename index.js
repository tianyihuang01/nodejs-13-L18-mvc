const express = require("express");

const app = express();

//只有加了这一行，req.body才能取数据。
app.use(express.json());

const router = express.Router();

/**
 * {
 *    id: number,
 *    description: string,
 *    done: boolean
 * }
 */
// const tasks =[{description: "task 1"}];
const tasks = [];
// const tasks = [
// 	{
// 		id: 1,
// 		description: "task 1.0",
// 		done: false,
// 	},
// 	{
// 		id: 2,
// 		description: "task 2.0",
// 		done: false,
// 	},
// ];
let id = 1;

app.use(cors);

// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

// push, pop, unshift, shift
// splice 进行中间删除或添加的时候
// slice 是取subarray
// find, findIndex, filter, map, some, reduce

//task 1.4 create a new task (add descritpion value ONLY)
router.post("/tasks", (req, res) => {
	// res.send(req.body);
	// res.send("done");
	const { description } = req.body;
	const task = { id: id++, description, done: false };
	tasks.push(task);
	return res.json(task);
	// res.send(task);
	// console.log(id);//注意：上方id++不会改变当行的id，但会改变之后的id.
	// task.push(req.body);
});

// task 1.1 get all tasks (allow query params for filtering)
router.get("/tasks", (req, res) => {
	const { description } = req.query; // query是可选的，下发有if判断。
	if (description){
		const filteredTasks = tasks.filter((i) => 
			i.description.includes(description)
		);
		return res.json(filteredTasks);
	}
	return res.json(tasks);
	// res.send(task);
});

//task 1.2 get task by id
router.get("/tasks/:id", (req, res) => {
	const { id } = req.params;
	const task = tasks.find((i) => i.id === Number(id));
	if (!task) {
		return res.sendStatus(404);
	}
	return res.json(task);
	// return res.send(task);
	// res.send(id);
});

//task 1.3 update task by id (BODY CAN INCLUDE description & done)
router.put("/tasks/:id", (req, res) => {
	const { id } = req.params;
	const { description, done } = req.body;

	let task = tasks.find((i) => i.id === Number(id));
	if(!task) {
		return res.sendStatus(404);
	}

	const newTask = {
		id: Number(id),
		description: description || task.description, //a为True, 显示a的值。a为False, 显示b的值。
		done: !!done || task.done
	};
	const taskIndex = tasks.findIndex((i) => i.id === Number(id));
	// console.log(taskIndex);
	// console.log(tasks)
	tasks[taskIndex] = newTask;
	return res.json(newTask);
	// return res.send(newTask);
});

//task1.5 delete task by id
router.delete("/tasks/:id", (req, res) => {
	const { id } = req.params;

	let taskIndex = tasks.findIndex((i) => i.id === Number(id));
	// console.log(taskIndex);
	if (taskIndex === -1) {
		return res.sendStatus(404);
	}
	tasks.splice(taskIndex, 1); // 1代表只删除一个元素。
	return res.sendStatus(204);
});

app.use(router);

app.listen(3000, () => {
	console.log("localhost server listening on port 3000!");
});

// task2. Add some headers in your server to solve the CORS issue.
function cors(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	next();
}
