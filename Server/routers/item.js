const itemController = require ('../controllers/Item')

const router = require('express').Router()

router.get('/', itemController.getAllItem)
router.post('/', itemController.createItem)
router.get('/:id', itemController.getOneItem)
router.put('/:id', itemController.updateItem)
router.delete('/:id', itemController.deleteItem)

module.exports = router