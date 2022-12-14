const { Schema, model } = require('mongoose')

const Categories = new Schema({
    top: [
        {type: String}
    ],
    bottom: [
        {type: String}
    ],
    shoes: [
        {type: String}
    ],
    accessories: [
        {type: String}
    ]
})

module.exports = model('Categories', Categories)