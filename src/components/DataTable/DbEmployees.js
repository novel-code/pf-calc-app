import axios from "axios";
import { useEffect, useState } from "react";



export const DbEmployees = function(props) {

    const [dbEmployees, setDbEmployees] = useState([]);

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:8080/employee/getAll').catch(err => console.log(err))

        if(response) {
            const dbEmployees = response.data;

            console.log("Employees:", dbEmployees)
            setDbEmployees(dbEmployees)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])
    
    return <div>Hello friend</div>

}