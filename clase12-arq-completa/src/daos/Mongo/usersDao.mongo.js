// capa de persistencia -> dao (data access object)
const { userModel } = require("./models/users.model.js")


class UserDaoMongo {
    constructor(){
        this.model = userModel
    }
    create = async newUser => await this.model.create(newUser) 
    get   = async () => await this.model.find()
    getBy    = async filter =>  await this.model.findOne(filter)
    update = () => {}
    delete = () => {}
}

module.exports = {
    UserDaoMongo  // -> objeto acceso a los datos
}