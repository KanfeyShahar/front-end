import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך אירוע ספירה
    </div>
    <div>
    <br/>
נדרש להוסיף אירוע במערכת על מנת לבצע ספירת מלאי. 
  </div>
  <div>
  <br/>
בעת הוספת אירוע, כל השדות הינן שדות חובה מלבד הערות. 
 <br/>
 <br/>
 בסיום ספירת המלאי, יש לנעול את האירוע ולאחר מכן יופק דוח בהתאם לסוג האירוע
  </div>
<div>
<br/>
  לפניות נוספות יש לפנות לאופיר מנהל המערכת
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
