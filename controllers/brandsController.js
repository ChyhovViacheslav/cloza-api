const Brands = require('../models/Brands')

class brandsController {
    async getBrands(req, res) {
        try {
            const page = req.query.page || 1
            const perpage = req.query.limit || 12
            const searchTerm = req.query.search || ''

            const brands = await Brands.find()

            let newBrands = brands[0].brands

            const checkedQuqery = (query) => {
                if (query === undefined || query === 'undefined') {
                    return brands[0].brands
                } else {
                    if (!searchTerm) {
                        return brands[0].brands.slice(((page - 1) * perpage) + 1, parseInt(perpage * page) + 1)
                    } else {
                        const filtredBrands = brands[0].brands.filter((el) => {
                            return el.toLowerCase().includes(searchTerm.toLowerCase())
                        })

                        newBrands = filtredBrands

                        return filtredBrands.slice(((page - 1) * perpage) + 1, parseInt(perpage * page) + 1)
                    }
                }
            }

            return res.json({
                brands: checkedQuqery(perpage),
                currentPage: page,
                totalPages: Math.ceil(newBrands.length / perpage),
                totalBrands: newBrands.slice(1).length
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error getting brands' })
        }
    }
}

module.exports = new brandsController()