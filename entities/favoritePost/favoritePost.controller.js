const favoritePostService = require('./favoritePost.service');
const response = require('../../services/response.service');

class FavoritePostController {
    async addToFavorites(req, res) {
        if (req.body.userId && req.body.postId) {
            const result = await favoritePostService.addToFavorites(req.body.userId, req.body.postId);
            if (result) {
                return response.responseSuccess(res);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };

    async removeFromFavorites(req, res) {
        if (req.query.userId && req.query.postId) {
            const result = await favoritePostService.removeFromFavorites(req.query.userId, req.query.postId);
            if (result) {
                return response.responseSuccess(res);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };

    async getFavoritePosts(req, res) {
        if (req.query.userId) {
            const posts = await favoritePostService.getFavoritePosts(req.query.userId);
            if (posts) {
                return response.responseSuccess(res, posts);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };

    async getFavoritePostIds(req, res) {
        if (req.query.userId) {
            const posts = await favoritePostService.getFavoritePostIds(req.query.userId);
            if (posts) {
                return response.responseSuccess(res, posts);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };
};

module.exports = new FavoritePostController();
