const { Schema, model } = require('mongoose')
// import {} from 'mongoose'
// collección en la que guardaremos nuestro documentos
const userCollection = 'users'

//definir el esq de nuestros docs

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    }
})

const userModel = model(userCollection, userSchema)

module.exports = {
    userModel
}