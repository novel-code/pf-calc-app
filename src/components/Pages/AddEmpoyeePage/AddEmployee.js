
import moment from "moment";

import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import Popup from "../../Navbar/Popup";
import { postEmployee } from "../../Requests/PostEmployee";
import styles from "./AddEmployee.module.css";

const AddEmployee = ({ onAdd, submitPopup }) => {
  const [empName, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [designation, setDesignation] = useState(() => "none");
  const [ctc, setCtc] = useState("");
  const [pf, setPf] = useState("N/A");
  const [esi, setEsi] = useState("N/A");
  const [tax, setTax] = useState("N/A");
  const [nameMessage, setNameMessage] = useState("");
  const [dojMessage, setDojMessage] = useState("")
  const [designationMessage, setDesignationMessage] = useState("")
  const [ctcMessage, setCtcMessage] = useState("")
  

  //   const [designation, setDesignation] = useState("");
  //   const [gender, setGender] = useState("");

  const onSubmitHandler = function (e) {
    e.preventDefault();

    const male = document.getElementById("formHorizontalRadios1");
    const female = document.getElementById("formHorizontalRadios2");
    const others = document.getElementById("formHorizontalRadios3");
    // if (!text || !designation || !gender) {
    //   alert("Please enter all the fields");
    //   return;
    // }
    let empGender;

    if (male.checked) {
      setChecked(true);
      empGender = male.value;
    } else if (female.checked) {
      setChecked(true);
      empGender = female.value;
    } else {
      setChecked(true);
      empGender = others.value;
    }

    console.log(ctc);

    const formDate = moment(dateOfJoin).format(
      "yy-MM-DD"
    );

    const postEmpObj = {
      "employee_name": `${empName}`,
      "gender": `${empGender.charAt(0)}`,
    "date_of_joining": `${formDate}`,
      "designation": `${designation}`,
      "ctc": `${ctc}`,
      "esi": `${pf}`,
      "pf": `${esi}`,
      "tax": `${tax}`
    }

    onAdd({
      empName,
      gender: [empGender, checked],
      dateOfJoin,
      designation,
      ctc,
      pf,
      esi,
      tax,
    });

    // const renderPopup = function (popupMsg) {
    //   return(<Popup msg={popupMsg}></Popup>)
    // }

    const postPromise  =  postEmployee(postEmpObj)

     postPromise.then(function () {
       
      const popupMsg = "Successfully saved employee record"

      console.log(popupMsg +' call back')

      submitPopup({
        show: true,
        message: popupMsg,
      })
      
    }).catch(function (error) {
      
      const popupMsg = "failed"

      console.log(popupMsg + "call back")

      submitPopup({
        show: true,
        message: popupMsg,
      })
      
    });
    
    setText("");
  };

  const allowCtc = function (e) {
    const ctcVal = e.target.value.replace(/[^0-9]/gi, "");

    if (ctcVal.length === 11) return;

    setCtc(ctcVal);
    if (ctcVal > 50000) {
      setPf(pfAndEsiCalc(ctcVal)[0]);
      setEsi(pfAndEsiCalc(ctcVal)[1]);
      setTax(taxCalc(ctcVal));
    } else {
      setPf("N/A");
      setEsi("N/A");
      setTax("N/A");
    }

    if (isNaN(taxCalc(ctcVal))) setTax("N/A");
  };

  const allowName = function (e) {
    const nameVal = e.target.value.replace(/[^a-z A-Z]/gi, "");

    if (nameVal.length > 25) return;

    setText(nameVal);

    if (nameVal.length < 3) {
      setNameMessage("name should be alteast 3 charecters long");
    } else {
      setNameMessage("");
    }
  };

  const pfAndEsiCalc = function (value) {
    const onePercent = value / 100;
    const pf = Math.round(onePercent * 12 * 100) / 100;
    const esi = Math.round(onePercent * 4 * 100) / 100;
    return [pf, esi];
  };

  // Returns calculated tax
  const taxCalc = function (value) {
    const amount = value;
    const onePercent = amount / 100;
    if (amount > 300000 && amount <= 500000) {
      return (onePercent * 5).toFixed(2);
    } else if (amount > 500000 && amount <= 1000000) {
      return (10000 + onePercent * 20).toFixed(2);
    } else if (amount > 1000000) {
      return (110000 + onePercent * 30).toFixed(2);
    }
  };

  return (
    <div className={styles.formBg}>
      
      <div className={styles.formStyle2}>
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <form className={styles.formAdd}>
              <div>
                <div>
                  <h3>Employee PF Calculator</h3>
                </div>
                <div className="mt-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={empName}
                    onInput={allowName}
                  ></input>
                </div>
                <div>{nameMessage}</div>
                <fieldset>
                  <Form.Group className="mb-3">
                    <Row lg={6} md={6} sm={8}>
                      <Col>
                        <Form.Label as="legend" column sm={2}>
                          Gender:
                        </Form.Label>
                      </Col>

                      <Col className="mt-2">
                        <Form.Check
                          type="radio"
                          label="Male"
                          value="male"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios1"
                          defaultChecked
                        />
                      </Col>
                      <Col className="mt-2">
                        <Form.Check
                          type="radio"
                          value="female"
                          label="Female"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios2"
                        />
                      </Col>
                      <Col className="mt-2">
                        <Form.Check
                          type="radio"
                          value="others"
                          label="Others"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios3"
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </fieldset>

                <div>
                  <label>Date of Joining:</label>
                  <DatePicker
                    maxDate={new Date()}
                    id="doj"
                    
                    value={dateOfJoin}
                    onChange={(dateOfJoin) => {
                      setDojMessage("")
                      setDateOfJoin(dateOfJoin)
                    }}
                    className="mx-3"
                  ></DatePicker>
                  <div>{dojMessage}</div>
                </div>
                <div className="mt-3">
                  <label>Designation:</label>
                  <Form.Select
                    value={designation}
                    onChange={(e) => {
                      setDesignation(e.target.value)
                      setDesignationMessage("")
                      
                    }}
                    className="mt-2"
                    aria-label="Default select example"
                  >
                    <option value="none">Select an Option</option>
                    <option value="Front-End Developer">
                      Front-End Developer
                    </option>
                    <option value="Back-End Developer">
                      Back-End Developer
                    </option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Dev Ops">Dev Ops</option>
                  </Form.Select>
                  <div>{designationMessage}</div>
                </div>
                <div className="mt-3">
                  <label className="form-label">CTC per year:</label>
                  <input
                    pattern="[0-9]*"
                    onInput={allowCtc}
                    onChange={() => setCtcMessage("")}
                    value={ctc}
                    type="text"
                    className="form-control"
                  ></input>
                  <div>{ctcMessage}</div>
                </div>
                <div className="d-flex justify-content-around">
                  <button
                    className="btn btn-primary mt-3"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();

                      if (ctc < 50000) {
                        setCtcMessage("Ctc should be greater than 50000")
                      }
                      
                      if(designation === "none") {
                        setDesignationMessage("select a designation")
                      }

                      if(dateOfJoin === "") {
                        setDojMessage("please select a date")
                      }

                      // if (designation === "none") return;

                      if (empName.length > 2 && (dateOfJoin !== "") && designation !== "none" && ctc > 50000) {
                        onSubmitHandler(e);
                        setDesignation("none");
                        setCtc("")
                        setDateOfJoin("")
                        document.getElementById("formHorizontalRadios1").checked = true;
                      }
                    }}
                  >
                    Save Employee
                  </button>
                </div>
              </div>
              {/* <div className="d-flex  flex-column"> */}
            </form>
          </div>
          <div className="col-lg-4">
            <h6>
              PF:{" "}
              <span className="pfOutput" id="dbPF">
                {pf}
              </span>
            </h6>
            <h6>
              ESI:{" "}
              <span className="esiOutput" id="dbESI">
                {esi}
              </span>
            </h6>
            <h6>
              TAX:{" "}
              <span className="taxOutput" id="dbTAX">
                {tax}
              </span>
            </h6>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default AddEmployee;
