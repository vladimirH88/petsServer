const categoryService = require('./categories.service');
const response = require('../../services/response.service');

class CategoriesController {
    async addCategory(req, res) {
        if (req.body.name) {
            const result = await categoryService.addCategory(req.body.name);
            if (result) {
                return response.responseSuccess(res);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };

    async updateCategory(req, res) {
        const result = await categoryService.updateCategory(req.body);
        if (result) {
            return response.responseSuccess(res);
        }
        response.responseError(res);
    };

    async deleteCategory(req, res) {
        if (req.query.id) {
            const result = await categoryService.deleteCategory(req.query.id);
            if (result) {
                return response.responseSuccess(res);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };

    async getCategories(req, res) {
        const category = await categoryService.getCategories();
        if (category) {
            return response.responseSuccess(res, category);
        }
        response.responseError(res);
    };
};

module.exports = new CategoriesController();
