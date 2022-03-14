import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך תכנון מסלולי חלוקה
    </div>
    <div>
    <br/>
    תחילה, עליכם לבחור תאריך אירוע. במידה וברצונכם לסדר מסלול, עליכם לסמן משפחות לאותו מסלול, לבחור מספר מסלול וללחוץ על הכפתור "שיוך מסלול".
    <br/>
במסך זה תוכלו לבחור משפחות ולשייך אותם למסלול. כמו כן, תוכלו לצפות בסדר הממולץ.
  </div>
  <div>

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
