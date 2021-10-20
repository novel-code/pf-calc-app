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
                
            <Link className={styleSidebar.linkNav} style={{ fontWeight: btnActive ?"normal" : "200"}} onClick={() => setBtnActive(true)}   to={location => ({ ...location, pathname: "/add" })} ><AiOutlineUserAdd></AiOutlineUserAdd> Add</Link>

        
            <Link className={styleSidebar.linkNav}  style={{fontWeight: btnActive ? "200": "normal"}} onClick={() => setBtnActive(false)} to="/list" ><BsTable></BsTable> List</Link>
               
                


            </div>
          
        </div>
    )
}

export default Sidebar;