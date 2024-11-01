class ProductRepository {
    constructor(dao){
        this.dao = dao
    }
    getProducts  = async () => await this.dao.get()
    getProduct   = async filter => await this.dao.getBy(filter)
    creteProduct = async newProduct => await this.dao.create(newProduct) 
}

// este clase maneja el dao y dto

module.exports = ProductRepository