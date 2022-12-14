const Router = require('express')
const router = new Router()
const controller = require('../controllers/reviewController')

router.post('/', controller.addReview)
router.get('/', controller.getAllReviews)

module.exports = router