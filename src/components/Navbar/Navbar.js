import { useState } from 'react';
import { Link, matchPath } from 'react-router-dom';
import styles from './navbar.module.css';


const Navbar = ({title, btnOneName, btnTwoName, btnShowActive, onAdd, onEmpList}) => {

    const [btnActive , setBtnActive] = useState(false);
    
    return (
        <div> 
            <div className={styles.navToggle}>
            <div>
                <p style={{cursor: "default"}} className={styles.navHeader}>{title}</p>

            </div >
            
            {/* <ul className={styles.navLinks} >
                <li style={{ fontWeight: btnShowActive ? 'normal': 'lighter'}}> <p  onClick={onAdd} style={{cursor: 'pointer'}} >{btnOneName}</p>  </li>
                <li style={{ fontWeight: btnShowActive ? 'lighter': 'normal'}}> <p  onClick={onEmpList} style={{cursor: 'pointer'}}  >{btnTwoName}</p> </li>
            </ul> */}




            <div style={{paddingTop: "0.2rem"}}>
            <Link  className={styles.navLinks} style={{ fontWeight: btnActive ?"normal" : "200"}} onClick={() => setBtnActive(true)}   to={location => ({ ...location, pathname: "/add" })} >{btnOneName}</Link>
            <Link className={styles.navLinks} style={{fontWeight: btnActive ? "200": "normal"}} onClick={() => setBtnActive(false)} to="/list" >{btnTwoName}</Link>

            </div>
           </div>
           
        </div>
    )
}

Navbar.defaultProps = {
    title: "Employee Details",
    btnOneName: "Add",
    btnTwoName: "Employee List",
}

// CSS IN JS
// const NavbarStyle = {
//     color: "red",
//     backgroundColor: "black"
// }


export default Navbar;