const express = require('express');
const userrouter = express.Router();

const user = require('../model/user');

userrouter.get('/signin', (req, res) => {   
    return res.render('signin');
});

userrouter.get('/signup', (req, res) => {   
    return res.render('signup');
});

// Signup route
userrouter.post('/signup', async (req, res) => {
    const { name, institute, desigination, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.render('signup', { 
                error: 'Email already registered! Please use a different email or sign in.' 
            });
        }

        // Create new user
        await user.create({
            name, 
            institute, 
            desigination, 
            email, 
            password
        });
        return res.redirect('/user/signin');
    } catch (error) {
        console.error('Error during signup:', error);
        return res.render('signup', { 
            error: 'An error occurred during signup. Please try again.' 
        });
    }
});

userrouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await user.matchpassword(email, password);
        return res.cookie('token', token).redirect('/');
    } catch (error) {
        return res.render('signin', {
            error: 'Incorrect Email or Password! Check your details and try to Login back'
        });
    }
});

module.exports = userrouter;