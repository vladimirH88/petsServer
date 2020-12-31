const Regions = require('./regions.model');

class RegionService {
    async addRegion(name) {
        return Regions.create({ name })
            .catch((err) => {
                console.log(err);
                return null
            });
    };

    async deleteRegion(id) {
        return Regions.destroy({ where: { id } })
            .catch(err => console.log(err));
    };

    async updateRegion(region) {
        return Regions.update(region, { where: { id: region.id } })
            .then(res => res)
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    async getRegions() {
        return Regions.findAll({ raw: true })
            .then(regions => regions)
            .catch(() => null);
    }
};

module.exports = new RegionService();
