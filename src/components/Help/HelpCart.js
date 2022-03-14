import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import catalog from "./image/catalog.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
  עזרה במסך קטלוג מוצרים
    </div>
    <div>
 במסך זה המשתמש יוכל לבצע הזמנה באתר כאשר ההזמנה תופיע במסך מעקב הזמנות
  </div>
  <div>
 מבנה המסך:
  </div>
  <div >
    <img src={catalog} alt ="catalog" className={classes.image} />
  </div>
אופן ביצוע ההזמנה באתר:
<br/>
ניתן להוסיף מוצרים להזמנה ע"י לחיצה על הוספת כמות מהמוצר ולחיצה על הלחצן +.
<br/>
על מנת לעבור אחר מוצרים יש להקליד את שם המוצר בשורת החיפוש והמשתמש יקבל תוצאות של מוצר זה.

  <div>
  
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
