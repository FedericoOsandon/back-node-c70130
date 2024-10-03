const {Router} = require('express')

const router = Router()

router.get('/login', (req, res) => {
    res.status(200).render('login', {})
})
router.get('/register', (req, res) => {
    res.status(200).render('register', {})
})

// router.use('/', (req, res) => {
//     res.render('index', {
//         username: 'Federico'
//     })
// })

module.exports = router