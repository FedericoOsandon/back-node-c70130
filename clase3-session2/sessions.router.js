const { Router } = require('express')
const { authentication } = require('../middleware/auth.middleware')
const { UserManagerMongo } = require('../managers/Mongo/usersManager.mongo.js')

const router = Router()
const userServise = new UserManagerMongo()

router.post('/register', async (req, res) => {
    const {first_name, last_name, email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})
    }

    const userFound = await userServise.getUser({email})
    if (userFound) {
        return res.status(401).send({status: 'error', error: 'El usuario ya existe'})
    }

    const newUser = {
        first_name, 
        last_name,
        email,
        password
    }

    const result = await userServise.createUser(newUser)

    res.send('usuario registrado correctamente')
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    const userFound = await userServise.getUser({email})
    console.log(userFound)
    if (!userFound) {
        return res.send({stauts: 'error', error: 'no existe el usuario'})
    }

    if (userFound.email !== email || userFound.password !== password) {
        return res.send({stauts: 'error', error: 'el email o la contraseña no coinciden'})
    }

    req.session.user = {
        email,
        isAdmin: userFound.role === 'admin'
    }

    res.send('logueado correctamente')
})

router.get('/current', authentication, (req, res) => {
    res.send('datos sensibles')
})

router.get('/logout', (req, res)=> {
    req.session.destroy( error => {
        if (error) return res.send({status: 'error', error})
    })
    res.send('logout')
})

module.exports = router