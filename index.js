require('dotenv').config();

const express = require('express')


const app = express();
const port = 8000 || process.env.PORT;


app.get('' , (req, res)=>{
    res.send( "<h1> Hello from the app </h1>");
})


app.listen(port , ()=>{
    console.log(`app is listening on port ${port}`)
    
})