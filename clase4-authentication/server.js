
// passport
const passport = require('passport')
const { initializePassport } = require('./config/passport.config.js')

const app = express()
const PORT = process.env.PORT ||  8080



console.log(__dirname + '/public')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))
// la palabra secreta del cookie parse debe estar en el .env
app.use(cookieParser('palabrasecreta'))

// conexión de session con db mongo
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/c70130',
        // mongoOptions: {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // },
        ttl: 1000000000000
    }),
    secret: 'secretcoder',
    resave: true,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


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