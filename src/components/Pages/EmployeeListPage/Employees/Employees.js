import { DbEmployees } from "../../../DataTable/DbEmployees";
// import Employee from "../../../Employee/Employee";

const Employees = (props) => {

    
    
    

    return (
        // setEmployees([...EmployeesData, ])
        <div style={{width: "100%"}} >
                        

              
            <div >
        {/* {props.employees.map(emp => <Employee key={emp.id} employee={emp} />)} */}

            <DbEmployees  ></DbEmployees>
            </div>
        </div>
    )
}

export default Employees;