const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'public')))

app.listen(3000);

app.get('/users', (res, req) => {
    res.send({})
})

//http://localhost:3000/default.html
//http://localhost:3000/css/base.css

//可以设置虚拟路径
app.use('/static',express.static(path.join(__dirname,'public')))
//http://localhost:3000/static/default.html