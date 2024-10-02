const { Router } = require('express')
const { authentication } = require('../middleware/auth.middleware')
const { UserManagerMongo } = require('../managers/Mongo/usersManager.mongo.js')
const { createHash, isValidPassword } = require('../utils/bcrypt.js')
const passport = require('passport')

const router = Router()
const userServise = new UserManagerMongo()

router.get('/github', passport.authenticate('github', { scope:['user:email'] }), async (req, res) => {
})
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user
    res.redirect('/')
})


module.exports = router