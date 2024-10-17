import { useState, useEffect } from "react";
import "../App.css";
import logo from "../assets/logobus.svg";

function Header() {

  return (
    <header>
        <div class="logo">
            <img src={logo} alt="Logo webu"></img>
        </div>

       <h1>APA</h1>
    </header>
  );
}

export default Header;
