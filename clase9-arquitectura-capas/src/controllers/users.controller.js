const { userService } = require("../services")

class UsersController {
    constructor(){
        this.userService = userService
    }

    getUsers = async ( req, res ) => {
        const users = await userService.getUsers()
    
        res.send({ status: 'success', payload: users })
    }
    
    getUser  = () => {}

    createUser = async ( req, res ) => {
        const { body } = req
        // if(!body.email || !body.password ){
        if( !body.first_name || !body.email ){
           return  res.status(400).send({status: 'error', error: 'falta data'})
        }
        // users.push( { id: users.length + 1, ...body })
        
        const result = await userService.createUser(body)
    
        res.status(200).send({data: result})
    }

    updateUser = async ( req, res ) => {
        const { uid } = req.params
    
        let userToReplace = req.body
        if( !userToReplace.first_name || !userToReplace.email ){
            return  res.status(400).send({status: 'error', error: 'falta data'})
         }
    
        const result = await userService.updateUser({_id: uid}, userToReplace)
        res.send({status: 'success', message: 'usuario actualizado'})
    }

    deleteUser = async ( req, res ) => {
        const { uid } = req.params
        // const nuevaLista = users.filter(user => user.id !== Number(uid))
    
        const result = await userService.deleteUser({_id: uid})
        res.send({status: 'succes', message: 'usuario borrado'})
    }


}

module.exports = {
    UsersController
}