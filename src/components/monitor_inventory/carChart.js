import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import classes from "../../pages/header.module.css"
import { Pane, Alert } from 'evergreen-ui'

const TableCar = (props) => {
    return(
  <div style={{ maxWidth: "90%" }}>
     {props.cars.filter((x)=>new Date(x.testValidity).getMonth() === new Date().getMonth()).map((y)=>
     <Alert
     intent="warning"
    title={ new Date(y.testValidity).toLocaleDateString("en-GB")+" "+y.idCars+" " + y.typeCar  }
    marginBottom={20}
  />)}
      
  </div>
    )
};

const mapStateToProps = (state) => {
    return {
      cars: state.cars,
    };
  };
  
  export default connect(mapStateToProps)(
    TableCar
  );
  