require('dotenv').config();
const express = require('express');
const validaterouter = require('./routes/validate');
const { connection } = require('./connections/bdconnection');
const certificate = require('./model/certificate');
const adminrouter = require('./routes/admin');
const userrouter = require('./routes/user');
const CookieParser = require('cookie-parser');
const User = require('./model/user');
const { checkforcookie } = require('./middleware/auth');
const PORT = process.env.PORT || 3000;
const app = express();
//DB connection
connection(process.env.MONGOURL);


//middleware
app.use(express.urlencoded({ extended: false }));
app.use(CookieParser());
app.use(checkforcookie('token'));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.get('/', async(req, res) => {
  if (!req.user) {
    return res.redirect('/user/signin');
  }
  if(req.user.role === 'BOSS'){
    const allcertificates = await certificate.find();
    const alluser = await User.find();
    return res.render('Home', {allcertificates, alluser, user: req.user});
  }
  const allcertificates = await certificate.find({issuedby: req.user._id});
  return res.render('Home', {allcertificates, user: req.user});
});
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});
app.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy');
});
app.use('/admin',adminrouter);
app.use('/user',userrouter);
app.use('/validate',validaterouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});