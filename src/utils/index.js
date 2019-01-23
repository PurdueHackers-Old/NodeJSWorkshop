const success = (res, response) => {
	return res.send({
		response
	});
};

const failure = (res, status, error) => {
	return res.status(status).send({
		error
	});
};

module.exports = {
	success,
	failure
};
