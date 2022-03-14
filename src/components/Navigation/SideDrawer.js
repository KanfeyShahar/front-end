import React, { useContext ,useEffect} from "react";
import { getUsers,getPermissions} from "../../actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classes from "./NavLinks.module.css";
import classes1 from "./Dropdown.module.css";
import * as RiIcons from "react-icons/ri";
import { AuthContext } from "../../store/auth-context";

const App = (props) =>{
  const auth = useContext(AuthContext);
  const permissions = props.users.filter((x)=>x.id === auth.userId)[0]?.type_permission
  useEffect(() => {
    props.getUsers()
    props.getPermissions()
  },[]);

  return (
    <ul className={classes.navlinks}>
      {auth.isLoggedIn && (
        <div className={classes1.dropdown}>
          <button className={classes1.dropbtn}>
            {props.permissions.filter((y)=>y.type_permission===permissions && (y.hall !=="אין הרשאה" || y.rooms !=="אין הרשאה" || y.products !=="אין הרשאה" ||y.orders !=="אין הרשאה")).length>0&&<NavLink to="/order" activeStyle>
              הזמנות <RiIcons.RiArrowDownSFill />
            </NavLink>}
            <i class="fa fa-caret-down"></i>
          </button>
          <div className={classes1.dropdowncontent}>
            {props.permissions.filter((y)=>y.type_permission===permissions && y.hall !=="אין הרשאה" ).length>0&& <NavLink to="/orders/calender" activeStyle>
              ניהול אולם
            </NavLink>}
            {props.permissions.filter((y)=>y.type_permission===permissions && y.hall !=="אין הרשאה" ).length>0&& <NavLink to="/orders/monitor_hall" activeStyle>
            בקרת אולם
            </NavLink>}
            {props.permissions.filter((y)=>y.type_permission===permissions && y.rooms !=="אין הרשאה" ).length>0&& <NavLink to="/orders/calender_rooms" activeStyle>
              ניהול חדרים
            </NavLink>}
            {props.permissions.filter((y)=>y.type_permission===permissions && y.rooms !=="אין הרשאה" ).length>0&& <NavLink to="/orders/monitor_rooms" activeStyle>
              בקרת חדרים
            </NavLink>}
            {props.permissions.filter((y)=>y.type_permission===permissions && y.products !=="אין הרשאה" ).length>0&&<NavLink to="/order/cart" activeStyle>
              הזמנת מוצרים
            </NavLink>}
            {props.permissions.filter((y)=>y.type_permission===permissions && y.orders !=="אין הרשאה" ).length>0&& <NavLink to="/order/List" activeStyle>
              רשימת הזמנות
            </NavLink>}
            {/* {props.permissions.filter((y)=>y.type_permission===permissions && y.products !=="אין הרשאה" ).length>0&&<NavLink to="/order/equals" activeStyle>
              תחזית סלים
            </NavLink>} */}
          </div>
        </div>
      )}
      {auth.isLoggedIn && (
        <div className={classes1.dropdown}>
          <button className={classes1.dropbtn}>
          {props.permissions.filter((y)=>y.type_permission===permissions && (y.inventory !=="אין הרשאה" || y.movements !=="אין הרשאה"||y.equipments !=="אין הרשאה"||y.cars !=="אין הרשאה"|| y.monitoring_inventory !=="אין הרשאה")).length>0&&<NavLink to="/inventory">
              מלאי <RiIcons.RiArrowDownSFill />
            </NavLink>}
            <i class="fa fa-caret-down"></i>
          </button>
          <div className={classes1.dropdowncontent}>
          {props.permissions.filter((y)=>y.type_permission===permissions && y.inventory !=="אין הרשאה" ).length>0&& <NavLink to="/inventory/products"> מלאי ומוצרים</NavLink>}
          {props.permissions.filter((y)=>y.type_permission===permissions && y.movements !=="אין הרשאה" ).length>0&& <NavLink to="/inventory/stock_Movements"> תנועות מלאי</NavLink>}
          { props.permissions.filter((y)=>y.type_permission===permissions && y.equipments !=="אין הרשאה" ).length>0&& <NavLink to="/inventory/equipments">ניהול ציוד</NavLink>}
          {props.permissions.filter((y)=>y.type_permission===permissions && y.cars !=="אין הרשאה" ).length>0&& <NavLink to="/inventory/cars"> רכבים</NavLink>}
          {props.permissions.filter((y)=>y.type_permission===permissions && y.inventory !=="אין הרשאה" ).length>0&& <NavLink to="/inventory/counter"> אירועי ספירה</NavLink>}
           {props.permissions.filter((y)=>y.type_permission===permissions && y.inventory !=="אין הרשאה" ).length>0&& <NavLink to="/inventory/counter_events">ספירת מלאי</NavLink>}
            {props.permissions.filter((y)=>y.type_permission===permissions && y.inventory !=="אין הרשאה" ).length>0&&<NavLink to="/inventory/history">דוח מלאי</NavLink>}
            {props.permissions.filter((y)=>y.type_permission===permissions && y.monitoring_inventory !=="אין הרשאה" ).length>0&& <NavLink to="/inventory/monitor"> בקרה</NavLink>}
          </div>
        </div>
      )}
      {auth.isLoggedIn && props.permissions.filter((y)=>y.type_permission===permissions && y.friends !=="אין הרשאה" ).length>0 && (
        <NavLink to="/volunteers/register">חברי עמותה</NavLink>
      )}
      {auth.isLoggedIn && props.permissions.filter((y)=>y.type_permission===permissions && y.family !=="אין הרשאה" ).length>0 && <NavLink to="/family/register">משפחות</NavLink>}
      {auth.isLoggedIn &&  props.permissions.filter((y)=>y.type_permission===permissions && y.event !=="אין הרשאה" ).length>0 &&(
        <div className={classes1.dropdown}>
          <button className={classes1.dropbtn}>
            <NavLink to="/event">
              אירוע <RiIcons.RiArrowDownSFill />{" "}
            </NavLink>
            <i class="fa fa-caret-down"></i>
          </button>
          <div className={classes1.dropdowncontent}>
            <NavLink to="/events/management"> ניהול אירוע</NavLink>
            <NavLink to="/volunteers/events"> חברי עמותה באירוע</NavLink>
            <NavLink to="/family/events"> משפחות באירוע</NavLink>
            <NavLink to="/events/baskets"> תכנון סלי מזון</NavLink>
            <NavLink to="/events/distibution">תכנון מסלולי חלוקה</NavLink>
            <NavLink to="/events/history">אירועים שהיו</NavLink>
            <NavLink to="/events/monitor">בקרת אירוע</NavLink>
          </div>
        </div>
      )}
      {auth.isLoggedIn && (permissions==="מנהל המערכת" ||permissions==="מנהל מערכת")  && (
        <div className={classes1.dropdown}>
          <button className={classes1.dropbtn}>
            <NavLink to="/users">
              משתמשים <RiIcons.RiArrowDownSFill />{" "}
            </NavLink>
            <i class="fa fa-caret-down"></i>
          </button>
          <div className={classes1.dropdowncontent}>
            <NavLink to="/users/management"> ניהול משתמשים</NavLink>
            <NavLink to="/users/permission"> ניהול סוגי הרשאות</NavLink>
          </div>
        </div>
      )}
    </ul>
  );
}
const mapStateToProps = (state) => {
  return {
   events: state.events,
   familyEvents: state.familyEvents,
   driversEvent: state.driversEvent,
   Basket:state.Basket,
   users: state.users,
   permissions:state.permissions

    };
};

export default connect(mapStateToProps,{getUsers,getPermissions})(
  App
);