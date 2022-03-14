import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavLinks.module.css";
import  "./Dropdown.module.css";
import { VscDebugStackframeDot } from "react-icons/vsc";
import Dropdown from '../Menu/Dropdown'


const NavLinks = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth <1500) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth <1500) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <ul className={classes.navlinks}>
      <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <NavLink to="/orders" activeStyle  onClick={closeMobileMenu}>
          <VscDebugStackframeDot className={classes.buttonB} />
          הזמנות
          <i className="fas fa-caret-down" />
        </NavLink>
        {dropdown && <Dropdown />}
      </li>
      <li>
        <NavLink to="/inventory" activeStyle>
          <VscDebugStackframeDot className={classes.buttonB} />
          מלאי וציוד
        </NavLink>
      </li>
      <li>
        <NavLink to="/volunteers" activeStyle>
          <VscDebugStackframeDot className={classes.buttonB} />
          מתנדבים
        </NavLink>
      </li>
      <li>
        <NavLink to="/family" activeStyle>
          <VscDebugStackframeDot className={classes.buttonB} />
          משפחות
        </NavLink>
      </li>
      <li>
        <NavLink to="/permissions" activeStyle>
          <VscDebugStackframeDot className={classes.buttonB} />
          הרשאות
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/Monitoring" activeStyle>
          <VscDebugStackframeDot className={classes.buttonB} />
          בקרה
        </NavLink>
      </li>
      <li>
        <NavLink to="/reports" activeStyle>
          <VscDebugStackframeDot className={classes.buttonB} />
          דוחות
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
