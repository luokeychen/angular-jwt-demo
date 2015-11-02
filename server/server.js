var jsonServer = require('json-server');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
// var morgan = require('morgan');

var tokenManager = require('./config/token_manager');
var secret = require('./config/secret');
var cors = require('./config/cors');

var server = jsonServer.create();

var routes = {};	
routes.users = require('./route/users');

server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

//解决跨域问题
 server.all('*', cors);

///
 server.get('/',function(req,res){res.send('Hello! The API is at http://127.0.0.1:3000/api');})

//Login
 server.post('/user/signin', routes.users.signin); 
 
//Logout
server.get('/user/logout', jwt({secret: secret.secretToken}), tokenManager.verifyToken, routes.users.logout); 

// 访问静态文件，静态文件放置在public 目录下
server.use(jsonServer.defaults());

//api 假数据
var APIRouter = jsonServer.router('db.json');

//路由映射
server.use(jsonServer.rewriter({'/api/':'/'}));
server.use(jwt({secret: secret.secretToken}),tokenManager.verifyToken); 
server.use(APIRouter);

server.listen(3000);






