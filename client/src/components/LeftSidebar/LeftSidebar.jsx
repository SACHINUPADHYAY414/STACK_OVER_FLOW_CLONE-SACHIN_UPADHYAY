import React, { memo, useContext } from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import SidebarContext from "./LeftSidebarContext";

const LeftSidebar = memo(() => {
  const { showSidebar, toggleSidebar } = useContext(SidebarContext);

  return (
    <>
      <div className={`left-sidebar`} data-animate={showSidebar}>
        <nav className="side-nav">
          <NavLink
            to="/"
            className="side-nav-links"
            activeclassname="active"
            onClick={toggleSidebar}
          >
            <p>Home</p>
          </NavLink>
          <div className="side-nav-div">
            <div>
              <p>PUBLIC</p>
            </div>
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeclassname="active"
              onClick={toggleSidebar}
            >
              <img src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Questions </p>
            </NavLink>
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeclassname="active"
              onClick={toggleSidebar}
              style={{ paddingLeft: "40px" }}
            >
              <p>Tags</p>
            </NavLink>
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
              onClick={toggleSidebar}
            >
              <p>Users</p>
            </NavLink>
            <NavLink
              to="/chatai"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
              onClick={toggleSidebar}
            >
              <p>Chat AI</p>
            </NavLink>
            <NavLink
              to="/social"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
              onClick={toggleSidebar}
            >
              <p>Posts</p>
            </NavLink>
            <NavLink
              to="/subscription"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
              onClick={toggleSidebar}
            >
              <p>Subscription</p>
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
});

export default LeftSidebar;
