import { DbEmployees } from "../../../DataTable/DbEmployees";
import Employee from "../../../Employee/Employee";
import { getAllEmployees } from "../../../Requests/getAllEmployees";

const Employees = (props) => {

    
    
    getAllEmployees()
    

    return (
        // setEmployees([...EmployeesData, ])
        <div className="mt-5" >
                        

              <div className="row mb-3" style={{width: "80%"}}>

                <div className="col">Name:</div>
                <div className="col">Designation:</div>
                <div className="col">Gender:</div>
                <div className="col">Date of Join:</div>
                <div className="col">Ctc:</div>

               

            </div >
            <div>
        {props.employees.map(emp => <Employee key={emp.id} employee={emp} />)}

            </div>
            <DbEmployees></DbEmployees>
        
        </div>
    )
}

export default Employees;