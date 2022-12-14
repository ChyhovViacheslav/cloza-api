const { Router } = require("express");
const router = new Router()
const controller = require('../controllers/categoriesController')

router.get('/', controller.getBrands)

module.exports = router