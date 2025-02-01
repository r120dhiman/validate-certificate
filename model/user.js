const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createjwttoken } = require('../services/auth');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    desigination: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    role: {
        type: String,
        enum: ["ADMIN", "BOSS"],
        default: "ADMIN"
    }
}, { timestamps: true });

userschema.pre('save', function (next) {
    const user=this;
    if(!user.isModified('password')){
        return;
    }
    const salt=randomBytes(16).toString();
    const hashed=createHmac('sha256', salt)
                 .update(user.password)
                 .digest('hex');
    user.salt=salt;
    user.password=hashed;
    next();
})

userschema.static('matchpassword', async function (email, password) {
    const userdata = await this.findOne({ email });
    if (!userdata) {
        throw new Error("User Not Found. Check your email or Sign Up first.");
    }
    const salt = userdata.salt;
    const hashedIncoming = createHmac('sha256', salt)
        .update(password)
        .digest('hex');
    if (hashedIncoming === userdata.password) {
        const token=createjwttoken(userdata);
        return token;
    } else {
        throw new Error("Incorrect Password");
    }
});

const User = mongoose.model('User', userschema);
module.exports = User;
