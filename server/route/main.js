const express = require('express');
const router = express.Router();


const local = {
    title: "node.js Blog",
    description :"a blogs app"
}
router.get('' , (req, res)=>{
    res.render('index', {local});
})

router.get('/about' , (req, res)=>{
    res.render('about', {local});
})

router.get('/contact' , (req, res)=>{
    res.render('contact', {local});
})
module.exports = router;