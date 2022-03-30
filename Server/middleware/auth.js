const jwt = require('jsonwebtoken')
const {User, Item, Ingredient, Category} = require('../models')

const authentication = (req, res, next) => {
    if (!req.headers.access_token) {
        next({
            status: 401,
            message: "Missing Access Token"
        })
    }
    try {
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET);
        User.findByPk(decoded.id)
            .then((user) => {
                if (user) {
                    req.id = user.id
                    req.role = user.role
                    next()
                } else {
                    next({ status: 404, message: "Broken Access Token" })
                }
            })
    }
    catch (err) {
        next(err)
    }
}
const authorizeAdmin = (req, res, next) =>{
    if(req.role === 'admin'){
        next()
    } else {
        return next({ status: 403, message: `Forbidden!` })
    }
}

module.exports = {authentication, authorizeAdmin}