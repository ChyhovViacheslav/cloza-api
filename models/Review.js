const {Schema, model} = require('mongoose')

const Review = new Schema({
    reviewerId: {type: String, require: true},
    userId: {type: String, require: true},
    description: {type: String, require: false},
    time: {type: String, require: true},
    rating: {type: Number, require: true}
})

module.exports = model('Review', Review)