// fake database
let db = [
  {
    id: 0,
    taskName: 'do your bed',
    status: 'notStartedYet',
  },
  {
    id: 1,
    taskName: 'prepare for exam',
    status: 'done',
  },
];

let credentials = {
  username: 'admin',
  password: 'admin',
};

// populate the to-do list
db.forEach((element) => {
  addTaskToUI(element);
});

// add to-do
document.getElementById('submit').addEventListener('click', addToDo);

function addTaskToUI(element) {
  let task = document.createElement('li');

  let taskContainer = document.createElement('div');
  let taskName = document.createTextNode(element.taskName);
  taskContainer.appendChild(taskName);
  task.appendChild(taskContainer);

  let taskStatus = document.createElement('div');
  let status = '';
  switch (element.status) {
    case 'notStartedYet':
      status = 'Not Started Yet';
      break;
    case 'inProgress':
      status = 'In Progress';
      break;
    case 'done':
      status = 'Done';
      break;
  }
  let taskStatusText = document.createTextNode('Status: ' + status);
  taskStatus.appendChild(taskStatusText);
  taskContainer.appendChild(taskStatus);

  let deleteTaskButton = document.createElement('button');
  let deleteTaskButtonText = document.createTextNode('Delete');
  deleteTaskButton.appendChild(deleteTaskButtonText);
  deleteTaskButton.id = 'DEL_BTN_' + element.id;
  deleteTaskButton.className = 'DEL_BTN';
  deleteTaskButton.addEventListener('click', deleteToDo);
  task.appendChild(deleteTaskButton);

  let updateTaskButton = document.createElement('button');
  let updateTaskButtonText = document.createTextNode('Update');
  updateTaskButton.appendChild(updateTaskButtonText);
  updateTaskButton.id = 'UPT_BTN_' + element.id;
  task.appendChild(updateTaskButton);

  task.id = element.id;
  task.className = 'task';

  document.getElementById('myTasks').appendChild(task);
  document.getElementById('info').innerText = '';
}

function addToDo(event) {
  event.preventDefault();

  let newToDo = {};
  newToDo.taskName = document.getElementById('taskName').value;
  newToDo.status = document.getElementById('status').value;
  newToDo.id = null;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      newToDo.id = Math.max(...db.map((o) => o.id)) + 1;
      newToDo.id = newToDo.id === -Infinity ? 0 : newToDo.id;
      db.push(newToDo);
      resolve(newToDo);
    }, 0);
  }).then((resolve) => {
    addTaskToUI(resolve);
  });
}

// delete to-do
let deleteButtons = Array.from(document.getElementsByClassName('DEL_BTN'));

deleteButtons.forEach((element) => {
  element.addEventListener('click', deleteToDo);
});

function deleteToDo(e) {
  if (checkCredentials(credentials.username, credentials.password) === 'authorized') {
    let id = e.target.id.split('_')[2];

    new Promise((resolve, reject) => {
      setTimeout(() => {
        db = db.filter((element) => element.id != id);
        resolve(id);
      }, 0);
    }).then((resolve) => {
      document.getElementById(resolve).remove();
      if (document.querySelectorAll('.task').length === 0) {
        document.getElementById('info').innerText = 'You have no to-do active';
      }
    });
  } else {
    console.log('You are not allowed to perform this operation');
  }
}

// authentication / authorization
function checkCredentials(username, password) {
  let token = 'notAuthorized';

  if (username === 'admin' && password === 'admin') {
    token = 'authorized';
  }

  return token;
}
