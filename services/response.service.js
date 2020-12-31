module.exports = {
	responseSuccess: (response, data, status = 200) => {
		response.status(status);
		response.json(data);
	},
	responseFailure: (response, error = '', status = 400) => {
		response.status(status);
		response.json(error);
	},
	responseError: (response, error = 'Internal exception', status = 500) => {
		response.status(status);
		response.json(error);
	}
};
