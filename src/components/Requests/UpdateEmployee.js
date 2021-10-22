const axios = require('axios');


export const updateEmployee = async function(dataToUpdate, id) {

const data =  JSON.stringify(dataToUpdate);

const config = {
  method: 'put',
  url: `http://localhost:8080/employee/update/${id}`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

return await axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

}