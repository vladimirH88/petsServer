const Post = require('./post.model');

class PostService {
    async getAllPosts(param, direction, pageSize, pageNumber, filter) {
        const offset = pageNumber * pageSize - pageSize;
        return Post.findAndCountAll({
            raw: true,
            order: [[param, direction]],
            limit: +pageSize,
            offset,
            where: { ...filter, isAgreed: true }
        })
            .then(posts => ({
                data: posts.rows,
                totalItems : posts.count,
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
            .then(res => res)
            .catch(err => console.log(err));
    };

    async getProfilePostList(userId, isActive) {
        return Post.findAll({ where: { createrId: userId, isAgreed: isActive === 'true' ? true : false }, row: true })
            .then(posts => posts)
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    async updatePost(post) {
        console.log(post.post);
        return Post.update(post, { where: { id: post.id } })
            .then(res => {
                console.log(res);
            return res
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    async deletePost(postId) {
        return Post.destroy({ where: { id: postId } })
            .catch(err => console.log(err));
    };


    //admin
    async getNotAgreedPosts(pageSize, pageNumber) {
        const offset = pageNumber * pageSize - pageSize;
        const totalItems = await Post.count()
        return Post.findAll({
            raw: true,
            limit: +pageSize,
            offset,
            where: { isAgreed: false }
        })
            .then(posts => ({
                data: posts,
                totalItems,
                pageNumber,
                pageSize,
            }))
            .catch(err => new Error(err));
    };

    async approvePost(id) {
        return Post.update({ isAgreed: true }, { where: { id } })
            .then(res => res)
            .catch(err => {
                console.log(err);
                return null;
            });
    };
};

module.exports = new PostService();
