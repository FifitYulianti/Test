const jwt = require('jsonwebtoken')
const { User, Item, Category, Ingredient } = require('../models')
const { decrypt } = require('../helpers/bycrypt')

module.exports = class UserController {

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then(data => {
                if (data === null) {
                    next({ status: 401, message: "Invalid email/password!" })
                }
                let validate = decrypt(password, data.password)
                if (data && validate) {
                    const access_token = jwt.sign({ id: data.id, username: data.username, role: data.role, address: data.address }, process.env.JWT_SECRET)
                    res.status(200).json({ success: true, message: "login berhasil", access_token });
                } else {
                    next({ status: 401, message: "Invalid email/password!" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static register(req, res, next) {
        const { username, email, password, phoneNumber, role, address } = req.body
        User.create({ username, email, password, phoneNumber, role, address })
            .then(_ => {
                res.status(200).json({
                    success: true, message: 'Register Success'
                })
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let validation = err.errors.map(el => el.message)
                    next({ status: 400, message: validation })
                } else if (err.name === 'SequelizeUniqueConstraintError') {
                    let contrainError = err.errors.map(element => element.message)
                    next({ status: 400, message: contrainError })
                } else {
                    next(err)
                }
            })
    }
    static updateUser(req, res, next) {
        const id = req.params.id
        const { username, email, password, role, phoneNumber, address } = req.body
        User.update({ username, email, password, role, phoneNumber, address },
            {
                where: { id: id }
            }
        )
            .then(data => {
                console.log(data);
                res.status(200).json({
                    message: "Update berhasil"
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static deleteUser(req, res, next) {
        const id = req.params.id
        User.destroy({ where: { id } })
            .then((data) => {
                if (data === 0) {
                    res.status(404).json({
                        message: `data with ${id} not found`
                    })
                } else {
                    res.status(200).json({
                        message: "success delete data"
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }
    static getAllUser(req,res,next){
        User.findAll()
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json(data)
                } else {
                    next({ status: 404, message: "Not Found Data" })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static getOneUser(req, res, next){
        const id = req.params.id
        User.findByPk(id)
            .then(data => {
                if (data === null) {
                    res.status(404).json({
                        message: `Data User with id ${id} not found`
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }
}