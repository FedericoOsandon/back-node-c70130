const fs = require('fs')
const path = './dbjson/productsDb.json'


class ProductsDaoFs { 
    constructor(){        
        this.path = path
    }


    readPRoducts = async () => {
        if(fs.existsSync(path)){
            const productsJson = await fs.promises.readFile(path, 'utf-8')
            const productsJs = JSON.parse(productsJson)
            return productsJs
        } 
        return []        
    }

    // crud productos
    get  = async () => {
        const products =  await this.readPRoducts()
        return products
    }

    getBy  = async (filter) => {}
    
    create = async newProduct => {
        try {
            const products = await this.readPRoducts()
            // [1, 3, 4] -> 2 + 1 = 3
            if(products.length === 0){
                newProduct.id = 1
            } else {
                newProduct.id = products[products.length-1].id + 1
            }
            products.push(newProduct)
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    update = async () => {}
    delete = async () => {}
}

module.exports = ProductsDaoFs