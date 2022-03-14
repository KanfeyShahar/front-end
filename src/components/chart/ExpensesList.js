import React from 'react';
import { connect } from "react-redux";
import ExpenseItem from './ExpenseItem';
import classes from'./ExpensesList.module.css';

const ExpensesList = (props) => {
  if (props.volunteers.length === 0) {
    return <h2 ></h2>;
  }

  return (
    <ul className= {classes['expenses-list']}  >
      
    <div className={classes.balloon}></div>
    <div className={classes.balloon}></div>
    <div className={classes.balloon}></div>
     
        <ExpenseItem
        />
        
     
        
    </ul>
  );
};



const mapStateToProps = (state) => {
  return {
    volunteers: state.volunteers,

  };
};

export default connect(mapStateToProps)(ExpensesList)