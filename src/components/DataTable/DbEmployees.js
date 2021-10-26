import axios from "axios";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import Popup from "../Navbar/Popup";
import styles from "./dbEmployees.module.css";
import styleDel from "../Navbar/popup.module.css";
import { Link } from "react-router-dom";
import { GlobalFilter } from "./GlobalFilter";

export const DbEmployees = function () {
  const [popup, setPopup] = useState(false);
  const [delPopup, setDelPopup] = useState(false);

  const [dbEmployees, setDbEmployees] = useState([]);
  const [idDel, setIdDel] = useState();
  const [toDelEmp, setToDelEmp] = useState("");

  const fetchEmployees = async () => {
    const response = await axios
      .get("http://localhost:8080/employee/getAll")
      .catch((err) => console.log(err));

    if (response) {
      const dbEmployees = response.data;

      // console.log("Employees:", dbEmployees);
      setDbEmployees(dbEmployees);
    }
  };

  const DelEmployee = function (id) {
    const axios = require("axios");

    const config = {
      method: "put",
      url: `http://localhost:8080/employee/delete/flag/${id}`,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        fetchEmployees();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // every single render, if the data didn't change from previous render then it will be cached
  const employeesData = useMemo(() => [...dbEmployees], [dbEmployees]);

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        // accessor: "id",
        disableSortBy: true,
      },
      {
        Header: "Employee Name",
        accessor: "employee_name",
        // disableSortBy: true
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
            <Link
              to={{ pathname: `/edit/_` + col.row.original.id }}
              className="btn btn-primary mx-2"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                // setPopMsg(`Are you sure you want to delete ${col.row.original.employee_name}?`)
                // setPopup(true);
                setIdDel(col.row.original.id);
                setDelPopup(true);
                setToDelEmp(col.row.original.employee_name);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns: columns, data: employeesData },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  // after the component has been mounted this fn will run
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className={styles.tableDiv}>
      <div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGolbalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        ></GlobalFilter>
      </div>
      <div>
        <table
          className={styles.tableReact}
          style={{ width: "100%" }}
          {...getTableBodyProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className={styles.tableHeadDb}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}{" "}
                    {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                  </th>
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
        {delPopup ? (
          <div
            onClick={(e) => {
              if (e.target.className === "popup_modal__NSnnm")
                setDelPopup(false);
            }}
            className={styleDel.modal}
          >
            {" "}
            <div className={styleDel.modalContent}>
              <p>are you sur you want to delete {toDelEmp}?</p>
              <div>
                <button
                  className={styleDel.close}
                  style={{ marginRight: "2rem" }}
                  onClick={() => {
                    DelEmployee(idDel);
                    setDelPopup(false);
                    setPopup(true);
                  }}
                >
                  Yes
                </button>
                <button
                  className={styleDel.close}
                  onClick={() => {
                    setDelPopup(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {popup ? (
        <Popup
          sucOrFailMsg="deleted successfully."
          logic={() => setPopup(false)}
        ></Popup>
      ) : (
        ""
      )}
    </div>
  );
};
