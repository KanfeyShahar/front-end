import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import helpEquipments from "./image/helpEquiments.jpg"
import addEquipmetents from "./image/addEquipmtents.jpg"
import equipments2 from "./image/equipments2.jpg"
import edit from "./image/edit.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div><div>
    עזרה במסך ניהול ציוד
    </div>
    <div>
במסך זה תוכל לצפות בציוד בכלל המרכזים, להוסיף, למחוק ולעדכן ציוד בהתאם לצורך
  </div>
  <div>
 מבנה המסך:
  </div>
  <div >
    <img src={helpEquipments} alt ="helpEquipments" className={classes.image} />
  </div>
  הוספת ציוד
  <div>
    יש ללחוץ על הכפתור הוספת ציוד כפי שמופיע בתמונה הראשונה מעלה
    ולאחר מכן יפתח החלון הבא
  </div>
  <div>
  <img src={addEquipmetents} alt ="addEquipmetents" className={classes.image} />
  </div>
 <div>שדות החובה שעליך למלא הם : מרכז, כמות ושם ציוד. כמו כן אתה רשאי למלא הערות</div>
  <div>
    לאחר לחיצה על אישור, על מנת לצפות במה שהוספת, עליך לבחור בשדה הבחירה את המרכז בו אתה רוצה לצפות
  </div>
  <div>
  <img src={equipments2} alt ="equipments2" className={classes.image} />
  </div>
  <div>
   על מנת לעדכן שדה מסוים, עליך ללחוץ פעמיים על השדה ולאחר מכן תפתח ההודעה הבאה
  </div>
  <img src={edit} alt ="edit" className={classes.image} />
  <div>  ולאחר מכן, עליך ללחוץ על אישור</div>
<div>
  לפניות נוספות יש לפנות למנהל המערכת במייל
  @name.example.com
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
