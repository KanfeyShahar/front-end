import React,{useState,useEffect,useContext} from "react";
import ExpensesList from "../components/chart/ExpensesList";
import TableEvent from "../components/chart/tableEventMonth";
import TableFriend from "../components/chart/tableFriendMonth";
import BarChart from "../components/chart/chart";
import PieChart1 from "../components/chart/chart1"
import classes from "./Expenses.module.css";
import {getEvents,getBasket,getFamilyEvents,getFriendEvents,getFriends,getFamily,getUsers} from "../actions/index"
import { connect } from "react-redux";
import { AuthContext } from "../store/auth-context";
import Item from "./item";
import classes10 from "./color.module.css"




const Home = (props,user) =>{
  const auth = useContext(AuthContext)
  useEffect(() => {
    props.getEvents()
    props.getBasket()
    props.getFamilyEvents()
    props.getFriendEvents()
    props.getFriends()
    props.getFamily()
    props.getUsers()

  },[]);
  return (
    <div  className={classes10.colorGroup}>
     
        <h1 className={classes.expenseH1}>ברוכים הבאים</h1>
        <labal className={classes.expenseH2}>{props.users.filter((x) => x.id === auth.userId).map((z)=>z.firstName+" "+z.lastName)}</labal>
        <div className={classes.expenses5}>
        <BarChart />
      </div>
      <div className={classes.expenses1}>
          אירועים קרובים
        <TableEvent />
      </div>
   
      <div className={classes.expenses2}>
          חברים שהצטרפו לאחרונה
        <TableFriend />
      </div>
  
      <div className={classes.expenses}>
        חוגגים יום הולדת החודש
        <ExpensesList />
      </div>
      {/* <div className={classes.expenses20}>
        התפלגות חברי עמותה
      <PieChart1 />

    </div> */}
     
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
   events: state.events,
   familyEvents: state.familyEvents,
   driversEvent: state.driversEvent,
   Basket:state.Basket,
   users: state.users,

    };
};

export default connect(mapStateToProps,{getEvents,getBasket,getFamilyEvents,getFriendEvents,getFamily,getFriends,getUsers})(
  Home
);