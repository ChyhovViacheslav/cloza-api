const Router = require('express')
const router = new Router()
const controller = require('../controllers/productController')

router.post('/', controller.addProduct)
router.get('/', controller.getProducts)
router.get('/:id', controller.getProduct)
router.put('/', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)

module.exports = router