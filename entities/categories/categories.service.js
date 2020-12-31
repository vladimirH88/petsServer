const Categories = require('./categories.model');

class CategoryService {
    async addCategory(name) {
        return Categories.create({ name })
            .catch((err) => {
                console.log(err);
                return null
            });
    };

    async deleteCategory(id) {
        return Categories.destroy({ where: { id } })
            .catch(err => console.log(err));
    };

    async updateCategory(category) {
        return Categories.update(category, { where: { id: category.id } })
            .then(res => res)
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    async getCategories() {
        return Categories.findAll({ raw: true })
            .then(category => category)
            .catch(() => null);
    }
};

module.exports = new CategoryService();
