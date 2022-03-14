import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import order from "./image/order.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
עזרה במסך-מעקב הזמנות
    </div>
    <div>
במסך זה ניתן לעקוב אחר הזמנות שבוצעו בכל מרכז. בנוסף לאשר, לעדכן כמויות בפועל ולאשר הזמנה שבוצעה
  </div>
  <div>
 מבנה המסך:
 <br/>
 1: שורת חיפוש.
 <br/>
 2:בלחיצה על הלחצן ניתן לראות את פירוט ההזמנה.
 <br/>
 3: בלחיצה על השדות משתנה סטטוס ההזמנה ולא ניתן לחזור אחורה
 בלחיצה על לחצן הערות, ניתן לצפות בהערות של מבצע ההזמנה.
 <br/>
 4:בלחיצה על כפתור נעילה, לא ניתן לבצע שינויים של כמויות המוצרים שהגיעו למרכזים.
  </div>
  <div >
    <img src={order} alt ="order" className={classes.image} />
  </div>
  <div>
  עמודות שניתן לעדכן: תאריך מבוקש לאספקה, תאריך בפועל,כמויות בפועל,מחיר ליחידה, אושר,סופק,הערות וססטוס ההזמנה
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
