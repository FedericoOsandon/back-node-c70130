const passport = require('passport')
const passportLocal = require('passport-local')
const { UserManagerMongo } = require('../managers/Mongo/usersManager.mongo')
const { createHash, isValidPassword } = require('../utils/bcrypt')

const LocalStrategy = passportLocal.Strategy
const userService   = new UserManagerMongo()

const initializePassport = () => {
    // middleware son las estrategias que vamos a crear y configurar
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email' 
    }, async (req, username, password, done)=>{
        // toda la logica del register
        const { first_name, last_name } = req.body
        try {
            let userFound = await userService.getUser({email: username})
            if (!userFound) return done(null, false)

            let newUser = {
                first_name,
                last_name, 
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            return done(null, result)

            
        } catch (error) {
            return done('Error al crear un usuario '+error)
        }
    }))

    
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async ( username, password, done ) => {
        try {
            const user = userService.getUser({email: username})
            if (!user) return done(null, false)

            if(!isValidPassword(password, user.password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userService.getUser({_id: id})
        done(null, user)
    })
}

module.exports = {
    initializePassport
}