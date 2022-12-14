const { Schema, model } = require('mongoose')

const Product = new Schema({
    saler: {
        email: {type: String, required: false},
        name: {type: String, required: false},
        id: {type: String, required: false}
    },
    name: { type: String, require: true, unique: true },
    condition: { type: String, require: true },
    mainCategory: { type: String, require: true },
    category: { type: String, require: true },
    subCategory: { type: String, require: true },
    brand: { type: String, require: true },
    size: { type: String, require: true },
    color: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    discount: { type: Number, require: false },
    amount: { type: Number, require: false },
    trade: { type: Boolean, require: true },
    mainImage: { type: String, require: true },
    additionalsPhotos: { type: Array, require: true },
    mainPhoto: { type: String, require: true },
    createdTime: {type: String, require: false}
})

module.exports = model('Product', Product)