import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך ספירה תקופתית
    </div>
    <div>
    <br/>
לאחר הוספת אירוע במערכת, ניתן לעדכן את הכמויות בפועל של האירוע בנוסף. במידה ומדובר באירוע "ספירת ציוד", יש לערוך ספירה עבור כל מרכז בנפרד
  </div>
  <div>
  <br/>
לאחר עדכון של כמויות בפועל, יש לחזור למסך אירוע ספירה ולעדכן את סיום הספירה
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
