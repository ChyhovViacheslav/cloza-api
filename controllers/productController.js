const Product = require('../models/Product')

class productController {
    async addProduct(req, res) {
        try {
            const product = new Product(req.body)
            await product.save()
            return res.json({ message: 'Product added successfully' })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error adding product' })
        }
    }
    async getProducts(req, res) {
        try {
            const emptyField = req.query.emptyField || 'false'
            const page = req.query.page || 1
            const perpage = req.query.limit || 15
            const sortByPrice = req.query.sortByPrice
            const queryPrice = req.query.price
            const queryDiscount = req.query.discount
            const minPrice = queryPrice === undefined ? null : parseInt(queryPrice.toString().split('-')[0])
            const maxPrice = queryPrice === undefined ? null : parseInt(queryPrice.toString().split('-')[1]) + 1

            const chekedQuery = (query) => {
                if (query === undefined || query === 'undefined') {
                    return { "$exists": true }
                } else return query
            }

            const filters = {
                _id: chekedQuery(req.query.id),
                size: chekedQuery(req.query.size),
                condition: chekedQuery(req.query.condition),
                color: chekedQuery(req.query.colors),
                brand: chekedQuery(req.query.brands),
                subCategory: chekedQuery(req.query.subcategory),
                mainCategory: chekedQuery(req.query.maincategory),
                discount: queryDiscount === 'undefined' 
                ? { "$exists": true } : { "$gt": minPrice, "$lt": maxPrice },
                "saler.email": chekedQuery(req.query.salerEmail),
                price: queryPrice === undefined 
                ? { "$exists": true } : { "$gt": minPrice, "$lt": maxPrice }
            }

            const products = await Product
                .find(emptyField === 'true' ? {_id: {"$exists": false}} : filters)
                .sort(sortByPrice === '0' ? null : { price: parseInt(sortByPrice) })
                .skip(page > 0 ? ((page - 1) * perpage) : 0)
                .limit(perpage)

            const productLength = await Product
                .find(filters)
                .sort(sortByPrice === '0' ? null : { price: parseInt(sortByPrice) })

            res.json({ 
                products: perpage === '999' ? productLength : products, 
                currentPage: page, 
                totalPages: Math.ceil(productLength.length / perpage), 
                totalProducts: productLength.length 
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error getting products'})
        }
    }
    async getProduct(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ message: 'ID not specified' })
            }
            const product = await Product.findById(id)
            return res.json(product)
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error getting product'})
        }
    }
    async updateProduct(req, res) {
        try {
            const product = req.body
            if (!product._id) {
                res.status(400).json({ message: 'ID not specified' })
            }
            const updatedPost = await Product.findByIdAndUpdate(product._id, product, { new: true })
            return res.json({ message: 'Product updated successfully' })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error updating product' })
        }
    }
    async deleteProduct(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ message: 'ID not specified' })
            }
            const product = await Product.findByIdAndDelete(id)
            return res.json(product)
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error deleting product'})
        }
    }
}

module.exports = new productController()