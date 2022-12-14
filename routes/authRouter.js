const Router = require('express')
const router = new Router()
const contoller = require('../controllers/authController')
const { check } = require('express-validator')

router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('email', 'Почта не должна быть пустой').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 30 символов').isLength({ min: 4, max: 30 })
], contoller.registration)
router.post('/login', contoller.login)
router.get('/users', contoller.getAllUsers)
router.get('/user', contoller.getOneUser)
router.get('/user/:id', contoller.getOneUserById)
router.put('/user/:id', contoller.changeUserInfo)

module.exports = router