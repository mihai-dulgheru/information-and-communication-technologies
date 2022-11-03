// fake database
// let db = [
//   {
//     id: 0,
//     taskName: "do your bed",
//     status: "notStartedYet",
//   },
//   {
//     id: 190,
//     taskName: "prepare for exam",
//     status: "done",
//   },
// ];

let credentials = {
  userName: "Mihai",
  password: "safePassword",
};

// utile
const BASE_URL = "http://localhost:3000/";
const REQUEST_OPTIONS = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

// register
document.getElementById("register").addEventListener("click", register);

function register(e) {
  e.preventDefault();
  const data = {};
  data.emailAddress = document.getElementById("emailAddress").value;
  data.password = document.getElementById("password").value;
  console.log(data);

  const localRequestOptions = { ...REQUEST_OPTIONS };
  localRequestOptions.method = "POST";
  localRequestOptions.body = JSON.stringify(data);

  fetch(BASE_URL + "register", localRequestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// login
document.getElementById("login").addEventListener("click", login);

function login(e) {
  e.preventDefault();
  const data = {};
  data.emailAddress = document.getElementById("loginEmailAddress").value;
  data.password = document.getElementById("loginPassword").value;
  console.log(data);

  const localRequestOptions = { ...REQUEST_OPTIONS };
  localRequestOptions.method = "POST";
  localRequestOptions.body = JSON.stringify(data);

  fetch(BASE_URL + "login", localRequestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// populam lista de to-dos
fetch(BASE_URL, REQUEST_OPTIONS)
  .then((res) => res.json())
  .then((res) => {
    res.forEach((elem) => {
      addTaskToUI(elem);
    });
  });

// db.forEach((elem) => {
//   addTaskToUI(elem);
// });

// adaugare to-do
document.getElementById("submit").addEventListener("click", addToDo);

function addToDo(event) {
  event.preventDefault();
  let newToDo = {};
  newToDo.taskName = document.getElementById("taskName").value;
  newToDo.status = document.getElementById("status").value;
  newToDo.id = null;

  const addToDoPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      newToDo.id = db.length != 0 ? Math.max(...db.map((el) => el.id)) + 1 : 0;
      db.push(newToDo);
      resolve(newToDo);
    }, 0);
  }).then((res) => {
    addTaskToUI(res);
  });
}

function addTaskToUI(elem) {
  let task = document.createElement("li");

  let taskContainer = document.createElement("div");
  let taskName = document.createTextNode(elem.taskName);
  taskContainer.appendChild(taskName);

  task.appendChild(taskContainer);
  let taskStatus = document.createElement("div");
  let taskStatusText = document.createTextNode("Status: " + elem.status);
  taskStatus.appendChild(taskStatusText);
  task.appendChild(taskStatus);

  let deleteTaskButton = document.createElement("button");
  let deleteTaskButtonText = document.createTextNode("Delete");
  deleteTaskButton.appendChild(deleteTaskButtonText);
  deleteTaskButton.id = "DEL_BTN_" + elem.id;
  deleteTaskButton.className = "DEL_BTN";
  deleteTaskButton.addEventListener("click", deleteToDo);
  task.appendChild(deleteTaskButton);

  let updateTaskButton = document.createElement("button");
  let updateTaskButtonText = document.createTextNode("Update");
  updateTaskButton.appendChild(updateTaskButtonText);
  updateTaskButton.id = "UPT_BTN_" + elem.id;
  task.appendChild(updateTaskButton);

  task.id = elem.id;
  task.className = "task";

  document.getElementById("myTasks").appendChild(task);
  document.getElementById("info").innerText = "";
}

// stergere to-do
let delButtons = Array.from(document.getElementsByClassName("DEL_BTN"));

delButtons.forEach((elem) => {
  elem.addEventListener("click", deleteToDo);
});

function deleteToDo(e) {
  if (
    checkCredentials(credentials.userName, credentials.password) ===
    "authorized"
  ) {
    let id = e.target.id.split("_")[2];

    const deteleToDoPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        db = db.filter((elem) => elem.id != id);
        resolve(id);
      }, 0);
    }).then((res) => {
      document.getElementById(res).remove();
      if (document.querySelectorAll("li.task").length === 0) {
        document.getElementById("info").innerText = "Nu ai niciun to-do activ";
      }
    });
  } else console.log("nu ai voie sa efectuezi aceasta operatie");
}

// autentificare / autorizare

function checkCredentials(userName, password) {
  let token = "notAuthorized";

  if (userName === "Mihai" && password === "safePassword") {
    token = "authorized";
  }

  return token;
}
