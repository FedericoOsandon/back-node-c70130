const express       = require('express')
const userRouter    = require('./routes/users.router.js')
const productRouter = require('./routes/products.router.js')
const pruebaRouter  = require('./routes/pruebas.router.js')
const viewsRouter   = require('./routes/views.router.js')
const sessionsRouter = require('./routes/sessions.router.js')
const logger        = require('morgan')
const { uploader }  = require('./utils/multer.js')
const handlebars    = require('express-handlebars')

const { Server  } = require('socket.io')
const { connectDB } = require('./config/index.js')
const { chatSocket } = require('./utils/chatSocket.js')
const ProductsManagerFs = require('./managers/FileSystem/products.managers.js')
// clase cookie session 
const cookieParser = require('cookie-parser')
const session      = require('express-session')

const app = express()
const PORT = process.env.PORT ||  8080

const httpServer = app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})
// por convención lo llamamos io 
const io = new Server(httpServer)

const ioMiddleware = (io) => (req, res, next ) => {
    req.io = io
    next()
}

app.use(ioMiddleware(io))


console.log(__dirname + '/public')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))
// la palabra secreta del cookie parse debe estar en el .env
app.use(cookieParser('palabrasecreta'))
app.use(session({
    secret: 'secretcoder',
    resave: true,
    saveUninitialized: true
}))


// configuración del motor de plantillas
app.engine('handlebars', handlebars.engine())
// configurar la carpeta donde debe tomar las plantillas
app.set('views', __dirname + '/views')
// extención de las plantillas
app.set('view engine', 'handlebars')

connectDB()

// app.post('/uploader', uploader.single('myFile'), (req, res)=>{
//     res.send('archivo subido')
// })

app.use('/', viewsRouter)
app.use('/pruebas', pruebaRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/sessions', sessionsRouter)

app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
})



// chatSocket(io)


const productsSocket =  (io) => {
    io.on('connection', async socket => {
        console.log('nuevo cliente conectado')

        const {
            getProducts,
            createProduct
        } = new ProductsManagerFs()
        const products = await getProducts()
        socket.emit('productsList', products)

        socket.on('addProduct', async data => {
            await createProduct(data)
        })
    })

}

productsSocket(io)




// cookie no estan en el servidos 
// set - get  clear