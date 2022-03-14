import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavLinks.module.css';
import classes1 from "./fonts.module.css";
import {VscDebugStackframeDot} from 'react-icons/vsc';


const NavLinks =(props) => {
    return (
    <ul className={classes.navlinks}> 
    <li>
      <NavLink to="/orders" activeStyle>
        <VscDebugStackframeDot className={classes.buttonB}/>
     הזמנות
  </NavLink></li>
  <li>
  <NavLink to="/inventory" activeStyle>
  <VscDebugStackframeDot className={classes.buttonB}/>
    מלאי וציוד
  </NavLink></li>
  <li><NavLink to="/volunteers" activeStyle>
  <VscDebugStackframeDot className={classes.buttonB}/>
   מתנדבים
  </NavLink></li>
  <li><NavLink to="/family" activeStyle>
  <VscDebugStackframeDot className={classes.buttonB}/>
    משפחות
  </NavLink></li>
  <li><NavLink to="/permissions" activeStyle>
  <VscDebugStackframeDot className={classes.buttonB}/>
    הרשאות
  </NavLink></li>
  <li> <NavLink to="/Monitoring" activeStyle>
  <VscDebugStackframeDot className={classes.buttonB}/>
    בקרה
  </NavLink></li>
  <li><NavLink to="/reports" activeStyle>
  <VscDebugStackframeDot className={classes.buttonB}/>
    דוחות
  </NavLink></li>
  </ul>
  
  )
    
}
export default NavLinks;