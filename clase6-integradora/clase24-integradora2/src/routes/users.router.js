const { Router } = require('express')
const UserDaoMongo = require('../daos/Mongo/usersDaoMongo')
const { authTokenMiddleware } = require('../utils/jwt')

const router = Router()
const userService = new UserDaoMongo()
router
    .get('/', authTokenMiddleware,async (req, res)=>{
        try {
            const users = await userService.getUsers()
            
            res.send({
                status: 'success',
                payload: users
            })
        } catch (error) {
            console.log(error)
        }
    })
    .get('/:uid', async (req, res)=>{
        res.send('users')
    })
    .post('/', async (req, res)=>{
        const newUser = req.body
        // realizar validaciones

        const result = await userService.createUser(newUser)
        res.send({
            status: 'success',
            payload: result
        })
    })
    .put('/:uid', async (req, res)=>{
        res.send('users')
    })
    .delete('/:uid', async (req, res)=>{
        res.send('users')
    })

module.exports = router