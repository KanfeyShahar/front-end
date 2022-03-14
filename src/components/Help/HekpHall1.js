import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import hall1_screen from "./image/hall1_screen.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
  עזרה במסך דוח אולם-בית הארחה
    </div>
    <div>
במסך זה תוכלו להפיק דוחות כאשר הינכם נדרשים להקליד תאריך התחלה ותאריך סיום שברצונכם להפיק את הדוח
  </div>
  <div>
 מבנה המסך:
  </div>
  <div >
    <img src={hall1_screen} alt ="hall1_screen" className={classes.image} />
  </div>
אפשרויות המסך:
ניתן לבצע אפשרויות חיפוש, תאריך התחלה ותאריך סיום של ההזמנות ובנוסף להדפיס את הדוח על הלחצן עם החץ למטה
  
  
 
  
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
