import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";



export const DbEmployees = function(props) {

    const [dbEmployees, setDbEmployees] = useState([]);

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:8080/employee/getAll').catch(err => console.log(err))

        if(response) {
            const dbEmployees = response.data;

            console.log("Employees:", dbEmployees)
            setDbEmployees(dbEmployees)
        }
    }

    const data = useMemo(()=> ([
        {
            "id": "251",
            "employee_name": "Hello",
            "gender": "m",
            "date_of_joining": "2021-10-02",
            "designation": "Cyber Security",
            "ctc": 345534.0,
            "esi": 13800.0,
            "pf": 41500.0,
            "tax": 17300.0,
            "created_data_and_time": "2021-10-04 14:35:03",
            "updated_date_and_time": "2021-10-05 16:45:49"
        },
        {
            "id": "257",
            "employee_name": "multiple de check",
            "gender": "o",
            "date_of_joining": "2021-10-01",
            "designation": "Cyber Security",
            "ctc": 6574567.0,
            "esi": 263000.0,
            "pf": 789000.0,
            "tax": 2080000.0,
            "created_data_and_time": "2021-10-04 17:14:25",
            "updated_date_and_time": "2021-10-05 14:44:27"
        }
    ]),[])

    const columns = useMemo(() => ([
        {
            Header: "Id",
            accessor: 'id'
        },
        {
            Header: "Employee Name",
            accessor: 'employee_name'
        },
        {
            Header: "Gender",
            accessor: 'gender'
        },
    ]),[])

    const employeesData = useMemo(() => [...dbEmployees, [dbEmployees]]);

    const employeesColumns = useMemo(() => dbEmployees[0] ? Object.keys(dbEmployees[0]).filter((key) => key !== 'rating' ).map((key) => {
        return { Header: key, accessor: key };
    }): [], [dbEmployees]);

    const tableInstance = useTable({ columns: employeesColumns, data: employeesData  });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    useEffect(() => {
        fetchEmployees()
    }, [])

    const isEven = (idx) => idx % 2 === 0;
    
    return (
        <table {...getTableBodyProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{ column.render("Header") }</th>
                        ))}
                    </tr>
                ))}
                
            </thead>
            <tbody {...getTableBodyProps()}>
            
                {rows.map((row, idx) => {
                    prepareRow(row);

                    return <tr {...row.getRowProps()} className={isEven(idx) ? "evenRowColor": ""} >

{row.cells.map((cell, idx) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}

                    </tr>


                    

                 
                })}
                
               
            </tbody>
        </table>
        

        )

}