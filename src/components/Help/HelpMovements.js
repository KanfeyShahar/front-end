import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך- תנועות מלאי
    </div>
    <div>
במסך זה תוכלו לעדכן מלאי נכנס למרכז או מלאי יוצא ממרכז הדר הכרמל
  </div>
  <div>
 <br/>
הוספת רשומה תתבצע באמצעות לחיצה על הכפתור + ולאחר מכן יש להקליד את המוצר שקיים בקטלוג המוצרים. 
<br/>
במידה והוא אינו קיים יש להוסיף לקטלוג המוצרים ולאחר מכן להמשיך בפעולת הוספת רשומה.
 <br/>
אין לתעד בתנועות המלאי כמויות סלי מזון. המערכת מבצעת את הגריעה אוטומטית.
 <br/>
 <br/>
שים לב! למסך זה יש חשיבות רבה במערכת. במידה ואינך מתעד את המלאי היוצא מהמרכז או המלאי הנכנס למרכז, לא תוכל להפיק דוחות נכונים.
 <br/>
  </div>
  <div >
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
