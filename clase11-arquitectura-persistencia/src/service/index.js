
const { ProductDao } = require("../daos/factory")
const ProductRepository = require("../repositories/products.repository")




const userService    = new UserDaoMongo()
const productService = new ProductRepository(new ProductDao())


module.exports = {
    userService,
    productService
}