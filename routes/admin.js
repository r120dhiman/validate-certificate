const express = require('express');
const adminrouter = express.Router();
const qrcode=require('qrcode');
const certificate=require('../model/certificate');
const fs = require('fs');

adminrouter.get('/createnew', (req, res) => {
    return res.render('createnew');
});

adminrouter.post('/createnew', async (req, res) => {
   const name=req.body.name;
    const collegeName=req.body.collegeName;
    const position=req.body.position;
    const eventName=req.body.eventName;
   const newuser= await certificate.create({
        name,
        collegeName,
        position,
        eventName,
        issuedby:req.user._id});
    const newid=newuser._id;
    const url=`https://validate-certificate-1zy7.onrender.com/validate/${newid}`;
    // const url=`http://localhost:3000/validate/${newid}`;
    try {
        const src = await qrcode.toDataURL(url);
        return res.render('showqrcode',{src});
    } catch(err) {
        return res.send('Error in generating QR code');
    }
});

module.exports = adminrouter;