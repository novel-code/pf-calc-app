import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = ({ title, btnOneName, btnTwoName }) => {
  const [btnActive, setBtnActive] = useState(false);

  return (
    <div>
      <div className={styles.navToggle}>
        <div>
          <p style={{ cursor: "default" }} className={styles.navHeader}>
            {title}
          </p>
        </div>

        <div style={{ paddingTop: "0.2rem" }}>
          {/* <Link
            className={styles.navLinks}
            style={{ fontWeight: btnActive ? "normal" : "200" }}
            onClick={() => setBtnActive(true)}
            to={(location) => ({ ...location, pathname: "/add" })}
          >
            {btnOneName}
          </Link>
          <Link
            className={styles.navLinks}
            style={{ fontWeight: btnActive ? "200" : "normal" }}
            onClick={() => setBtnActive(false)}
            to="/list"
          >
            {btnTwoName}
          </Link> */}
        </div>
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Employee Details",
  btnOneName: "Add",
  btnTwoName: "Employee List",
};

// CSS IN JS
// const NavbarStyle = {
//     color: "red",
//     backgroundColor: "black"
// }

export default Navbar;
