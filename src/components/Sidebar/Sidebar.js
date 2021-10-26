import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import logo from "../../assets/logo.jpg";
import styleSidebar from "./sidebar.module.css";
import { BsTable } from "react-icons/bs";
const Sidebar = function () {

  return (
    <div className={styleSidebar.sidebar}>
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
          Add
        </NavLink>

        <NavLink
          className={styleSidebar.linkNav}
          activeClassName={styleSidebar.selected}
          to="/list"
        >
          <BsTable
            style={{ fontSize: "1.3rem", marginRight: "0.5rem" }}
          ></BsTable>{" "}
          List
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
