const express = require('express');
const validaterouter = require('./routes/validate');
const { connection } = require('./connections/bdconnection');
const adminrouter = require('./routes/admin');
const PORT = process.env.PORT || 3000;
const app = express();
//DB connection
connection('mongodb://localhost:27017/validate');


//middleware
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  return res.render('home');
});
app.use('/admin',adminrouter);
app.use('/validate',validaterouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});