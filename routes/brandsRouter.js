const Router = require('express')
const router = new Router()
const controller = require('../controllers/brandsController')

router.get('/', controller.getBrands)

module.exports = router