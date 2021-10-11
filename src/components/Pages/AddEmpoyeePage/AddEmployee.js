import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import Calculation from "../../Calculation";
import styles from "./AddEmployee.module.css";


const AddEmployee = ({ onAdd }) => {
  const [empName, setText] = useState("");
  const [checked, setChecked] = useState(true);
  const [dateOfJoin, setDateOfJoin] = useState(new Date());
  const [designation, setDesignation] = useState(() => "none");
  const [ctc, setCtc] = useState("");
  
  //   const [designation, setDesignation] = useState("");
  //   const [gender, setGender] = useState("");

  const onSubmit = (e) => {
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

    onAdd({
      empName,
      gender: [empGender, checked],
      dateOfJoin,
      designation,
      ctc,
      
    });

    setText("");
  };

  let ctcNum;
  const numberCtcValidate = function (e) {
    ctcNum = e.target.validity.valid ? e.target.valid : ctc;
    console.log(ctcNum);
   setCtc(ctcNum)
}
  
  return (
    <div className={styles.formBg}>
      <div className={styles.formStyle2}>
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <form className={styles.formAdd} onSubmit={onSubmit}>
                <div>
                    <h3>Employee PF Calculator</h3>
                </div>
              <div className="mt-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={empName}
                  onChange={(e) => setText(e.target.value)}
                ></input>
              </div>
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
                  id="doj"
                  value={dateOfJoin}
                  onChange={(dateOfJoin) => setDateOfJoin(dateOfJoin)}
                  className="mx-3"
                ></DatePicker>
              </div>
              <div className="mt-3">
                <label>Designation:</label>
                <Form.Select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="mt-2"
                  aria-label="Default select example"
                >
                  <option value="none">Select an Option</option>
                  <option value="Front-End Developer">
                    Front-End Developer
                  </option>
                  <option value="Back-End Developer">Back-End Developer</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Dev Ops">Dev Ops</option>
                </Form.Select>
              </div>
              <div className="mt-3">
                <label className="form-label">CTC per year:</label>
                <input
                    pattern="[0-9]*"
                    onInput={numberCtcValidate}
                  value={ctcNum}
                  
                  type="text"
                  className="form-control"
                ></input>
              </div>
              
            </form>
          </div>
          
         <Calculation ctc={ctc}></Calculation>
          <div className="d-flex justify-content-around">
            <input
              className="btn btn-primary mt-3"
              type="submit"
              value="Save Employee"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
