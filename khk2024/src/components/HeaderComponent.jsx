import { useState, useEffect } from "react";
import "../App.css";
import logo from "../assets/logobus.svg";

function Header() {

  return (
    <header>
        <div className="logo">
            <img src={logo} alt="Logo webu"></img>
        </div>

        <div className="menu-toggle" id="menu-toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>

       <h1>APA</h1>
    </header>
  );
}

export default Header;
