import { useState, useEffect } from "react";
import "../App.css";
import logo from "../assets/logobus.svg";

function Header() {

  return (
    <header>
        <div class="logo">
            <img src={logo} alt="Logo webu"></img>
        </div>

        <div class="menu-toggle" id="menu-toggle">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>

        <nav id="nav">
            <ul>
                <li><a href="stranka1.html">Stránka 1</a></li>
                <li><a href="stranka2.html">Stránka 2</a></li>
                <li><a href="stranka3.html">Stránka 3</a></li>
                <li><a href="stranka4.html">Stránka 4</a></li>
                <li><a href="stranka5.html">Stránka 5</a></li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;
