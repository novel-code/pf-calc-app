import styles from './navbar.module.css';


const Navbar = ({title, btnOneName, btnTwoName, btnShowActive, onAdd, onEmpList}) => {

    return (
        <div> 
            <div className={styles.navToggle}>
            <div>
                <p style={{cursor: "default"}} className={styles.navHeader}>{title}</p>
            </div>
            <ul className={styles.navLinks} >
                <li style={{ fontWeight: btnShowActive ? 'normal': 'lighter'}}> <p  onClick={onAdd} style={{cursor: 'pointer'}} >{btnOneName}</p>  </li>
                <li style={{ fontWeight: btnShowActive ? 'lighter': 'normal'}}> <p  onClick={onEmpList} style={{cursor: 'pointer'}}  >{btnTwoName}</p> </li>
            </ul>
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