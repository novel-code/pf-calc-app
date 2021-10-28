import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import logo from "../../assets/logo.jpg";
import styleSidebar from "./sidebar.module.css";
import { BsTable } from "react-icons/bs";
import {GrClose, GrMenu} from "react-icons/gr"
import Navbar from "../Navbar/Navbar";
const Sidebar = function () {
  const [sidebar, setSidebar] = useState(false)
  return (
    <div>
     <div style={{textAlign: "center", paddingTop: "16px", paddingBottom: "17px" }}>
        
        <button style={{backgroundColor: "white"}} onClick={() => setSidebar(!sidebar)}>{sidebar ? <GrMenu></GrMenu> : <GrClose></GrClose>}</button>
        </div>
      
   
    <div className={styleSidebar.sidebar} style={{width: sidebar ? "90px" : "", transition: "0.3s"}}>
      <div className={styleSidebar.logoDiv}>
        <img alt="logo" className={styleSidebar.logoImg} src={logo}></img>
      </div>
    
      <div className={styleSidebar.linkDiv}>
        <NavLink

          className={styleSidebar.linkNav}
          activeClassName={styleSidebar.selected}
          to={(location) => ({ ...location, pathname: "/add" })}
        >
          <AiOutlineUserAdd
            style={{ fontSize: "1.3rem", marginRight: "0.5rem" }}
          ></AiOutlineUserAdd>{" "}
          {sidebar ? "" : "Add"}</NavLink>

        <NavLink
          className={styleSidebar.linkNav}
          activeClassName={styleSidebar.selected}
          to="/list"
        >
          <BsTable
            style={{ fontSize: "1.3rem", marginRight: "0.5rem" }}
          ></BsTable>{" "}

         {sidebar ? "" : "List"}
        </NavLink>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
