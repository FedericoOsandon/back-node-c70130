const passport = require('passport')
const passportLocal = require('passport-local')
const GithubStrategy = require('passport-github2')
const { UserManagerMongo } = require('../managers/Mongo/usersManager.mongo')
const { createHash, isValidPassword } = require('../utils/bcrypt')

const LocalStrategy = passportLocal.Strategy
const userService   = new UserManagerMongo()

const initializePassport = () => {
    // middleware son las estrategias que vamos a crear y configurar


    passport.use('github', new GithubStrategy({
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await userService.getUser({email: profile._json.email})
            if (!user) {
                // registramos
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    password: '123456'
                }
                let result = await userService.createUser(newUser)
                return done(null, result)
            }
            done(null, user)

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