const axios = require("axios");

export const deleteEmpFlag = function (id) {
  const config = {
    method: "put",
    url: `http://localhost:8080/employee/delete/flag/${id}`,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
