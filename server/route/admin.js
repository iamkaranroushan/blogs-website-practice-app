const express = require('express');
const router = express.Router();
const post = require('../models/post')
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';



//login route

router.get('/admin', async(req, res)=>{

    try {
        const local = {
            title: "Admin",
            description :"a blogs app"
        }

        res.render('admin/login', {local, layout: adminLayout});
        
    } catch (error) {
        console.log(error);
    }
})

//login

router.post('/admin', async(req, res)=>{

    try {
        const  { username, password } = req.body;
        
        
    } catch (error) {
        console.log(error);
    }
})

// register

router.post('/register', async(req, res)=>{

    try {
        const  { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            
            const user = await User.create({ username, password:hashedPassword })
            console.log(user);
            res.status(201).json({message: 'user created', user})
        } catch (error) {
            if(error.code === 11000){
                res.status(409).json({message: 'user already in use'})
            }
            res.status(500).json({message: 'internal server error'})
        }
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;