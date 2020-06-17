const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodoverride = require('method-override')
const session = require('express-session')
//initiliazations
const app = express()
require('./database')
//settings
app.set('port', process.env.PORT || 8000)
app.set('views', path.join(__dirname, 'src/views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')


//middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodoverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))


//global variables
//routes
app.use(require('./src/routes/index'))
app.use(require('./src/routes/notes'))
app.use(require('./src/routes/users'))

//static files

app.use(express.static(path.join(__dirname, 'src/public')))
//server is listenning
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
})