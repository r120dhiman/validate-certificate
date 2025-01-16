const express = require('express');
const adminrouter = express.Router();
const certificate=require('../model/certificate');

adminrouter.get('/createnew', (req, res) => {
    return res.render('createnew');
});

adminrouter.post('/createnew', async (req, res) => {
   const name=req.body.name;
    const collegeName=req.body.collegeName;
    const position=req.body.position;
    const eventName=req.body.eventName;
    await certificate.create({
        name,
        collegeName,
        position,
        eventName
    });
    return res.redirect('/');
});

module.exports = adminrouter;