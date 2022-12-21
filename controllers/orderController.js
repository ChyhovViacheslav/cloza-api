const Order = require('../models/Order')

class orderController {
    async createOrder(req, res){
        try {
            const order = new Order(req.body)
            await order.save()
            return res.json({message: 'Order successfully created!'})
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error creating order!'})
        }
    }
}

module.exports = new orderController()