// setting global parameters for all HTTP requests
var globalRequestParameters = {
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer',
};

const baseURL = 'http://localhost:3000/';

function login() {
  let parameters = { ...globalRequestParameters }; // shallow object clone
  parameters.method = 'POST';
  parameters.body = JSON.stringify({
    loginEmail: 'admin@example.com',
    loginPassword: 'admin',
  });

  fetch(baseURL + 'login', parameters)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        // if authentication was successful, store the token in the browser's local storage
        localStorage.setItem('token', data.token);
      } else {
        console.log('Authentication failed');
      }
    });
}

// REQUESTING A PRIVATE RESOURCE
function accessPrivateData() {
  let token = localStorage.getItem('token');
  // assuming the authorization token has been stored in localStorage
  if (token) {
    let parameters = { ...globalRequestParameters }; // shallow object clone
    parameters.method = 'GET';
    parameters.headers.Authorization = 'Bearer ' + token;
    // adding the token to the request
    fetch(baseURL + 'private', parameters)
      .then((res) => res.json())
      .then((res) => console.log(res)); // logging the private message
    // ... optional error handling
  } else {
    console.log('no access token');
  }
}
