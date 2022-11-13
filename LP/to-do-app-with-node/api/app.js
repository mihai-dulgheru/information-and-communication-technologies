// fake database
const db = [
  {
    id: 0,
    taskName: 'do your bed',
    status: 'notStartedYet',
  },
  {
    id: 190,
    taskName: 'prepare for exam',
    status: 'done',
  },
];

const users = [];

const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const port = 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

app.use(logger('dev'));
app.use(cors()); //see more at https://www.npmjs.com/package/cors
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //we expect JSON data to be sent as payloads

app.use(logger('dev')); //using the HTTP logger library

app.get('/', (req, res) => {
  res.status(200);
  res.send(db);
});

app.post('/register', (req, res) => {
  console.log('Vrei sa faci POST', req.body);

  const userToAdd = req.body;

  const response = {};
  response.success = true;

  const user = users.find((user) => user.emailAddress === userToAdd.emailAddress);
  if (!user) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(userToAdd.password, salt, function (err, hash) {
        userToAdd.password = hash;
        users.push(userToAdd);
        console.log(users);
      });
    });
  } else {
    response.success = false;
    console.log('Userul exista deja');
  }

  res.send(response);
});

app.post('/login', (req, res) => {
  let loginData = req.body;
  console.log('Vrei sa te autentifici cu', loginData);

  let response = {};
  response.success = false;

  const user = users.find((user) => user.emailAddress === loginData.emailAddress);
  if (user === undefined) {
    response.success = false;
    console.log('Userul nu exista');
  } else {
    bcrypt.compare(loginData.password, user.password, function (err, result) {
      if (result) {
        response.success = true;
        console.log('Userul exista si parola este corecta');
        const token = jwt.sign({ emailAddress: user.emailAddress }, 'secretKey');
        response.token = token;
      } else {
        console.log('Userul exista dar parola este incorecta');
      }
    });
  }

  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
