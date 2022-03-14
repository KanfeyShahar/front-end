import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import rooms_screen from "./image/rooms_screen.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div><div>
  עזרה במסך ניהול חדרים
    </div>
    <div>
במסך זה, המשתמש יוכל להוסיף, לעדכן או למחוק הזמנות בלוח שנה עבור החדרים בבית הארחה
  </div>
  <br/>
  ניתן לצפות במסך בתצוגות שונות :חודש, שבוע ויום
  <div>
 מבנה המסך:
  </div>
  <div >
    <img src={rooms_screen} alt ="rooms_screen" className={classes.image} />
  </div>
  הוספת הזמנה
  <div>
    יש ללחוץ על הכפתור הוספת הזמנה בסימן + ולאחר מכן יפתח החלון הבא
  </div>
  <div>
  <img src={rooms_1} alt ="rooms_1" className={classes.image} />
  </div>
 <div>שדות החובה מסומנות בכוכבית. שים לב נא לעדכן מייל מדויק על מנת שלקוח יוכל לקבל אישור לקביעת הזמנה.</div>
  <div>
   לאחר הוספה ניתן לצפות בנתוני האירוע באמצעות לחיצה על האירוע
  </div>
  <div>
  <br/>
  במידה והמשתמש מעוניין למחוק/לעדכן, יש ללחוץ על הכפתור המתאים ולעדכן את הנתונים
כאשר העדכון הינו שעות או ימים, ניתן לעדכן באמצעות גרירת האירוע בלוח שנה או לבצע מחיקה ואז הוספת אירוע חדש.
  </div>
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
