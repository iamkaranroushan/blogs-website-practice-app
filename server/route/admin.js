const express = require('express');
const router = express.Router();
const post = require('../models/post')
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



const adminLayout = '../views/layouts/admin';

const jwtSecret = process.env.JWT_SECRET;



const authMiddleware = (req, res, next)=>{
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json( { message: 'Unauthorized'} );
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        res.status(401).json( { message: 'Unauthorized'} );
    }

}

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

        const user = await User.findOne( { username } );

        if(!user) {
            return res.status(401).json( { message: 'Invalid credentials' } );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json( { message: 'Invalid credentials' } );
        }
        
        const token = jwt.sign({ userId: user._id}, jwtSecret );
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');         
    } catch (error) {
        console.log(error);
    }
})

// register

// router.post('/register', async(req, res)=>{

//     try {
//         const  { username, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10)

//         try {
            
//             const user = await User.create({ username, password:hashedPassword })
//             console.log(user);
//             res.status(201).json({message: 'user created', user})
//         } catch (error) {
//             if(error.code === 11000){
//                 res.status(409).json({message: 'user already in use'})
//             }
//             res.status(500).json({message: 'internal server error'})
//         }
        
//     } catch (error) {
//         console.log(error);
//     }
// })

router.get('/dashboard',authMiddleware, async (req, res) => {
    try {
      const local = {
        title: 'Dashboard',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }
  
      const data = await post.find();
      res.render('admin/dashboard',{
        local,
        data,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

  router.get('/add-post',authMiddleware, async (req, res) => {
    try {
      const local = {
        title: 'Add Post',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }
  
      const data = await post.find();
      res.render('admin/add-post',{
        local,
        data,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });







module.exports = router;