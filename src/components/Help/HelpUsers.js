import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך משתמשים
    </div>
    <div>
    <br/>
במסך זה תוכל לנהל משתמשים ולהוסיף משתמשים חדשים.
  </div>
  <div>
  <br/>
שדות החובה הן :טלפון, שם פרטי, שם משפחה, סיסמה, סוג הרשאה, ואימייל
 <br/>
 <br/>
ניתן לעדכן כל שדה על ידי לחיצה פעמיים על השדה שברצונכם לשנות.
<br/>
  </div>
<div>
<br/>
הסיסמה מוצפנת, ולכן לא ניתן לצפות בסיסמת המשתמש. במידה והמשתמש שכח סיסמה, עליך לשנות את הסיסמה
<br/>
לפניות נוספות יש לפנות למנהל המערכת
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
