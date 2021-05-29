//task 1.2 1.3 1.5
module.exports = function parseId(req, res, next) {
	let { id } = req.params;
	req.params.id = Number(id);
	next();
};
