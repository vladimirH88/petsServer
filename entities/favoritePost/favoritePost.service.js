const FavoritesPosts = require('./favotiesPost.model');

class FavoritePostService {
    async addToFavorites(userId, postId) {
        return FavoritesPosts.create({ userId: userId, postId: postId })
            .catch(() => null);
    };

    async removeFromFavorites(userId, postId) {
        return FavoritesPosts.destroy({ where: { userId, postId } })
            .catch(() => null);
    };

    async getFavoritePosts(userId) {
        const sql = (
            `SELECT id, createrId, briefDescription, category, description,price, phone, region, city, filingDate, numberOfViews, image 
            FROM posts 
            JOIN favorite_posts 
            ON favorite_posts.userId=? 
            AND favorite_posts.postId=posts.id`
        );
        return FavoritesPosts.sequelize.query(sql, { replacements: [userId], type: FavoritesPosts.sequelize.QueryTypes.SELECT })
            .catch(() => null);
    };

    async getFavoritePostIds(userId) {
        const sql = 'SELECT id FROM posts JOIN favorite_posts ON favorite_posts.userId=? AND favorite_posts.postId=posts.id';
        return FavoritesPosts.sequelize.query(sql, { replacements: [userId], type: FavoritesPosts.sequelize.QueryTypes.SELECT })
            .then((data) => {
                const ids = data.map(item => item.id);
                return ids;
            })
            .catch(() => null);
    }
};

module.exports = new FavoritePostService();
