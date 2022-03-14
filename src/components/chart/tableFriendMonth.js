import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import classes from "../../pages/header.module.css"
import { Pane, Alert } from 'evergreen-ui'

const TableFriend = (props) => {
    return(
  <div style={{ maxWidth: "98%" }}>
   {props.volunteers.filter((x)=>new Date(x.created_date).getMonth()+1 === new Date().getMonth()+1 && new Date(x.created_date).getFullYear() === new Date().getFullYear()).map((y)=>
     <Alert
     intent="none"
    title={ new Date(y.created_date).toLocaleDateString("en-GB") + "  "+ y.firstName + "  "+ y.lastName }
    marginBottom={20}
  />)}
  </div>
    )
};

const mapStateToProps = (state) => {
    return {
    volunteers: state.volunteers
    };
  };
  
  export default connect(mapStateToProps)(
    TableFriend
  );
  
