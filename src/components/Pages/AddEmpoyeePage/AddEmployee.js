import { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import Select from "react-select";
import Popup from "../../Navbar/Popup";
import moment from "moment";
import { postEmployee } from "../../Requests/PostEmployee";
import { updateEmployee } from "../../Requests/UpdateEmployee";
import styles from "./AddEmployee.module.css";

const AddEmployee = ({ onEdit }) => {
  const [empName, setText] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [designation, setDesignation] = useState(() => "none");
  const [ctc, setCtc] = useState("");
  const [pf, setPf] = useState("N/A");
  const [esi, setEsi] = useState("N/A");
  const [tax, setTax] = useState("N/A");
  const [nameMessage, setNameMessage] = useState("");
  const [dojMessage, setDojMessage] = useState("");
  const [designationMessage, setDesignationMessage] = useState("");
  const [ctcMessage, setCtcMessage] = useState("");
  const [popup, setPopup] = useState(false);
  const [updateDP, setUpdateDP] = useState(false);

  const [popMsg, setPopMsg] = useState("");
  const [updateDate, setUpdateDate] = useState("");

  const male = document.getElementById("formHorizontalRadios1");
  const female = document.getElementById("formHorizontalRadios2");
  const others = document.getElementById("formHorizontalRadios3");
  const maleRef = useRef();
  const othersRef = useRef();
  const femaleRef = useRef();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const colourStyles = {
    option: (_, { data }) => {
      console.log(data.value);

      return {
        cursor: "pointer",
        color: data.value === "vanilla" ? "red" : "",
      };
    },
  };

  const validationMessage = function (empName, ctc, designation, doj) {
    if (empName.length < 3) {
      setNameMessage("name should be alteast 3 charecters long");
    }

    if (ctc < 50000) {
      setCtcMessage("Ctc should be greater than 50000");
    }

    if (designation === "none") {
      setDesignationMessage("select a designation");
    }

    if (doj === "") {
      setDojMessage("please select a date");
    }
  };

  const afterSubmitAndUpdate = function (
    empName,
    dateOfJoin,
    designation,
    ctc,
    action,
    e
  ) {
    if (
      empName.length > 2 &&
      dateOfJoin !== "" &&
      designation !== "none" &&
      ctc > 50000
    ) {
      action(e);
      setNameMessage("");
      setDesignation("none");
      setCtc("");
      setDateOfJoin("");
      document.getElementById("formHorizontalRadios1").checked = true;
    }
  };

  const fetchSingleRecord = function (id) {
    if (id === undefined) return;

    const axios = require("axios");

    const config = {
      method: "get",
      url: `http://localhost:8080/employee/single/${id}`,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);

        const nameEdit = response.data.employee_name;

        setText(nameEdit);

        if (response.data.gender === "m") {
          maleRef.current.checked = true;
        } else if (response.data.gender === "f") {
          femaleRef.current.checked = true;
        } else {
          othersRef.current.checked = true;
        }

        setDesignation(response.data.designation);
        setCtc(response.data.ctc);
        setPf(pfAndEsiCalc(response.data.ctc)[0]);
        setEsi(pfAndEsiCalc(response.data.ctc)[1]);
        setTax(taxCalc(response.data.ctc));
        setUpdateDate(response.data.date_of_joining);
        setUpdateDP(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const id = window.location.pathname.split("_")[1];

  useEffect(() => {
    fetchSingleRecord(id);
  }, []);

  const onSubmitHandler = function (e) {
    e.preventDefault();

    let empGender;

    if (male.checked) {
      empGender = male.value;
    } else if (female.checked) {
      empGender = female.value;
    } else {
      empGender = others.value;
    }

    console.log(ctc);

    const formDate = moment(dateOfJoin).format("yy-MM-DD");

    const formTax = isNaN(tax) ? 0 : tax;

    const postEmpObj = {
      employee_name: `${empName}`,
      gender: `${empGender.charAt(0)}`,
      date_of_joining: `${formDate}`,
      designation: `${designation}`,
      ctc: `${ctc}`,
      esi: `${pf}`,
      pf: `${esi}`,
      tax: `${formTax}`,
    };

    const editUrl = window.location.pathname.split("/")[1];

    if (window.location.pathname === "/add") {
      postEmployee(postEmpObj)
        .then(function () {
          setPopMsg("Employee Record added successfully!");
          setPopup(true);
        })
        .catch(function (error) {
          setPopMsg("Oops! Something went wrong.");
          setPopup(true);
        });

      console.log("add");
    } else if (editUrl === "edit") {
      const updateId = window.location.pathname.split("/")[2].replace("_", "");

      postEmpObj.id = updateId;

      postEmpObj.date_of_joining = updateDate;

      updateEmployee(postEmpObj, updateId)
        .then(() => {
          setPopMsg("updated succesfully!");
          setPopup(true);
        })
        .catch((err) => {
          setPopMsg("something went wrong");
          setPopup(true);
        });
    }

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
    setNameMessage("");

    setText(nameVal);
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

  const validDateInput = function (e) {
    e.target.value = "";
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.formBg}>
        <div className={styles.formStyle2}>
          <form className={styles.formAdd}>
            <div className="row">
              <div className="col-lg-8 col-md-12">
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
                  <div style={{ color: "red" }}>{nameMessage}</div>
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
                            ref={maleRef}
                          />
                        </Col>
                        <Col className="mt-2">
                          <Form.Check
                            type="radio"
                            value="female"
                            label="Female"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            onLoad={() => console.log("djflfh")}
                            ref={femaleRef}
                          />
                        </Col>
                        <Col className="mt-2">
                          <Form.Check
                            ref={othersRef}
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
                    {updateDP ? (
                      <input
                        value={updateDate}
                        type="date"
                        onChange={(date) => setUpdateDate(date.target.value)}
                      ></input>
                    ) : (
                      <DatePicker
                        onInput={(e) => validDateInput(e)}
                        maxDate={new Date()}
                        id="doj"
                        dayPlaceholder="DD"
                        monthPlaceholder="MM"
                        yearPlaceholder="YYY"
                        value={dateOfJoin}
                        onChange={(dateOfJoin) => {
                          console.log(dateOfJoin);
                          setDojMessage("");
                          setDateOfJoin(dateOfJoin);
                        }}
                        className="mx-3"
                      ></DatePicker>
                    )}

                    {/* <input type="date" onInput={(e) => validDateInput(e)} value={dateOfJoin} ></input> */}
                    <div style={{ color: "red" }}>{dojMessage}</div>
                  </div>

                  <div
                    style={{
                      width: "auto",
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          height: "1px",
                          backgroundColor: "white",
                          borderRadius: "5px",
                        }}
                      >
                        <div
                          style={{
                            zIndex: "0",
                            marginBottom: "-25px",
                            border: "solid 1px rgb(179, 179, 179)",
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: "white",
                          }}
                        >
                          Upload profile image
                        </div>

                        <input
                          onClick={(e) => {
                            console.log(e.target);
                          }}
                          style={{ width: "100%", opacity: "0", zIndex: "4" }}
                          id="uploadImage"
                          type="file"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label>Designation:</label>
                    <Form.Select
                      value={designation}
                      onChange={(e) => {
                        setDesignation(e.target.value);
                        setDesignationMessage("");
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
                    {/* <div>
                      <Select styles={colourStyles} options={options}></Select>
                    </div> */}
                    <div style={{ color: "red" }}>{designationMessage}</div>
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
                    <div style={{ color: "red" }}>{ctcMessage}</div>
                  </div>
                  <div className="d-flex justify-content-around">
                    {onEdit === undefined ? (
                      <button
                        className="btn btn-primary mt-3"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();

                          validationMessage(
                            empName,
                            ctc,
                            designation,
                            dateOfJoin
                          );

                          afterSubmitAndUpdate(
                            empName,
                            dateOfJoin,
                            designation,
                            ctc,
                            onSubmitHandler,
                            e
                          );
                        }}
                      >
                        Save Employee
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* <div className="d-flex  flex-column"> */}
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-end">
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
          </form>
          {onEdit !== undefined ? (
            <div className="d-flex justify-content-around">
              {" "}
              <button
                onClick={(e) => {
                  validationMessage(empName, ctc, designation, updateDate);
                  afterSubmitAndUpdate(
                    empName,
                    updateDate,
                    designation,
                    ctc,
                    onSubmitHandler,
                    e
                  );
                }}
                className="btn btn-primary mt-3"
              >
                edit
              </button>{" "}
            </div>
          ) : (
            ""
          )}
        </div>

        {popup ? (
          <Popup sucOrFailMsg={popMsg} logic={() => setPopup(false)}></Popup>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddEmployee;
