import axios from "axios";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { useTable } from "react-table";
import Popup from "../Navbar/Popup";
import AddEmployee from "../Pages/AddEmpoyeePage/AddEmployee";
import { EditFormBtn } from "../Pages/EmployeeListPage/Employees/EditFormBtn";
import Employees from "../Pages/EmployeeListPage/Employees/Employees";
import styles from "./dbEmployees.module.css";
import { deleteEmpFlag } from '../Requests/DeleteEmpFlag';


export const DbEmployees = function () {


const [popup , setPopup] = useState(false);
const [popMsg, setPopMsg] = useState("");



  const [dbEmployees, setDbEmployees] = useState([]);
  const [idDel, setIdDel] = useState();
  

  const fetchEmployees = async () => {
    const response = await axios
      .get("http://localhost:8080/employee/getAll")
      .catch((err) => console.log(err));

    if (response) {
      const dbEmployees = response.data;

      console.log("Employees:", dbEmployees);
    setDbEmployees(dbEmployees);

    }
    
  };


  // every single render, if the data didn't change from previous render then it will be cached
  const employeesData = useMemo(() => [...dbEmployees, dbEmployees]);

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
      },
      {
        Header: "Employee Name",
        accessor: "employee_name",
      },
      {
        Header: "Gender",
        accessor: "gender",
        Cell: (col) => {
          if (col.value === "m") {
            return "Male";
          } else if (col.value === "f") {
            return "Female";
          } else return "Others";
        },
      },
      {
        Header: "Date of joining",
        accessor: "date_of_joining",
        Cell: (col) => moment(col.value).format("DD-MMM-yy"),
      },
      {
        Header: "Designation",
        accessor: "designation",
      },
      {
        Header: "CTC",
        accessor: "ctc",
      },
      {
        Header: "Action",
        Cell: (col) => (
          <div>
            <EditFormBtn toEditData={col.row.original} ></EditFormBtn>
            <button onClick={() => {
                      setPopMsg(`Are you sure you want to delete ${col.row.original.employee_name}?`)
                      setPopup(true);
                      setIdDel(col.row.original.id)
                      
            } }  className="btn btn-danger">Delete</button>
          </div>
        ),
      },
    ],
    [dbEmployees]
  );

  const tableInstance = useTable({ columns: columns, data: employeesData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // after the component has been mounted this fn will run

  useEffect(() => {
      
    fetchEmployees()


  }, []);

  return (
      <>
    <table className={styles.tableDb} {...getTableBodyProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            className={styles.tableHeadDb}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, idxr) => {
          prepareRow(row);

          return (
            <tr className={styles.tableRowDb} {...row.getRowProps()}>
              {row.cells.map((cell, idx) => (
                <td {...cell.getCellProps()}>
                  {idx === 0 ? cell.render(idxr + 1) : cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
      {console.log("rendering")}
    </table>
    {popup ? <Popup sucOrFailMsg={popMsg} cancelBtn={true} logic={() =>setPopup(false)} id={idDel}></Popup> : ""}
    </>
  );
};
