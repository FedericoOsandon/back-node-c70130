const { Router } = require('express')

const ProductController = require('../controllers/products.controllers')
// import { Router }  from 'express'

const router = Router()
// estoy usando la capa de persistencia - instancia de persistencia
const {
    getProducts,
    createProducts,
    getProduct
} = new ProductController()

router.get('/', getProducts)
router.post('/', createProducts)
router.get('/:pid', getProduct)


module.exports = router
// export default router
// export router