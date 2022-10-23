new Promise((resolve, reject) => {
  console.log("Initial");
  // issue a network request

  setTimeout(() => resolve("The response"), 2000);
})
  .then((res) => {
    console.log(res);
    // assuming we're creating a new promise that rejects
    throw new Error("Something failed");

    console.log("Do this");
  })
  .catch(() => {
    console.error("Do that");
  })
  .then(() => {
    console.log("Do this, no matter what happened before");
  });
