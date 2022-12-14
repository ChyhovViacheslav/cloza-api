const Router = require('express')
const router = new Router()
const controller = require('../controllers/orderController')

router.post('/', controller.createOrder)

module.exports = router