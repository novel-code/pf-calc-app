import { useState } from "react";


const Calculation = function (props) {

    const [pf, setPf] = useState("N/A")
    const [esi, setEsi] = useState("N/A")
    const [tax, setTax] = useState("N/A")

    // console.log(props.ctc)


    return (
        <div className="col-lg-4 col-md-12 mt-4 d-flex justify-content-end">
        {/* <div className="d-flex  flex-column"> */}
        <div className="mx-5">
          <h6>PF: <span className="pfOutput"  id="dbPF">{pf}</span></h6>
          <h6>ESI: <span className="esiOutput" id="dbESI">{esi}</span></h6>
          <h6>TAX: <span className="taxOutput" id="dbTAX">{tax}</span></h6>
        </div>
      </div>
    )
}

export default Calculation;