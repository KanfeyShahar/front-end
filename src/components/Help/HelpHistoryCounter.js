import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך דוח מלאי
    </div>
    <div>
    <br/>
במסך זה המשתמש יוכל לצפות במלאי שהיה קיים בכל זמן שהוא יבחר. יש מראש לבחור תאריך התחלה ותאריך סיום
  </div>
  <div>
  <br/>
במסך זה ניתנת האפשרות להפיק דוח ולבצע חיפוש
 <br/>
 <br/>
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
