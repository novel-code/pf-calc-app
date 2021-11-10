import { deleteEmpFlag } from "../Requests/DeleteEmpFlag";
import styles from "./popup.module.css";

const Popup = function ({ logic, sucOrFailMsg, cancelBtn, id, info, disp }) {
  return (
    <div className={styles.modal}>
     
      <div className={styles.modalContent} style={{ width: "400px" }}>
      
        {/* <p>{sucOrFailMsg}</p> */}
        <div>
          {disp ? (
            <div>
              <button>edit</button>
              <div style={{paddingBottom: "20px"}}><img style={{width: "70px", height: "70px", borderRadius: "50%"}} src={info.profile_img}></img></div>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p>Name: </p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  <p>{info.employee_name}</p>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p>Gender:</p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  {" "}
                  <p>
                    {" "}
                    {info.gender === "m"
                      ? "Male"
                      : `${info.gender === "f" ? "Female" : "Others"}`}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p>Date of Joining:</p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  {" "}
                  <p> {info.date_of_joining}</p>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p>Designation:</p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  {" "}
                  <p> {info.designation}</p>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p>CTC:</p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  {" "}
                  <p> {info.ctc}</p>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p>ESI:</p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  {" "}
                  <p> {info.esi}</p>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p>PF:</p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  {" "}
                  <p> {info.pf}</p>
                </div>
              </div>
              <div className="row">
                <div className="col" style={{ textAlign: "left" }}>
                  <p>TAX:</p>
                </div>
                <div className="col" style={{ textAlign: "left" }}>
                  {" "}
                  <p> {info.tax}</p>
                </div>
              </div>
            </div>
          ) : (
            sucOrFailMsg
          )}
        </div>
        {/* <p>{info}</p> */}
        <div>
          <p>
            <button
              onClick={() => {
                if (!cancelBtn) {
                  logic();
                } else {
                  deleteEmpFlag(id);
                  alert("deleted");
                  logic();
                }
              }}
              className={styles.close}
              style={{ marginRight: "1rem" }}
            >
              OK
            </button>
            {cancelBtn ? (
              <button onClick={logic} className={styles.close}>
                Cancel
              </button>
            ) : (
              ""
            )}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
