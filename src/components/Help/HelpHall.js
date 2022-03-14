import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import hall_screen from "./image/hall_screen.jpg"
import hall_screen1 from "./image/hall_screen1.jpg"
import equipments2 from "./image/equipments2.jpg"
import edit from "./image/edit.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div><div>
  עזרה במסך ניהול אולם
    </div>
    <div>
במסך זה, המשתמש יוכל להוסיף, לעדכן או למחוק אירועים בלוח שנה עבור אולם בלבד
  </div>
  <div>
 מבנה המסך:
 <br/>
 לוח שנה ניתן להציג בלחיצה על הסרגל הכלים בצד ימין במסך. 
  </div>
  <div >
    <img src={hall_screen} alt ="hall_screen" className={classes.image} />
  </div>
  הוספת אירוע
  <div>
    יש ללחוץ על הכפתור הוספת אירוע בסימן + ולאחר מכן יפתח החלון הבא
  </div>
  <div>
  <img src={hall_screen1} alt ="hall_screen1" className={classes.image} />
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
