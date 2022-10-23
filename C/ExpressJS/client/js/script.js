// client app
let url = "http://127.0.0.1:3000/data";
let data = {};

document.getElementById("submit").addEventListener("click", (event) => {
  data.value = document.getElementById("data").value;
  postData();
  event.preventDefault();
});

function postData() {
  console.log("trying to send data to server app ", data);
  fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data), // data format must be the same as in header
  }).then((res) => res.text().then((res) => console.log(res)));
}
