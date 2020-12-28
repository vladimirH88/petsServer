const Post = require('./post.model');
const fs = require("fs");
const { post } = require('../../routes/private');

class PostService {
    async getAllPosts(param, direction, pageSize, pageNumber, filter) {
        const offset = pageNumber * pageSize - pageSize;
        const totalItems = await Post.count()
        return Post.findAll({
            raw: true,
            order: [[param, direction]],
            limit: +pageSize,
            offset,
            where: filter
        })
            .then(posts => ({
                data: posts,
                totalItems,
                pageNumber,
                pageSize,
            }))
            .catch(err => new Error(err));
    };

    incrementNumberOfViews(post) {
        Post.update({ numberOfViews: post.numberOfViews + 1 }, { where: { id: post.id } });
    };

    getPostById(postId) {
        return Post.findOne({ where: { id: postId } })
            .then(post => {
                if (post) {
                    this.incrementNumberOfViews(post);
                }
                return post;
            })
            .catch(err => console.log(err));
    };

    async createPost(newPost) {
        const { image, ...post } = newPost;
        return Post.create(post)
            .then(res => {
                const data = { "postId": res.id, "images": image }
                fs.appendFile("postImages.json", JSON.stringify(data) + ',\n', function (error) {
                    if (error) throw error;
                });
                return res;
            })
            .catch(err => console.log(err));
    };

    async getProfilePostList(userId) {
        return Post.findAll({ where: { createrId: userId }, row: true })
            .then(posts => posts)
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    async updatePost(post) {
        return Post.update(post, { where: { id: post.id } })
            .then(res => res)
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    async deletePost(postId) {
        return Post.destroy({ where: { id: postId } })
            .catch(err => console.log(err));
    };
};

module.exports = new PostService();
