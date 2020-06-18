const express = require('express')
const path = require('path')
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars')
const methodoverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

// Import function exported by newly installed node modules.
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


//initiliazations
const app = express()
require('./database')
require('./src/config/passport')

//settings
app.set('port', process.env.PORT || 8000)
app.set('views', path.join(__dirname, 'src/views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
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
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})


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