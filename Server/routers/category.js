const categoryController = require ('../controllers/Category')

const router = require('express').Router()

router.get('/', categoryController.getAllCategory)
router.post('/', categoryController.createCategory)
router.get('/:id', categoryController.getOneCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router