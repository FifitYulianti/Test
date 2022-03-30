const userController = require ('../controllers/User')

const router = require('express').Router()

router.get('/', userController.getAllUser)
router.get('/:id', userController.getOneUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router