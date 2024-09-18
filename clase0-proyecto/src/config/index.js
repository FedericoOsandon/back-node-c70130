const { connect } = require('mongoose')

// super conj de url // http://... 
const uri = 'mongodb://127.0.0.1:27017/c70130'

const connectDb = async () => {
    console.log('base de datos conectada')
    await connect(uri)
}

module.exports = {
    connectDb
}
