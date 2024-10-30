const { configObject, connectDB } = require("../config");

let ProductDao

switch (configObject.persistence) {
    case 'FILESYSTEM':
        const ProductDaoFs = require('./FileSystem/productsDaoFs.js')
        ProductDao = ProductDaoFs
        break;
    case 'MEMORY':
        const ProductDaoMemory = require('./Memory/productsDaoMemory.js')
        ProductDao = ProductDaoMemory
        break;

    default:
        connectDB()
        // const ProductDaoMongo = await import('./Mongo/productsDao.mongo.js').default
        const ProductDaoMongo = require('./Mongo/productsDao.mongo.js') 
        ProductDao = ProductDaoMongo
        break;
}

module.exports = {
    ProductDao
}

// -> opcional para la entrega final