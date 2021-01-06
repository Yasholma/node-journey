console.log("Before");
getUser(1)
  .then((user) => getRepositories(user.githubUsername))
  .then((repos) => console.log(repos))
  .catch((err) => console.log(err.message));

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({
        id,
        githubUsername: "yasholma",
      });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    console.log("Fetching data...");
    setTimeout(() => {
      resolve({
        username,
        repos: ["repo1", "repo2", "repo3"],
      });
    }, 2000);
  });
}
