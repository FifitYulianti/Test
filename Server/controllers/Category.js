const { User, Item, Category, Ingredient } = require('../models')

module.exports = class CategoryController {

    static getAllCategory(req, res, next) {
        Category.findAll()
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
    static getOneCategory(req, res, next) {
        const id = req.params.id
        Category.findByPk(id)
            .then(data => {
                if (data === null) {
                    res.status(404).json({
                        message: `Data Category with id ${id} not found`
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static createCategory(req, res, next) {
        const { name } = req.body
        Category.create({ name })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if(err.name === 'SequelizeValidationError'){
                    res.status(400).json({
                        message: err.message
                    })
                }else{
                    next(err)
                }
            })
    }
    static updateCategory(req, res, next) {
        const id = req.params.id
        const { name } = req.body
        Category.update({ name }, { where: { id } })
            .then(data => {
                if (data[0] === 0) {
                    res.status(404).json({
                        message: `Category with id ${id} not found`
                    })
                } else {
                    res.status(201).json({
                        message: `Category with id ${id} Updated`
                    })
                }
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    res.status(400).json({
                        message: err.message
                    })
                } else {
                    next(err)
                }
            })
    }
    static deleteCategory(req, res, next) {
        const id = req.params.id
        Category.destroy({ where: { id } })
            .then(data => {
                if (data === 0) {
                    res.status(404).json({
                        message: `Category with id ${id} not found`
                    })
                } else {
                    res.status(200).json({
                        message: `Category with id ${id} Deleted`
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}