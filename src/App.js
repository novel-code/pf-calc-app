
import { useState } from "react";

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Employees from './components/Pages/EmployeeListPage/Employees/Employees';
import AddEmployee from "./components/Pages/AddEmpoyeePage/AddEmployee";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Popup from "./components/Navbar/Popup";
import Sidebar from "./components/Sidebar/Sidebar";




function App() {
  const [showAddEmployeeComponent, setShowAddEmployeeComponent] = useState(true);
  const [showEmpList, setShowEmpList] = useState(false);
  const [fetchData, setFetchData] = useState(false)
  const [EmployeesData, setEmployees] = useState([
    {
        id: 1,
        employeeName: "Jude Raj",
        gender: "male",
        designation: "Full-Stack Developer"
    },
    {
        id: 2,
        employeeName: "Mohan",
        gender: "male",
        designation: "Dev-ops"
    },
    {
        id: 3,
        employeeName: "Yeshwant shivashankar",
        gender: "male",
        designation: "Full Stack "
    },
]);

// Add Employee page
let newEmployee;
const addEmployee = (employee) => {

  const id = Math.floor(Math.random() * 10000) + 1;
  newEmployee = { 
    id: id,
    employeeName: employee.empName,
    gender: employee.gender,
    dateOfJoin: employee.dateOfJoin,
    designation: employee.designation,
    ctc: employee.ctc,
    pf: employee.pf,
    esi: employee.esi,
    tax: employee.tax
  }

  // console.log(newEmployee)

  setEmployees([...EmployeesData, newEmployee])

  console.log(newEmployee)
  
}


  return (
  
    <div className="App" >
      <BrowserRouter>
      <div style={{display: "flex"}}>

      <Sidebar></Sidebar>
      {/* <Navbar  /> */}
      <Switch>

        <Route path="/add"  component={() => <AddEmployee onAdd={addEmployee} ></AddEmployee>}>

        </Route>
          <Route path="/list" component={() => <Employees  ></Employees>}></Route>
      </Switch>
       
      </div>
      </BrowserRouter>
      

     
      {/* {showAddEmployeeComponent &&<div className="formBg"> <AddEmployee onAdd={addEmployee}/></div>} */}
      {/* {showEmpList && <Employees employees={EmployeesData} />} */}
      
     
      
    </div>
    
    
    );
  }
  
  export default App;
  