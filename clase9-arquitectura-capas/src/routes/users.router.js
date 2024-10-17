const { Router } = require('express')

const { passportCall } = require('../middleware/passport/passportCall')
const { UsersController } = require('../controllers/users.controller')

const router = Router()

function auth(req, res, next) {
    req.user = {
        name: 'fede',
        role: 'admin'
    }
    if (req.user.role !== 'admin') {
        return res.send('no puede avanzar a partir de aqui')
    }
    next()
}

const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = new UsersController()

router.get('/',        passportCall('jwt'), getUsers)
router.post('/',       createUser)
router.put('/:uid',    updateUser)
router.delete('/:uid', deleteUser)

module.exports = router 

