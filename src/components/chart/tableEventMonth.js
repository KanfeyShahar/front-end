import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import classes from "../../pages/header.module.css"
import { Pane, Alert } from 'evergreen-ui'
const TableEvent = (props) => {
    return(
  <div style={{ maxWidth: "98%" }}>

{props.events.filter((x)=>!x.status && new Date(x.startDate).getMonth()+1 === new Date().getMonth()+1).map((y)=>
     <Alert
     intent="none"
    title={ new Date(y.startDate).toLocaleDateString("en-GB") +" " + " "+ y.name  }
    marginBottom={30}
  />)}
  </div>
    )
};

const mapStateToProps = (state) => {
    return {
     events: state.events
    };
  };
  
  export default connect(mapStateToProps)(
    TableEvent
  );
  
