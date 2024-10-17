const { RouterClass } = require("./routerClass.js")

class UserRouter extends RouterClass {

    init(){
        this.get('/', ['USER','USER-PREMIUN', 'ADMIN'], async (req, res)=> {
            try {
                res.sendSuccess('datos sensibles')                
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}

module.exports = {
    UserRouter
}
