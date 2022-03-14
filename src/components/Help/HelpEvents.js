import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך אירועים
    </div>
    <div>
    <br/>
על מנת לנעל אירוע, חייב שהאירוע יהיה קיים במערכת
  </div>
  <div>
  <br/>
במידה והוא לא קיים, ניתן להוסיף אירוע על ידי לחיצה על הכפתור +.
 <br/>
 <br/>
שדות החובה בהוספה הן:שם אירוע, סוג אירוע ותאריך
<br/>
  </div>
<div>
<br/>
ניתן לצפות באירועים לא פעילים, על ידי לחיצה על "לא בוצע".
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
