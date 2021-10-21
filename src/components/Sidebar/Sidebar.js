import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import logo from '../../assets/logo.jpg'
import styleSidebar from './sidebar.module.css'
import {BsTable} from 'react-icons/bs'
const Sidebar = function () {
    const [btnActive , setBtnActive] = useState(false);


    

    return (
        <div className={styleSidebar.sidebar}>
            <div className={styleSidebar.logoDiv}>

            <img className={styleSidebar.logoImg}  src={logo}></img>
            </div>
            <div className={styleSidebar.linkDiv}>
                
            <Link className={`${styleSidebar.linkNav} ${window.location.pathname === '/add' ? styleSidebar.tabActive : ""}`}  onClick={(e) => {
                setBtnActive(true)
            }}   to={location => ({ ...location, pathname: "/add" })} ><AiOutlineUserAdd className={`${window.location.pathname === "/add" ? styleSidebar.tabLogo: ""}`} style={{fontSize: "1.3rem", marginRight: "0.5rem"}}></AiOutlineUserAdd > Add</Link>

        
            <Link className={`${styleSidebar.linkNav} ${window.location.pathname === '/list' ? styleSidebar.tabActive  : ""}`} onClick={(e) => {
                setBtnActive(false)
            }} to="/list" ><BsTable className={`${window.location.pathname === "/list" ? styleSidebar.tabLogo: ""}`} style={{fontSize: "1.3rem", marginRight: "0.5rem"}} ></BsTable> List</Link>
               
                


            </div>
          
        </div>
    )
}

export default Sidebar;