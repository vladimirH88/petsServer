const postService = require('./post.service');
const response = require('../../services/response.service');

class PostController {
    async getAllPosts(req, res) {
        const { param, direction, pageSize, pageNumber, ...filter } = req.query;
        try {
            const data = await postService.getAllPosts(param, direction, pageSize, pageNumber, filter);
            response.responseSuccess(res, data);
        } catch (e) {
            response.responseError(res, e);
        }
    };

    async getPostById(req, res) {
        if (req.query.id) {
            try {
                const post = await postService.getPostById(req.query.id);
                if (post) {
                    return response.responseSuccess(res, post);
                }
            } catch (e) {
                response.responseFailure(res, e);
            }
        } else {
            response.responseFailure(res);
        }
    };

    async createPost(req, res) {
        const result = await postService.createPost(req.body.post);
        if (result) {
            return response.responseSuccess(res);
        }
        response.responseError(res);
    };

    async getProfilePostList(req, res) {
        if (req.query.id) {
            const posts = await postService.getProfilePostList(req.query.id);
            if (posts) {
                return response.responseSuccess(res, posts);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };

    async updatePost(req, res) {
        const result = await postService.updatePost(req.body);
        if (result) {
            return response.responseSuccess(res);
        }
        response.responseError(res);
    };

    async deletePost(req, res) {
        if (req.query.postId) {
            const result = await postService.deletePost(req.query.postId);
            if (result) {
                return response.responseSuccess(res);
            }
            response.responseError(res);
        } else {
            response.responseFailure(res);
        };
    };
};

module.exports = new PostController();
