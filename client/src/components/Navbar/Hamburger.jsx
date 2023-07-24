import React, { useContext } from "react";

import "./hamburger.css";
import SidebarContext from "../LeftSidebar/LeftSidebarContext";

export const Hamburger = () => {
  // const { show, toggleSideBar } = useShowSidebar();
  const { showSidebar, toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="hambuger-con" onClick={toggleSidebar}>
      <section
        className={`hambuger ${showSidebar ? "rotate-60" : ""}`}
        id="hambuger1"
      ></section>
      <section
        className={`hambuger ${showSidebar ? "hide" : ""}`}
        id="hambuger2"
      ></section>
      <section
        className={`hambuger ${showSidebar ? "rotate--60" : ""}`}
        id="hambuger3"
      ></section>
    </div>
  );
};
