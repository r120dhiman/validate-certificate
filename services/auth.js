const jwt=require('jsonwebtoken');

const secret=process.env.KEY;

function createjwttoken(user) {
    const payload={
        email:user.email,
        role:user.role,
        name:user.name,
        _id:user._id
    };
    const token =jwt.sign(payload, secret);
    return token;
}

function validatetoken(token){
    const payload=jwt.verify(token, secret);
    return payload;
}

module.exports={
    createjwttoken,
    validatetoken
}