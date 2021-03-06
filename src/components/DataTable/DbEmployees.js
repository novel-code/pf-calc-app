import axios from "axios";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable , usePagination } from "react-table";
import Popup from "../Navbar/Popup";
import styles from "./dbEmployees.module.css";
import styleDel from "../Navbar/popup.module.css";
import { Link } from "react-router-dom";
import { GlobalFilter } from "./GlobalFilter";
import {VscChevronDown ,VscChevronUp} from "react-icons/vsc"
import {BsInfoCircle} from "react-icons/bs"
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { GrPrevious , GrNext} from "react-icons/gr";

export const DbEmployees = function () {
  const [empInfo, setEmpInfo] = useState("")
  const [displayInfo, setDisplayInfo] = useState(false)
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

      console.log(response.data)

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
        Header: "ID",
        accessor: "id",
        // disableSortBy: true,
      },
      {
        Header: "Img",
        Cell: (col) => (
          <img src={col.row.original.profile_img} style={{width: "30px", height: "30px", borderRadius: "50%"}}></img>
        )
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
        Cell: (col) => moment(col.value).format("MMM-DD-yy"),
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
          <div >
            <button className="btn" style={{color: "rgb(24,162,184)"}} onClick={() => {
              
              setEmpInfo(col.row.original)
              setDisplayInfo(true)
              setPopup(true)
            }}>
              <BsInfoCircle></BsInfoCircle>
            </button>
            <Link style={{color: "rgb(0,123,255)", fontSize: "1.2rem"}}
              to={{ pathname: `/edit/_` + col.row.original.id }}
              className="btn"
            >
              <AiFillEdit></AiFillEdit>
            </Link>
            <button style={{color: "rgb(220,54,68)", fontSize: "1.2rem"}}
              onClick={() => {
                // setPopMsg(`Are you sure you want to delete ${col.row.original.employee_name}?`)
                // setPopup(true);
                setIdDel(col.row.original.id);
                setDisplayInfo(false)
                setDelPopup(true);
                setToDelEmp(col.row.original.employee_name);
              }} className="btn" >
              <MdDelete></MdDelete>

            </button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns: columns, data: employeesData , initialState: {pageIndex: 0} },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps, // pagination (start)
    getTableBodyProps, // (pag n normal)
    headerGroups,      // (pag n normal)
    prepareRow,        // (pag n normal)
    rows,              // replaces rows with page

    page, //Instead of using 'rows', we'll use page, 
    //(which has only the rows for the active page)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }, // pagination (end)
  
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  // after the component has been mounted this fn will run
  useEffect(() => {
    fetchEmployees();
  },[]);


  return (
       
     
    <div className={styles.tableDiv}>
     
      <div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGolbalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        ></GlobalFilter>

      </div>
      <div >
        <table
          className={styles.tableReact}
          style={{ width: "100%" }}
          {...getTableBodyProps()}
        >
          {/* {style={{textAlign: headerGroup.headers[6].Header === "Action" ? "center" : "left"}}} */}

          <thead className="tHeadList" >
            {headerGroups.map((headerGroup) => (
              <tr className="tRowList"
                className={styles.tableHeadDb}
                {...headerGroup.getHeaderGroupProps()}
                
              >
          
                
                
                {headerGroup.headers.map((column) => (
                  <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <span style={{paddingLeft: "15px"}} ></span>

                    {column.render("Header")}{" "}
                    {column.isSorted ? (column.isSortedDesc ? <VscChevronDown style={{fontSize: "1.2rem"}}></VscChevronDown> : <VscChevronUp  style={{fontSize: "1.2rem"}}></VscChevronUp>) : ""}
                   
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
              
            {page.map((row, idxr) => {
              prepareRow(row);

              return (
                <tr className="tRowList" {...row.getRowProps()}>
                  {row.cells.map((cell, idx) => (
                    <td className="tDataList" style={{paddingLeft: "15px"}} {...cell.getCellProps()}>
                      {/* {idx === 0 ? cell.render(idxr + 1) : cell.render("Cell")} */}
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          {console.log("rendering", preGlobalFilteredRows.length)}
        </table>
        <div className="pagination">
          <div className="footerMobile">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <div>
         {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button> */}
          <button style={{backgroundColor: "white"}} onClick={() => previousPage()} disabled={!canPreviousPage}>
          {/* <GrPrevious></GrPrevious> */}
          Previous
        </button>
        <button style={{backgroundColor: "white"}} onClick={() => nextPage()} disabled={!canNextPage}>
         {/* <GrNext></GrNext> */}
        Next
        </button>
       

        </div>

        {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button> */}
         </div>

         <div className="footerMobile">
       
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px', outline: "solid 2px rgba(32, 99, 224, 0.651)", borderRadius: "5px" }}
      
          />
        </span>
        <select
          style={{ outline: "none" }}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          { [10, 20, 30, 40, 50].map(pageSize => {

            if (pageSize >= preGlobalFilteredRows.length + 10) return               
            
            return (<option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          )}
          
          )}
        </select>
       </div>
        </div>
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
          info={empInfo}
          disp={displayInfo}
          logic={() => setPopup(false)}
        ></Popup>
      ) : (
        ""
      )}
    </div>

  );
};
