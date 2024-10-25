const path = './dbjson/cartsDb.json'

class CartManagerFS {
    constructor(){
        this.path = path
    }
    readCart = async () => {
        try {
            const cartsJson = await fs.promises.readFile(path, 'utf-8')
            const cartsJs = JSON.parse(cartsJson)
            return cartsJs            
        } catch (error) {
            return []            
        }
        
    } 
    create          = async () => {}
    getBy         = async (filter) => {}
    addItem = () => {}
}

// [
//     {id: '', products: [ { productID: '', quantity: 1 } ]},
// ]