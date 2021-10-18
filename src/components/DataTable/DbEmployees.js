import axios from "axios";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import styles from "./dbEmployees.module.css";

export const DbEmployees = function (props) {
  const [dbEmployees, setDbEmployees] = useState([]);

  const fetchEmployees = async () => {
    const response = await axios
      .get("http://localhost:8080/employee/getAll")
      .catch((err) => console.log(err));

    if (response) {
      const dbEmployees = response.data;

    //   console.log("Employees:", dbEmployees);
      setDbEmployees(dbEmployees);
    }
  };

  // every single render, if the data didn't change from previous render then it will be cached
  const employeesData = useMemo(() => [...dbEmployees, [dbEmployees]]);

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
        Cell: () => (
          <div>
            <button className="btn btn-primary mx-2">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns: columns, data: employeesData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // after the component has been mounted this fn will run
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
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
    </table>
  );
};
