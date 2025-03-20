import React  from "react";
import { NavLink } from "react-router-dom";
import "./App.css";

const Navbar =() =>{
    return(
        <div className ="Navbar">
            <ul className="lists">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                <NavLink to="about/">About</NavLink>
                </li>
                <li> <NavLink to="Contact/">Contact</NavLink></li>
                <li> <NavLink to="posts/">FetchAPI</NavLink></li>
                <li> <NavLink to="data/">data</NavLink></li>
            </ul>
        </div>
    );
};


export default Navbar;