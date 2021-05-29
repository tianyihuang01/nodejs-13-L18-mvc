const { getTaskById } = require("../models/task");
//task 1.2 1.3 1.5
module.exports = function checkTaskExist(req, res, next) {
	const { id } = req.params;
	const task = getTaskById(id);
	if (!task) {
		return res.sendStatus(404);
	}
	next();
};
