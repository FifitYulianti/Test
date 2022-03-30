const ingredientController = require ('../controllers/Ingredients')

const router = require('express').Router()

router.get('/', ingredientController.getAllIngredient)
router.post('/', ingredientController.createIngredient)
router.get('/:id', ingredientController.getOneIngredient)
router.put('/:id', ingredientController.updateIngredient)
router.delete('/:id', ingredientController.deleteIngredient)

module.exports = router