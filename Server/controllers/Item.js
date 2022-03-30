const { User, Item, Category, Ingredient, sequelize } = require('../models')
var {Op}= require('sequelize');

module.exports = class ItemController {

    static getAllItem(req, res, next) {
        Item.findAll({ include: [Category, User, Ingredient] })
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
    static getOneItem(req, res, next) {
        let id = req.params.id
        Item.findByPk(id, { include: [Category, User, Ingredient] })
            .then(data => {
                if (data === null) {
                    res.status(404).json({
                        message: `Data Item with id ${id} not found`
                    })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static async createItem(req, res, next) {
        const { name, description, price, imgUrl, categoryId, ingredient } = req.body
        let authorId = req.id || req.body.authorId
        const t = await sequelize.transaction()
        try{
            const item = await Item.create({ name, description, price, imgUrl, authorId, categoryId, ingredient }, {transaction:t})
            const ingredients = await Ingredient.create({itemId: item.id, name:req.body.ingredient}, {transaction:t})
            await t.commit()
            res.status(201).json({item, ingredients})
        }
        catch(err){
            await t.rollback()
            if(err.name === 'SequelizeValidationError'){
                res.status(400).json({
                    message: err.message
                })
            }else{
                next(err)
            }
        }

    }
    static updateItem(req, res, next) {
        let id = req.params.id
        const { name, description, price, imgUrl, categoryId } = req.body
        let authorId = req.id
        Item.update({ name, description, price, imgUrl, authorId, categoryId }, {where : {id}})
            .then(data => {
                if(data[0] === 0){
                    res.status(404).json({
                        message: `Item with id ${id} not found`
                    })
                } else {
                    res.status(201).json({
                        message : `Item with id ${id} Updated`
                    })
                }
            })
            .catch(err =>{
                if(err.name === 'SequelizeValidationError'){
                    res.status(400).json({
                        message: err.message
                    })
                }else{
                    next(err)
                }
            })
    }
    static deleteItem(req, res, next) {
        const id = req.params.id
        Item.destroy({where : {id}})
        .then(data =>{
            if(data === 0){
                res.status(404).json({
                    message: `Item with id ${id} not found`
                })
            } else {
                res.status(200).json({
                    message: `Item with id ${id} Deleted`
                })
            }
        })
        .catch(err =>{
            next(err)
        })
    }
}