const { Router } = require('express')

const router = Router()

router.param('word', async (req, res, next, word) => {
    // acciones este parámetro
    req.word = word
    next()
})

router.get('/params/:word([a-zA-Z%C3%A1%C3%A9]+)', (req, res) => {
    
    const word = req.word
    res.send(word)
})

router.get('*', (req, res)=>{
    res.send('no existe esta ruta')
})








module.exports = router

