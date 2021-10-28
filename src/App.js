import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Employees from "./components/Pages/EmployeeListPage/Employees/Employees";
import AddEmployee from "./components/Pages/AddEmpoyeePage/AddEmployee";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [EmployeesData, setEmployees] = useState([
    {
      id: 1,
      employeeName: "Jude Raj",
      gender: "male",
      designation: "Full-Stack Developer",
    },
    {
      id: 2,
      employeeName: "Mohan",
      gender: "male",
      designation: "Dev-ops",
    },
    {
      id: 3,
      employeeName: "Yeshwant shivashankar",
      gender: "male",
      designation: "Full Stack ",
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
      tax: employee.tax,
    };

    setEmployees([...EmployeesData, newEmployee]);

    console.log(newEmployee);
  };

  const editEmployee = () => {
    console.log("edit or update method");
  };



  return (
    <div className="App">
      <BrowserRouter>
{/* 
<div style={{display: "flex", boxShadow: "4px 4px 13px rgba(114, 114, 114, 0.466)" , fontSize: "22px",  paddingLeft: "50px",  paddingTop: "10px"}}>
  <button style={{marginRight: "2rem"}} onClick={() => setSidebarOpen(!sidebarOpen)}>toggle</button>
  <p>Employee details</p>
</div> */}
        <div style={{ display: "flex" }}>
          <div>

            <Sidebar toggle={sidebarOpen}></Sidebar>
          </div>
          <div className="flex-grow-1">
            
            <Navbar  />
            <Switch>
              <Route
                path="/add"
                component={() => (
                  <AddEmployee onAdd={addEmployee}></AddEmployee>
                )}
              ></Route>
              <Route
                path="/list"
                component={() => <Employees></Employees>}
              ></Route>
              <Route
                path="/edit/:id"
                component={() => (
                  <AddEmployee onEdit={editEmployee}></AddEmployee>
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
