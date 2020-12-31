const regionService = require('./regions.service');
const response = require('../../services/response.service');

class RegionsController {
    async addRegion(req, res) {
        if (req.body.name) {
            const result = await regionService.addRegion(req.body.name);
            if (result) {
                return response.responseSuccess(res);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };

    async updateRegion(req, res) {
        const result = await regionService.updateRegion(req.body);
        if (result) {
            return response.responseSuccess(res);
        }
        response.responseError(res);
    };

    async deleteRegion(req, res) {
        if (req.query.id) {
            const result = await regionService.deleteRegion(req.query.id);
            if (result) {
                return response.responseSuccess(res);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };

    async getRegions(req, res) {
        const regions = await regionService.getRegions();
        if (regions) {
            return response.responseSuccess(res, regions);
        }
        response.responseError(res);
    };
};

module.exports = new RegionsController();
