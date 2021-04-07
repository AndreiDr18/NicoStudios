const express = require('express');
const app = express();

//Routers

const indexRouter = require('./routes/indexRoute');

app.listen(5050);

app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', indexRouter);

