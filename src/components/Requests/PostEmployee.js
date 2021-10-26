const axios = require("axios");

export const postEmployee = async function (insertedData) {
  const data = JSON.stringify(insertedData);

  const config = {
    method: "post",
    url: "http://localhost:8080/employee/add",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config).then((response) => JSON.stringify(response.data));
};
