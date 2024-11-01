const { Router } = require('express')
const {fork} = require('child_process')
const { sendEmail } = require('../utils/sendEmail')
const { sendMessage } = require('../utils/sendMessages')

const router = Router()



router.get('/sms', async (req, res) => {
    const first_name = 'Federico'
    const last_name = 'Osandón'
    await sendMessage()
    res.send('sms enviado')
})
router.get('/email', async (req, res) => {
    const first_name = 'Federico'
    const last_name = 'Osandón'
    await sendEmail({
        userClient: 'projectodigitalgen@gmail.com',
        subject: 'Esto es un email de prueba dinámico',
        html: `
            <div>
                <h1>Bienvenido ${first_name} ${last_name}</h1>
            </div>
        `
    })
    res.send('email enviado')
})








// function operacionCompleja() {
//     let result = 0
//     for (let i = 0; i < 9e9; i++) {
//         result += i
        
//     }

//     return result
// }

// router.get('/simple', (req, res) => {
//     res.send('simple')
// })

// router.get('/compleja',  (req, res) => {
//     // console.log(__dirname+'/operacioncompleja.js')
//     const child =  fork(__dirname+'/operacioncompleja.js')
//     child.send('inicializar calculo')

//     child.on('message', data => {
//         console.log('data recibido: ',data)
//         res.send({ data })
//         child.kill()
//     })
    
    
// })




// router.param('word', async (req, res, next, word) => {
//     // acciones este parámetro
//     req.word = word
//     next()
// })

// router.get('/params/:word([a-zA-Z%C3%A1%C3%A9]+)', (req, res) => {
    
//     const word = req.word
//     res.send(word)
// })

// router.get('*', (req, res)=>{
//     res.send('no existe esta ruta')
// })















// probando cookies
// router.get('/setcookie', (req, res) => {
//     res.cookie('coderCookie', 'Esta es una cookie muy poderosa', {maxAge: 100000000}).send('set cookie')
// })
// router.get('/setcookiesigned', (req, res) => {
//     res.cookie('coderCookie', 'Esta es una cookie muy poderosa', {maxAge: 100000000, signed: true}).send('set cookie')
// })

// router.get('/getcookie', (req, res) => {
//     // console.log(req.cookies)
//     // res.send(req.cookies)
//     console.log(req.signedCookies)
//     res.send(req.signedCookies)
// })
// router.get('/getcookie', (req, res) => {
//     console.log(req.cookies)
//     res.send(req.cookies)
// })
// router.get('/deletecookie', (req, res) => {
//     // console.log(req.cookies)
//     res.clearCookie('coderCookie').send('cookie borrada')
// })

// probando session

// router.get('/sessions', (req, res) => {
//     if(req.session.counter){
//         req.session.counter ++
//         res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
//     }else{
//         req.session.counter = 1
//         res.send('bienvenidos')
//     }
// })
// router.get('/logout', (req, res)=> {
//     req.session.destroy( error => {
//         if (error) return res.send({status: 'error', error})
//     })
//     res.send('logout')
// })

module.exports = router

