require('dotenv').config();
const express = require('express');
const validaterouter = require('./routes/validate');
const { connection } = require('./connections/bdconnection');
const adminrouter = require('./routes/admin');
const PORT = process.env.PORT || 3000;
const app = express();
//DB connection
connection(process.env.MONGOURL);


//middleware
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  return res.render('Home');
});
app.use('/admin',adminrouter);
app.use('/validate',validaterouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});