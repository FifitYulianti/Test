const itemController = require ('../controllers/Item')

const router = require('express').Router()

router.get('/', itemController.getAllItem)
router.get('/:id', itemController.getOneItem)

module.exports = router