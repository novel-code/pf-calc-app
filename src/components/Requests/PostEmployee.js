
const axios = require('axios');

export const postEmployee = function (insertedData) {

    
    const data = JSON.stringify(insertedData);

    const config = {
        method: 'post',
        url: 'http://localhost:8080/employee/add',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return  axios(config).then((response) => JSON.stringify(response.data))



}

