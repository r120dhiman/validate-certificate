require('dotenv').config();
const express = require('express');
const validaterouter = require('./routes/validate');
const { connection } = require('./connections/bdconnection');
const adminrouter = require('./routes/admin');
const userrouter = require('./routes/user');
const CookieParser = require('cookie-parser');
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
app.get('/', (req, res) => {
  return res.render('Home',);
});
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});
app.use('/admin',adminrouter);
app.use('/user',userrouter);
app.use('/validate',validaterouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});