// fake db
let db = [
  {
    id: 0,
    taskName: "do your bed",
    status: "notStartedYet",
  },
  {
    id: 190,
    taskName: "prepare for exam",
    status: "done",
  },
];

let users = [];

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const serverSecret = "afdasdfasfasadfasdfasf";

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //we expect JSON data to be sent as payloads
app.use(cors());

const logger = require("morgan"); //importing a HTTP logger

app.use(logger("dev")); //using the HTTP logger library

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("../firebase/key/webticseminar-firebase-adminsdk-54m7u-9cf62dcf16.json");

initializeApp({
  credential: cert(serviceAccount),
});

const dbFirebase = getFirestore(); //this is the reference to the database

const data = {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
};

const res = dbFirebase.collection("cities").doc("LA").set(data);

// middleware
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, serverSecret, (err, decode));

    if (err) {
      if (err.expiredAt) {
        console.log("Tokenul tau a expirat!");

        res.status(403);
        res.send("expiredToken");
      } else {
        console.log("TOkenul tau nu e bun");
        res.status(403);
        res.send("brokenToken");
      }
    } else {
      console.req.email = decoded;
      next();
    }

    next();
  } else {
    res.status(401);
  }

  next();
}

app.get("/", (req, res) => {
  res.status(200);
  res.send(db);
});

app.post("/register", (req, res) => {
  console.log("vrei sa faci POST cu ", req.body);

  let userToAdd = req.body;

  let response = {};

  if (
    users.find((user) => user.emailAddress === userToAdd.emailAddress) ===
    undefined
  ) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(userToAdd.password, salt, function (err, hash) {
        userToAdd.password = hash;
        users.push(userToAdd);
        console.log(users);
      });
    });

    // de revizuit
    response.success = true;
  } else {
    response.success = false;
    console.log("userul exista deja");
  }

  res.send(response);
});

app.post("/login", (req, res) => {
  let loginData = req.body;
  console.log("vrei sa te autentifici cu ", loginData);

  let response = {};
  response.success = false;

  const user = users.find(
    (user) => user.emailAddress === loginData.emailAddress
  );

  if (user === undefined) {
    response.user = false;
    console.log("utilizatorul nu exista");
  } else {
    bcrypt.compare(loginData.password, user.password, function (err, result) {
      if (result) {
        // sign a jwtWebToken using the jwt package
        // -> this token will be used 2 ways for authorization
        let token = jwt.sign(
          {
            data: user.emailAddress,
          },
          serverSecret,
          { expiresIn: "1h" }
        );

        console.log("Tokenul tau este: ", token);

        res.send({ token });
      } else {
        console.log("parola este gresita");
      }
    });
  }

  // res.send(response)
});

// verifyToken will be called before the callback is entered
app.post("/tasks", verifyToken, (req, res) => {
  // normally this hardcoded email would come from the database
  if (req.email === "george.cujba@gmail.com") {
    console.log("Vrei sa adaugi taskul cu detaliile: ", req.body);

    res.send("Am adaugat");
  } else {
    res.status(403);
    console.log("Incerci sa adaugi un alt");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
