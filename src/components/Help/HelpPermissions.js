import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך הרשאות
    </div>
    <div>
    <br/>
במסך זה תוכל לנעל את ההרשאות במערכת
  </div>
  <div>
  <br/>
שים לב! אין אפשרות לשנות הרשאות של מנהל המערכת
 <br/>
 <br/>
<br/>
  </div>
<div>
<br/>
<br/>
לפניות נוספות יש לפנות למנהל המערכת
</div>
  </div>
  
}

const mapStateToProps = (state) => {
  return {
    modalHelp: state.modalHelp,
    products: state.products,
  };
};

export default connect(mapStateToProps, {
  toggleModalHelp,
})(HelpEquipments);
