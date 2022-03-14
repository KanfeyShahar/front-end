import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalHelp } from "../../actions"
import inventory from "./image/inventory.jpg"
import rooms_1 from "./image/rooms_1.jpg"
import classes from "./image/image.module.css"


import Swal from "sweetalert2";

const HelpEquipments = () => {
  return <div className={classes.labal}><div>
מסך משפחות באירוע
    </div>
    <div>
    <br/>
במסך זה תוכלו להוסיף משפחות לאירוע ספציפי.
  </div>
  <div>
  <br/>
תחילה, עליכם לבחור משפחות ולהוסיף לאירוע. לאחר מכן, במידה ומדובר באירוע חלוקה של סלי מזון,
 <br/>
נדרש לבחור סל לכל משפחה.
פירוט סלי המזון:
<br/>
סל א: מיועד ל1-2 נפשות
<br/>
סל ב:מיועד ל-3-4 נפשות
<br/>
סל ג:מיועד ל-5-6 נפשות
<br/>
סל ד: מיועד ל7+ נפשות
<br/>
סל ה: משפחות עם תינוקות
 <br/>
<br/>
ניתן לעדכן את עמודות :נמסר והערות בזמן אמת בעת החלוקה דרך הטלפון בלשונית :"מסלולים".
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
