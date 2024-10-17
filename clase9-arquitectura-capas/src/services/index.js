const { UserManagerMongo } = require("../managers/Mongo/usersManager.mongo")

const userService    = new UserManagerMongo()
// const productService = new ProducDaoMongo() 

module.exports = {
    userService
}