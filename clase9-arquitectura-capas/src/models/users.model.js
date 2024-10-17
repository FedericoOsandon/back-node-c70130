const { Schema, model } = require('mongoose')

const userCollection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String,
        
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        enum: ['user', 'user-premium', 'admin'],
        default: 'user'
    },
    cartID: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    }

})

const userModel = model(userCollection, userSchema)

module.exports = {
    userModel
} 