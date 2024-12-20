const { Router } = require('express')
const { authentication } = require('../middleware/auth.middleware')

const { createHash, isValidPassword } = require('../utils/bcrypt.js')
const passport = require('passport')
const { generateToken, authTokenMiddleware } = require('../utils/jsonwebtoken.js')
const { passportCall } = require('../middleware/passport/passportCall.js')
const { authorization } = require('../middleware/passport/authorization.middleware.js')
const { UserDaoMongo } = require('../daos/Mongo/usersDao.mongo.js')

const router = Router()
const userServise = new UserDaoMongo()


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
        password: createHash(password)
    }

    const result = await userServise.createUser(newUser)

    res.redirect('/login')
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // console.log(email, password)
    const userFound = await userServise.getUser({email})
    console.log(userFound)
    if (!userFound) {
        return res.send({stauts: 'error', error: 'no existe el usuario'})
    }

    // if (userFound.email !== email || userFound.password !== password) {
    //     return res.send({stauts: 'error', error: 'el email o la contraseña no coinciden'})
    // }
    
    if (isValidPassword(password, userFound.password)) {
        return res.send({stauts: 'error', error: 'el email o la contraseña no coinciden'})
    }

    // req.session.user = {
    //     email,
    //     isAdmin: userFound.role === 'admin'
    // }
    const token = generateToken({id: userFound._id, role: userFound.role})

    res.cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }).send({
        status: 'success',
        data: userFound,
        token
    })
})

router.get('/current', passportCall('jwt'), authorization('admin') , (req, res) => {
    res.send({dataUser: req.user, message:'datos sensibles'})
})

// router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
//     res.send({dataUser: req.user,message:'datos sensibles'})
// })

// fetch('url', {
//     method: 'post',
//     headers: {
//         'Content-Type': 'application/json',
//         'token': 'jasldkfñasjflasjfdlasjlfjasldfj' 
//     },
        // body: {}
// })
router.post('/changepass', async (req, res) => {
    const { email, password } = req.body
    // console.log(email, password)
    const userFound = await userServise.getUser({email})
    // console.log(userFound)
    if (!userFound) {
        return res.send({stauts: 'error', error: 'no existe el usuario'})
    }

    // const result = await userServise.updateuser()

    res.send('se a cambiado correctamente la contraseña')
})


router.get('/logout', (req, res)=> {
    req.session.destroy( error => {
        if (error) return res.send({status: 'error', error})
    })
    res.send('logout')
})

module.exports = router



// 'atuhorizaron': sessionStorage.getItem('token')