import { DbEmployees } from "../../../DataTable/DbEmployees";
// import Employee from "../../../Employee/Employee";

const Employees = (props) => {

    
    
    

    return (
        // setEmployees([...EmployeesData, ])
        <div className="mt-5" >
                        

              
            <div>
        {/* {props.employees.map(emp => <Employee key={emp.id} employee={emp} />)} */}

            <DbEmployees></DbEmployees>
            </div>
        
        </div>
    )
}

export default Employees;