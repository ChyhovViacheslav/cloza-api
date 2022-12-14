const {Schema, model} = require('mongoose')

const Order = new Schema({
    name: {type: String, require: true},
    phone: {type: String, require: true},
    address: {type: String, require: true},
    city: {type: String, require: true},
    index: {type: Number, require: true},
    products: {type: Array, require: true},
    orderTime: {type: String, require: true},
    email: {type: String, require: true},
    paymentType: {type: String, require: true},
    deliveryType: {type: String, require: true},
    costOfDelivery: {type: Number, require: true},
    costOfAllProducts: {type: Number, require: true},
    comment: {type: String, require: true},
    delivered: {type: Boolean, require: true},
    paid: {type: Boolean, require: true}
})

module.exports = model('Order', Order)