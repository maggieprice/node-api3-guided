const express = require('express'); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require("helmet");
const hubsRouter = require('./hubs/hubs-router.js');
const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/hubs', logger, hubsRouter);

server.get('/',logger, greeter, (req, res) => {
  // const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function greeter(req, res, next){
  req.cohors = "Web 26"
  next();
};
function logger(req, res, next){
  console.log(`${req.method} Request to ${req.originalUrl}`)
  next();
};

function gatekeeper(req, res, next) {
  console.log(`At the gate, about to be eaten`)

  const password = req.headers.password;

  if (password && password.toLowerCase() === "melon"){
    next();
  }
  else {
    res.status(401).json({you: 'You shall not pass!'});
  }
}

// server.use(gatekeeper);

// function auth(req, res, next) {
//   if (req.url === '/mellon') {
//     next();
//   } else {
//     res.send('You shall not pass!');
//   }
// }




server.get('/mellon', auth, (req, res) => {
  console.log('Gate opening...');
  console.log('Inside and safe');
  res.send('Welcome Traveler!');
});