module.exports = {
	responseSuccess: (response, data, status = 200) => {
		response.status(status);
		response.json({
			success: true,
			data: data,
		});
	},
	responseFailure: (response, error = '', status = 400) => {
		response.status(status);
		response.json({
			success: false,
			error: error,
		});
	},
	responseError: (response, error = 'Internal exception', status = 500) => {
		response.status(status);
		response.json({
			success: false,
			error: error,
		});
	}
};
