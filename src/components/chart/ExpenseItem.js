import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import Card from "../../pages/CardItem";
import classes from "../../pages/header.module.css"
import * as FaIcons from "react-icons/fa";

const ExpenseItem = (props) => {
  return (
    <div>
        <div style={{ maxWidth: "100%" }}>
          <div className={classes.tablewrapper}>
            <table className="table table-hover">
            <thead>
                <tr>
                  <th className={classes.header} th scope="col">שם</th>
                  <th className={classes.header} th scope="col">תאריך לידה</th>
                  <th className={classes.header} th scope="col">מרכז</th>
                </tr>
              </thead>
              <tbody>
                {props.volunteers
                  .filter((x) =>new Date(x.date_birthday).getMonth()+1  === new Date().getMonth() + 1 && x.status)
                  .map((y) => (
                    <tr>
                      <td className={classes.header2}>{y.firstName + "  "+ y.lastName}</td>
                      <td className={classes.header2}>{new Date(y.date_birthday).toLocaleDateString("en-GB")}</td>
                      <td className={classes.header2}>{y.center}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
    
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
   volunteers: state.volunteers
  };
};

export default connect(mapStateToProps)(
  ExpenseItem
);
