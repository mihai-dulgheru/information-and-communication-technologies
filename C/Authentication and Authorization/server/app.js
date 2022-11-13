// server app
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const logger = require('morgan');

const app = express();
const port = 3000;
const secret = 'serverKeptSecret';

app.use(logger('dev'));
app.use(cors()); // see more at https:// www.npmjs.com/package/cors
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // we expect JSON data to be sent as payloads

app.post('/login', (req, res) => {
  // AUTHENTICATION LOGIC, IF PASSED, DO THE FOLLOWING
  // ...
  const { loginEmail, loginPassword } = req.body;
  if (loginEmail !== 'admin@example.com' || loginPassword !== 'admin') {
    return res.json({ success: false, message: 'Authentication failed' });
  }

  // RETURNING THE AUTHORIZATION TOKEN
  const tokenEncodedData = {
    email: loginEmail,
  }; // we can encode identification information to use in future authorizations

  const response = {};
  response.success = true;
  response.token = jwt.sign(tokenEncodedData, secret, { expiresIn: 3600 });
  // expiration of the token is optional, if missing, the token won't expire
  res.send(response);
  // ...
});

// MIDDLEWARE
// checks if the request token exists and has a proper structure
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

// SERVING A PRIVATE RESOURCE
app.get('/private', verifyToken, (req, res) => {
  // invokes the 'verifyToken' middleware
  jwt.verify(req.token, secret, (err, decoded) => {
    if (err) {
      if (err.expiredAt) {
        // if token expired, the err object will have an 'expiredAt' key
        res.send({ message: 'Your token has expired. Please re-authenticate' });
      } else {
        res.send({ message: 'You are NOT authorized to access this resource' });
      }
    } else {
      console.log(decoded.email);
      // we have access to the identification data used to generate the token
      // this way we can write a logic to access only the resources for which
      // a request is authorized
      res.send({ message: 'Well kept secret' });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
