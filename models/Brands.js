const { Schema, model } = require('mongoose')

const Brands = new Schema({
    brands: Array
})

module.exports = model('Brands', Brands)
