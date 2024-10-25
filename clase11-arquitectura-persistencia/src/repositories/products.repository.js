class ProductRepository {
    constructor(dao){
        this.dao = dao
    }

    createProduct = newProduct => {}
    getProduct = async filter => {
        const user =  await this.dao.getBy(filter)
        // const userDto = new UserDto(user)
        return user
    }
    getProducts = async () => {
        return await this.dao.get()
    } 
    updateProduct = (id, productToUpdate) => {}
    deleteProduct = id => {}
}
module.exports = ProductRepository