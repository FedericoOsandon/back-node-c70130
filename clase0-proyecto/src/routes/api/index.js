const { Router } = require('express')
const userRouter = require('./users.router.js')
const viewsRouter = require('./views.router.js')
const { uploader } = require('../utils/upoloader.js')

const router = Router()



module.exports = router
// dao -> data access object