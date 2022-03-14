import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך רכבים
    </div>
    <div>
    <br/>
במסך זה ניתן להוסיף, לעדכן רכבים בשימוש העמותה. כאשר התראות על ניהול רכבים, כגון : טיפול לאחר שנה או טסט שנדרש לבצע החודש, יופיעו במסך בקרה.
  </div>
  <div>
  <br/>
בעת ההוספה, כלל השדות הינן שדות חובה מלבד תאריך טיפול אחרון, שאותו יש לעדכן לאחר ההוספה.
 <br/>
 <br/>
 ניתן לצפות ברשומות של רכבים שאינם פעילים על ידי לחיצה על הכפתור"פעיל" והחלפתו ל"לא פעיל".
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
