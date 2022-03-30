const { User, Item, Category, Ingredient } = require('../models')

module.exports = class IngredientController {

    static getAllIngredient(req, res, next) {
        Ingredient.findAll({
            include: [{ model: Item, include: [{ model: User, model: Category }] }]
        })
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
    static getOneIngredient(req, res, next) {
        const id = req.params.id
        Ingredient.findByPk(id)
            .then(data => {
                if (data === null) {
                    res.status(404).json({
                        message: `Data Ingredient with id ${id} not found`
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static createIngredient(req, res, next) {
        const { itemId, name } = req.body
        Ingredient.create({ itemId, name })
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
    static updateIngredient(req, res, next) {
        const id = req.params.id
        const { itemId, name } = req.body
        Ingredient.update({ itemId, name }, { where: { id } })
            .then(data => {
                if (data[0] === 0) {
                    res.status(404).json({
                        message: `Ingredient with id ${id} not found`
                    })
                } else {
                    res.status(201).json({
                        message: `Ingredient with id ${id} Updated`
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
    static deleteIngredient(req, res, next) {
        const id = req.params.id
        Ingredient.destroy({ where: { id } })
            .then(data => {
                if (data === 0) {
                    res.status(404).json({
                        message: `Ingredient with id ${id} not found`
                    })
                } else {
                    res.status(200).json({
                        message: `Ingredient with id ${id} Deleted`
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}