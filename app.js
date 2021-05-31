const express = require('express');
const app = express();

//Sitemap Generator

const {SitemapStream, streamToPromise} = require('sitemap');
const {createGzip} = require('zlib');
const {Readable} = require('stream');

let sitemap;

//Path handler
const path = require('path');

//Session handler -- Session Environment
const session = require('express-session')
app.use(session({
    secret:'UnsafeSecretRightHere',
    resave:false,
    saveUninitialized:true
}))

//Global utilities
const multer = require('multer');
const mongoose = require('mongoose');
//--Globoal utilities--

//MongoDB Environment
const dbURI = 'mongodb://andreidr:12321@cluster0-shard-00-00.z0sa2.mongodb.net:27017,cluster0-shard-00-01.z0sa2.mongodb.net:27017,cluster0-shard-00-02.z0sa2.mongodb.net:27017/NicoStudios?ssl=true&replicaSet=atlas-z70060-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(result=>{
    app.listen(27017);
    console.log('Succesfully connected to MongoDB');
})
.catch(err =>{
    console.log(err + ' \n mongodb connect app.js')
})


const blogModel = require(path.normalize(__dirname + '/models/blog'));
//--MongoDB Environment
//Routes

  //client
const indexRouter = require('./routes/indexRoute');
const aboutRouter = require('./routes/aboutRoute');
const blogRouter = require('./routes/blogRoute');
const contactRouter = require('./routes/contactRoute');
const orderRouter = require('./routes/orderRoute');
const portfolioRouter = require('./routes/portfolioRoute');

  //admin
const adminRouter = require('./routes/adminRoutes/adminRoute');
//--Routes--

//Environment
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//--Environment--

//Route handling

//CLIENT

app.use('/index', indexRouter);
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/order', orderRouter);
app.use('/portfolio', portfolioRouter);


//ADMIN

app.use('/admin', adminRouter);

app.use('/sitemap.xml',async function (req, res){

    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    if(sitemap){
      res.send(sitemap);
      return;
    }

    try{
      const smStream = new SitemapStream({
        hostname:'https://dragneaandrei.xyz' //to change hostname
      })
      const pipeline = smStream.pipe(createGzip());

      const blogs = await blogModel.find();

      for(blog of blogs){
        let title = blog.title.replace(/ /g, '-');
        smStream.write({url:`/blog/${title}`});
      }
      smStream.write({url:'/contact'});
      smStream.write({url:'/order'});
      smStream.write({url:'/portfolio'});
      smStream.write({url:'/about'});
      streamToPromise(pipeline).then(sm=> sitemap = sm);
      smStream.end()

      pipeline.pipe(res).on('error', (e) => {throw e})
    }catch(e){
      console.error(e);
      res.status(500).end();
    }

});
/*
app.use('/robots.txt', (req, res)=>{
  res.set('Content-Type', 'text/plain');
  res.send(path.normalize(__dirname + '/robots.txt'));
});
*/
//ERRORS

app.use((req, res,next)=>{
   res.status(404).render('404');
});

//--Route handling--
setInterval(resetSitemap, 3600000);

function resetSitemap(){
  sitemap = null;
}
