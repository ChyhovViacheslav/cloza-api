const Categories = require('../models/Categories')

class categoriesController {
    async getBrands (req, res) {
        try {
            const categories = await Categories.find()
            return res.json(categories)
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: 'Error getting brands'})
        }
    }
}

module.exports = new categoriesController()