/**
 * {
 *    id: number,
 *    description: string,
 *    done: boolean
 * }
 */
const tasks = [];
let id = 1;

//task 1.4 create a new task (add descritpion value ONLY)
function addTask({ description }) {
	const task = { id: id++, description, done: false };
	tasks.push(task);
	return task;
}

// task 1.1 get all tasks (allow query params for filtering)
function getAllTask({ description }) {
	if (description) {
		const filteredTasks = tasks.filter((i) =>
			i.description.includes(description)
		);
		return filteredTasks;
	}
	return tasks;
}

//task 1.2 get task by id
function getTaskById(id) {
	return tasks.find((i) => i.id === id);
}

//task 1.3 update task by id (BODY CAN INCLUDE description & done)
function updateTaskById(id, { description, done }) {
	const task = getTaskById(id);
	if (done !== undefined) {
		task.done = !!done;
	}
	if (description) {
		task.description = description;
	}
	return task; //注：这里的思路与拆分前的有差异，这里是直接更改原task的属性，拆分前的版本是新建task再替换。
}

//task1.5 delete task by id
function deleteTaskById(id) {
	let taskIndex = getTaskIndexById(id);
	tasks.splice(taskIndex, 1); // 1代表只删除一个元素。
}

function getTaskIndexById(id) {
	return tasks.findIndex((i) => i.id === id);
}

module.exports = {
	getAllTask,
	getTaskById,
	updateTaskById,
	deleteTaskById,
	addTask,
};
