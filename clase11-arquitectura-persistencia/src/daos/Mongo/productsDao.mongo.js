const { ProductModel } = require("./models/product.model")



class ProductDaoMongo {
    constructor(){
        this.product = ProductModel        
    }

    async get({limit=10, page=1, category='', sort=1}){       
                        
        return await this.product.paginate(category.length!==0 ? {category: category} : {}, { limit, page, lean: true, sort: {price: sort}})                                
        
    }

    async getBy(filter){        
        return await this.product.findOne(filter).lean()        
    }


    async create(newProduct){        
        return await this.product.create(newProduct)  
        
    }

    async update(pid, updateProduct){        
        return await this.product.findByIdAndUpdate({_id: pid}, updateProduct, {new: true})        
    }

    async delete(pid){       
        return await this.product.findByIdAndUpdate({ _id: pid }, { isActive: false }, {new: true})        
    }

}

module.exports = ProductDaoMongo
