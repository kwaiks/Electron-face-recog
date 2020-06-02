const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const port = 4000;
const route = require('./config/route');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  })
)
app.use(route);
//membuat direktori publik
app.use(express.static(__dirname+'/public'))

http.listen(port,()=>{
    console.log('Server start at '+port);
})
