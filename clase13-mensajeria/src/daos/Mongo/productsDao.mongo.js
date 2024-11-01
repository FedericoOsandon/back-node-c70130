const { productModel } = require("./models/products.model.js")

class ProductDaoMongo {
    constructor(){
        this.model = productModel
    }

    get    = async () => await this.model.find({})
    getBy  = async filter => await this.model.findOne(filter)
    create = async newProduct => await this.model.create(newProduct)
}

module.exports = ProductDaoMongo