const { Router } = require('express')

const router = Router()
// probando cookies
// router.get('/setcookie', (req, res) => {
//     res.cookie('coderCookie', 'Esta es una cookie muy poderosa', {maxAge: 100000000}).send('set cookie')
// })
router.get('/setcookiesigned', (req, res) => {
    res.cookie('coderCookie', 'Esta es una cookie muy poderosa', {maxAge: 100000000, signed: true}).send('set cookie')
})

router.get('/getcookie', (req, res) => {
    // console.log(req.cookies)
    // res.send(req.cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})
router.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})
router.get('/deletecookie', (req, res) => {
    // console.log(req.cookies)
    res.clearCookie('coderCookie').send('cookie borrada')
})

// probando session

router.get('/sessions', (req, res) => {
    if(req.session.counter){
        req.session.counter ++
        res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
    }else{
        req.session.counter = 1
        res.send('bienvenidos')
    }
})
router.get('/logout', (req, res)=> {
    req.session.destroy( error => {
        if (error) return res.send({status: 'error', error})
    })
    res.send('logout')
})

module.exports = router

