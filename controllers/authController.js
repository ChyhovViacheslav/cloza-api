const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret, defaultImg } = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации', errors })
            }
            const { username, password, email, registerDate } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с такой почтой уже существует' })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ value: "USER" })
            const defaultAvatar = defaultImg

            const user = new User({
                email,
                username,
                password: hashPassword,
                roles: [userRole.value],
                image: defaultAvatar,
                wishlist: [],
                cartlist: [],
                delivery_info: [],
                registerDate
            })
            user.save()

            return res.json({
                username,
                email,
                image: user.image,
                wishlist: user.wishlist,
                cartlist: user.cartlist,
                delivery_info: user.delivery_info,
                _id: user._id,
                registerDate
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: `Пользователь с такой почтой не найден` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Введён неверный пароль` })
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({
                token,
                username: user.username,
                image: user.image,
                _id: user._id,
                wishlist: user.wishlist,
                cartlist: user.cartlist,
                delivery_info: user.delivery_info,
                registerDate: user.registerDate
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getOneUser(req, res) {
        try {
            const email = req.query.email
            const user = await User.findOne({ email })
            res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Error geting user" })
        }
    }

    async getOneUserById(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ message: 'ID не указан' })
            }
            const user = await User.findById(id)
            res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Error geting user" })
        }
    }

    async getAllUsers(req, res) {
        const page = req.query.page || 1
        const perpage = req.query.limit || 12

        const checkedQuqery = (query) => {
            if (query === undefined || query === 'undefined') {
                return { "$exists": true }
            } else return query
        }

        const checkedSort = (query) => {
            if (query === undefined || query === 'undefined' || query === '0') {
                return 0
            } else return query
        }

        try {
            const users = await User
                .find()
                .skip(page > 0 ? ((page - 1) * perpage) : 0)
                .limit(perpage)

            const usersLength = await User
                .find()

            res.json({
                users: perpage === '999' ? usersLength : users,
                currentPage: page,
                totalPages: Math.ceil(usersLength.length / perpage),
                totalUsers: usersLength.length
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Error geting users" })
        }
    }

    async changeUserInfo(req, res) {
        try {
            const { id } = req.params
            const { username, wishlist, image, cartlist, delivery_info } = req.body

            const user = await User.findById(id)

            if (user) {
                user.username = username || user.username,
                    user.wishlist = wishlist || user.wishlist,
                    user.cartlist = cartlist || user.cartlist,
                    user.delivery_info = delivery_info || user.delivery_info,
                    user.image = image || user.image
            }

            user.save()

            res.json({ message: 'Changed sucess!' })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authController()