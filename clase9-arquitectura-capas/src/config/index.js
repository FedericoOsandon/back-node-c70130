const { connect } = require('mongoose')
const dotenv      = require('dotenv')
const { program } = require('../utils/commander')
// import dotenv from 'dotenv'

const { mode } = program.opts()
// console.log(mode)
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production' 
})

console.log('variable nombre: ',process.env.NOMBRE)

exports.configObject = {
    port:        process.env.PORT || 8080,
    private_key: process.env.PRIVATE_KEY
}



module.exports.connectDB = async () => {
    console.log('Base de datos conectada')
    // return await connect('mongodb+srv://Federico:Federico1**@cluster0.r3sreep.mongodb.net/c70125?retryWrites=true&w=majority&appName=Cluster0')
    return await connect(process.env.MONGO_URL)
}

