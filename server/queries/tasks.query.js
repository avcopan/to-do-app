const pool = require("../modules/pool");

const getTasks = () => {
  const queryString = "SELECT * FROM tasks;";

  return pool
    .query(queryString)
    .then((result) => result.rows)
    .catch((error) => {
      throw new Error(error);
    });
};

getTasks().then(console.log);
