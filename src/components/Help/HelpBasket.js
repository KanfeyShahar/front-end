import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך תכולת סלי מזון
    </div>
    <div>
    <br/>
במסך זה תוכלו להגדיר את תכולת סלי הזמון וכמויות סלי המזון בכל אירוע
  </div>
  <div>
  <br/>
בבחירת מוצרים, שימו לב שתחילה אתם בוחרים את המוצרים בעלי פג תוקף המוקדם ביותר.
 <br/>
לאחר מכן, עליך להגדיר כל מוצר לסל. כאשר הכמות לא יכולה לעלות מהמכמות במלאי שרשומה.
<br/>
  </div>
<div>
<br/>
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
