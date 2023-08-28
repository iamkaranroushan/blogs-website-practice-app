require('dotenv').config();

const express = require('express')
const expressLayout = require('express-ejs-layouts')

const app = express();
const port = 8000 || process.env.PORT;

app.use(express.static('public'))



//templating engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use('/' , require('./server/route/main'))


app.listen(port , ()=>{
    console.log(`app is listening on port ${port}`)
    
})