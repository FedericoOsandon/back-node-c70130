const UserDto = require("../dto/users.dto")
const { userService } = require("../service")
// userModel

class UsersController {
    constructor(){
        this.userService = userService
    }

    getUsers = async ( req, res ) => {
        const users = await userService.get()
    
        res.send({ status: 'success', payload: users })
    }
    
    getUser  = async (req, res) => {
        try {
            const { uid } = req.params
            const user = await userService.getBy({_id: uid})
            res.send({status: 'success', payload: user})
        } catch (error) {
            console.log(error)
        }

    }

    createUser = async ( req, res ) => {
        const { body } = req
        // if(!body.email || !body.password ){
        if( !body.first_name || !body.email ){
           return  res.status(400).send({status: 'error', error: 'falta data'})
        }
        // users.push( { id: users.length + 1, ...body })
        let userDto = new UserDto(body)
        const result = await userService.create(userDto)
    
        res.status(200).send({data: result}) // -> devolviendo password
    }

    updateUser = async ( req, res ) => {
        const { uid } = req.params
    
        let userToReplace = req.body
        if( !userToReplace.first_name || !userToReplace.email ){
            return  res.status(400).send({status: 'error', error: 'falta data'})
         }
    
        const result = await userService.update({_id: uid}, userToReplace)
        res.send({status: 'success', message: 'usuario actualizado'})
    }

    deleteUser = async ( req, res ) => {
        const { uid } = req.params
        // const nuevaLista = users.filter(user => user.id !== Number(uid))
    
        const result = await userService.delete({_id: uid})
        res.send({status: 'succes', message: 'usuario borrado'})
    }


}

module.exports = {
    UsersController
}