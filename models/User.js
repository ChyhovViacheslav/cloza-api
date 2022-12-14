const { Schema, model } = require('mongoose')

const User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roles: [{ type: String, ref: 'Role' }],
    image: { type: String, required: false },
    rating: { type: Number, required: false},
    votes: {type: Number, required: false},
    wishlist: {type: Array, require: false},
    cartlist: {type: Array, require: false},
    delivery_info: {type: Array, require: false},
    registerDate: {type: String, require: true}
})

module.exports = model('User', User)