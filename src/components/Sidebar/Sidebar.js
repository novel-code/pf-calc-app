import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import logo from "../../assets/logo.jpg";
import styleSidebar from "./sidebar.module.css";
import { BsTable } from "react-icons/bs";
import { GrClose, GrMenu } from "react-icons/gr";
import Navbar from "../Navbar/Navbar";
const Sidebar = function ({ mobileView }) {
  const [sidebar, setSidebar] = useState(false);
  const [mobileBar, setMobileBar] = useState(true);

  return (
    <div>
      {console.log("rendering")}

      {/* z-index: 9999;
    position: fixed; */}

      <div
        style={{
          width: "30px",
          zIndex: "999",
          position: "fixed",
          left: "20px",
          top: "15px",
        }}
        className="mobileViewDiv"
      >
        <button
          style={{ backgroundColor: "white" }}
          onClick={() => {
            setMobileBar(!mobileBar);
          }}
        >
          {mobileBar ? <GrClose></GrClose> : <GrMenu></GrMenu>}
        </button>
      </div>
      {mobileBar ? (
        <div
          className="sidebar"
          style={{ width: sidebar ? "80px" : "", transition: "0.3s" }}
        >
          <div className="toggleBtnDiv" style={{ alignSelf: "center", paddingTop: "15px" }}>
            <button
              className="sidebarButton"
              style={{ backgroundColor: "white" }}
              onClick={() => {
                setSidebar(!sidebar);
              }}
            >
              {sidebar ? <GrMenu></GrMenu> : <GrClose></GrClose>}
            </button>
          </div>
          <div className={styleSidebar.logoDiv}>
            <img alt="logo" className={styleSidebar.logoImg} src={logo}></img>
          </div>

          <div className={styleSidebar.linkDiv}>
            <NavLink
              style={{ justifyContent: "center", display: "flex" }}
              className={styleSidebar.linkNav}
              activeClassName={styleSidebar.selected}
              to={(location) => ({ ...location, pathname: "/add" })}
            >
              <AiOutlineUserAdd
                style={{ fontSize: "1.3rem", marginRight: "0.5rem" }}
              ></AiOutlineUserAdd>{" "}
              {sidebar ? "" : <span className="sidebarButton">Add</span>}
            </NavLink>

            <NavLink
              style={{ justifyContent: "center", display: "flex" }}
              className={styleSidebar.linkNav}
              activeClassName={styleSidebar.selected}
              to="/list"
            >
              <BsTable
                style={{ fontSize: "1.3rem", marginRight: "0.5rem" }}
              ></BsTable>{" "}
              {sidebar ? "" : <span className="sidebarButton">List</span>}
            </NavLink>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
