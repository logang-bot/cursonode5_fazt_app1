const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
//initiliazations
const app = express()

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
//global variables
//routes
//static files
//server is listenning
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
})