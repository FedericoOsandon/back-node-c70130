const { Router } = require('express')
const UserDaoMongo = require('../daos/Mongo/usersDaoMongo')
const { createHash, isValidPassword } = require('../utils/hash')
const { generateToken } = require('../utils/jwt')
// zod libreria para validar data que se envia de formulario

const router = Router()
const usersService = new UserDaoMongo()


router.post('/register', async (req, res)=>{
    const { first_name, last_name, email, password } = req.body
    console.log(first_name, last_name, email, password)
    if(!first_name || !email || !password) return res.status(400).send({stauts: 'success', message: 'deben venir todos los campos requeridos'})

    const userFound = await usersService.getUser({email})
    console.log(userFound)
    
    if(userFound) return response.status(401).send({status: 'error', message: 'El usuario con ese email ya existe'})

    const newUser = {
        first_name,
        last_name, 
        email,
        password: createHash(password) // crear hash
    }

    let result = await usersService.createUser(newUser)

   

    res.send({
        status: 'success',
        data: result
    })
})

router.post('/login', async (req, res)=>{
    const { email, password } = req.body

    if(!email || !password) return res.status(400).send({stauts: 'success', message: 'deben venir todos los campos requeridos'})

    const userFound = await usersService.getUser({email})
    if(!userFound) return res.status(401).send({status: 'error', message: 'No se encuentra el usuario con ese email'})

    // validar password 
    if(!isValidPassword(password, userFound.password)) return res.send({status: 'error', message: 'las credenciales no coinciden'})
    const token = generateToken({
        id: userFound._id,
        email: userFound.email, 
        role: userFound.role === 'admin'
    })
    res.send({
        status: 'success',
        message: 'logged',
        token
    })
})


router.get('/current', (req, res)=>{
        res.send('datos sensibles')
    }
)

router.post('/logout', (req, res)=>{
    res.send('logout')
})

module.exports = router