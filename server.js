const http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
 
const userServiceProxy = httpProxy('https://api.github.com/users');
const repoServiceProxy = httpProxy('https://api.github.com/repositories');

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 
app.get('/users', (req, res, next) => {
  userServiceProxy(req, res, next);
})
 
app.get('/repositories', (req, res, next) => {
  repoServiceProxy(req, res, next);
})
  
const server = http.createServer(app);
server.listen(3000);
app.listen( () => {
  console.log("+---------------------------------------+");
  console.log("|                                       |");
  console.log(`|  [\x1b[34mSERVER\x1b[37m] Listening on port: \x1b[36m 3000 🚀 \x1b[37m |`);
  console.log("|                                       |");
  console.log("\x1b[37m+---------------------------------------+");
});