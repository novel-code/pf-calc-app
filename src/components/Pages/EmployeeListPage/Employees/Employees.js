import Employee from "../../../Employee/Employee";

const Employees = (props) => {

    

    return (
        // setEmployees([...EmployeesData, ])
        <div className="mt-5" >
                        

              <div className="row mb-3" style={{width: "80%"}}>

                <div className="col">Name:</div>
                <div className="col">Designation:</div>
                <div className="col">Gender:</div>

               

            </div >
            <div>
        {props.employees.map(emp => <Employee key={emp.id} employee={emp} />)}

            </div>
        
        </div>
    )
}

export default Employees;