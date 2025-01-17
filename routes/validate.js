const express = require('express');
const certificate = require('../model/certificate');

const validaterouter = express.Router();
validaterouter.get('/:certificateID', async(req, res) => {
    const id=req.params.certificateID;
   const data=await certificate.findById(id).populate('issuedby');
   if(data){
       return res.render('validate',{data});
   }
   else{
       return res.send('Certificate not found');
   }
});

module.exports = validaterouter;