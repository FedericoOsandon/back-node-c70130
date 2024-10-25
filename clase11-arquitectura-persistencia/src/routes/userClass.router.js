const { userService } = require("../services/index.js")
const { RouterClass } = require("./routerClass.js")

class UserRouter extends RouterClass {

    init(){
        this.get('/', ['PUBLIC'], async (req, res)=> {
            try {
                const users = await userService.getUsers()   
          
                res.sendSuccess(users)                
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}

module.exports = {
    UserRouter
}
