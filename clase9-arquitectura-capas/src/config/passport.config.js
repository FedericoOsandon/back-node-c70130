const passport = require('passport')
const jwt      = require('passport-jwt')
const { PRIVATE_KEY } = require('../utils/jsonwebtoken')

const JWTStrategy = jwt.Strategy
const ExtractJWT     = jwt.ExtractJwt
// const userService   = new UserManagerMongo()

const initializePassport = () => {
    // middleware son las estrategias que vamos a crear y configurar
    const cookeExtractor = req => {
        let token = null
        if(req && req.cookies){
            token = req.cookies['token']
        }
        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookeExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

}

module.exports = {
    initializePassport
}