const { connect } = require("mongoose")

class MongoSingleton {
    static #instance
    constructor(){
        connect('mongodb://127.0.0.1:27017/c70130')
    }

    static getInstance(){
        if(this.#instance){
            console.log('base de datos ya conectada')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log('base de datos conectada')
        return this.#instance
    }
}

module.exports = {
    MongoSingleton
}

