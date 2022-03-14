import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import classes from "../../pages/header.module.css"
import { Pane, Alert } from 'evergreen-ui'

const TableEvent = (props) => {
    return(
  <div style={{ maxWidth: "90%" }}>
    {props.productsInventory.filter((x)=>new Date(x.endDate).getMonth() === new Date().getMonth() && new Date().getFullYear() === new Date(x.endDate).getFullYear()).map((y)=>
     <Alert
     intent="warning"
    title={ new Date(y.endDate).toLocaleDateString("en-GB") +" "+ " "+ y.nameProducts }
    marginBottom={20}
  />)}
  </div>
    )
};

const mapStateToProps = (state) => {
    return {
      productsInventory: state.productsInventory,
    };
  };
  
  export default connect(mapStateToProps)(
    TableEvent
  );
  
