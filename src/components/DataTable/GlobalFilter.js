import { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = function ({
    preGlobalFilteredRows,
    globalFilter,
    setGolbalFilter
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
        console.log(value.length)
        console.log(preGlobalFilteredRows)
        setGolbalFilter(value || undefined )
    }, 300)

    return (  
        <div>
            <p>Search:</p>
            <input type="text" value={value || ""} onChange={(e) => {
                
                setValue(e.target.value)
                onChange(e.target.value)
            }} placeholder={`${count} records...`} ></input>
        </div> 
    )

}

