const express=require('express');
const userrouter=express.Router();

const user=require('../model/user');


userrouter.get('/signin', (req, res) => {   
    return res.render('signin');
});

userrouter.get('/signup', (req, res) => {   
    return res.render('signup');
});

userrouter.post('/signup', async (req, res) => {

    const {name, institute, desigination, email, password}=req.body;
    await user.create({
        name, institute, desigination, email, password
    })
    return res.redirect('/user/signin');
});

userrouter.post('/signin',async (req, res) => {
    const {email, password}=req.body;
    try {
        const token=await user.matchpassword(email, password);
        return res.cookie('token',token).redirect('/');
    } catch (error) {
        return res.render('signin', {error: 'Incorrect Email or Password! Check your details and try to Login back'})
    }
});


module.exports=userrouter;