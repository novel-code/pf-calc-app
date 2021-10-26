import { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = function ({
  preGlobalFilteredRows,
  globalFilter,
  setGolbalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    console.log(value.length);
    console.log(preGlobalFilteredRows);
    setGolbalFilter(value || undefined);
  }, 300);

  return (
    <div className="searchDiv">
      <div style={{ display: "flex" }}>
        <div className="searchTextDiv">Search:</div>
        <div className="searchInputDiv">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
          ></input>
        </div>
        {/* placeholder={`${count} records...`}  */}
      </div>
      <div>
        <p style={{ whiteSpace: "nowrap" }}> {count} records...</p>
      </div>
    </div>
  );
};
