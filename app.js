const express = require('express');
const app = express();



//Global utilities
var multer = require('multer');
var mongoose = require('mongoose');
//--Globoal utilities--

//MongoDB Environment
const dbURI = 'mongodb+srv://andreidr:12321@cluster0.z0sa2.mongodb.net/NicoStudios?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(result=>{
    console.log('Succesfully connected to MongoDB');
    app.listen(5050);
})
.catch(err =>{
    console.log(err + ' \n line 13 app.js')
})

//--MongoDB Environment
//Routes
const indexRouter = require('./routes/indexRoute');
const aboutRouter = require('./routes/aboutRoute');
const blogRouter = require('./routes/blogRoute');
const contactRouter = require('./routes/contactRoute');
const orderRouter = require('./routes/orderRoute');
//--Routes--

//Environment
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//--Environment--

//Route handling

app.use('/index', indexRouter);
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/order', orderRouter);

//--Route handling--