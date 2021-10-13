import moment from "moment";

const Employee = ({ employee }) => {

    const oddEvenCheck = function(emp) {
        if(emp.id % 2 === 0) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div>
          
            
        <div className="row" style={{width: "80%", backgroundColor: oddEvenCheck(employee) ? 'rgb(117, 186, 241)' : 'rgb(236, 87, 87)'}}>
            

            <div className="col">
                <p>{employee.employeeName}</p>
            </div>

            <div className="col">
                <p>{employee.designation}</p>
            </div>

            <div className="col">
                <p>{employee.gender}</p>
            </div>
            <div className="col">
                <p>{moment(employee.dateOfJoin).format("yy-MM-DD")}</p>
            </div>

            <div className="col">
                <p>{employee.ctc}</p>
            </div>

        </div>

        </div>
    )
}

export default Employee;