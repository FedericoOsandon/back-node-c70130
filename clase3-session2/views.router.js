const { Router } = require('express')
const ProductsManagerFs = require('../managers/FileSystem/products.managers')
const { authentication } = require('../middleware/auth.middleware')

const router = Router()

router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login', (req, res) => {
    res.render('login')
})


router.get('/', authentication,(req, res) => {
    res.render( 'chat', {
        isMenu: true
     })
})

const users = [
    {id: '1', full_name: 'user example 1', email: 'user1@gmail.com'},
    {id: '2', full_name: 'user example 2', email: 'user2@gmail.com'},
    {id: '3', full_name: 'user example 3', email: 'user3@gmail.com'},
]

router.get('/users', authentication,(req, res) => {

    const userLogin = {
        full_name: 'Fede el mejor',    
        role: 'admin'
    }

    res.render('users', {
        user: userLogin,
        isAdmin: userLogin.role === 'admin',
        users,
        title: 'HOME',
        styles: 'index.css',
        isMenu: true
    })
})

router.get('/home', (req, res) => {
    // importación manager para traer todos los productos
    const { getProducts } = new ProductsManagerFs()
    const products = getProducts()
    res.render('home', {products})
})
router.get('/realtimeproducts', (req, res) => {
  

    res.render('realtimeproducts', {})  
})



module.exports = router