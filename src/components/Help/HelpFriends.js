import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך חברי עמותה
    </div>
    <div>
    <br/>
במסך זה המשתמש יוכל להוסיף מתנדב/עובד בעמותה.
  </div>
  <div>
  <br/>
שדות החובה הן :תעודת זהות, שם פרטי, שם משפחה, מרכז, תפקיד, תאריך לידה, סוג חברות וטלפון
 <br/>
 <br/>
ניתן לעדכן כל שדה על ידי לחיצה פעמיים על השדה שברצונכם לשנות.
<br/>
  </div>
<div>
<br/>
במידה ואחד מחברי העמותה אינו פעיל יותר בעמותה, על המשתמש לעדכן זאת והוא יוכל לצפות ברשימת הלא פעילים.
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
