const express = require('express');
const app = express();

//Routers

const indexRouter = require('./routes/indexRoute');
const aboutRouter = require('./routes/aboutRoute');
const contactRouter = require('./routes/contactRoute');

app.listen(5050);

app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', indexRouter);
app.get('/about', aboutRouter);
app.get('/contact', contactRouter);

