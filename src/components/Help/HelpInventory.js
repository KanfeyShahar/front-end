import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
עזרה במסך-ניהול מלאי הדר הכרמל
    </div>
    <div>
במסך זה ניתן לצפות במלאי הקיים במרכז המלאי הדר הכרמל
  </div>
  <div>
 מבנה המסך:
 <br/>
1:שורת חיפוש ניתן לחפש לפי עמודות
 <br/>
 2:הוספת מלאי קיים להדר הכרמל, ברגע נוספה עמודה, היא גם מתווספת אוטומטית למסך תנועות מלאי
 <br/>
 3: הפקת דו"ח מלאי קיים
 <br/>
 4:מאוד חשוב לשים לב לתאריך תפוגה. אין לשנות תאריך זה לאחר ההוספה
  </div>
  <div >
    <img src={inventory} alt ="inventory" className={classes.image} />
  </div>
  <div>
 ניתן למחוק את העמודה, בתנאי שהכמות במלאי של אותו מוצר הינה 0.
  </div>
<div>
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
