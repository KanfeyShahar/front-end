import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addCalender, toggleModalCalender } from "../actions";
import {
  saveCarsToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  saveCalenderToLocal,
} from "../helper-functions";
import moment from 'moment';
import * as AiIcons from "react-icons/ai";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";

class SeeEventCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStart: "",
      dateEnd: "",
      timeStart:"" ,
      timeEnd: "",
      email: "",
      title: "",
      fullName: "",
      description: "",
      color: "",
      phone: "",
    };
  }

    

 


  render() {
    return (
      <div>
        <div>
          <div   className={classes.control} >
            <label htmlFor="fullName">איש קשר</label>
                   {this.props.event.fullName}
            <label htmlFor="email">מייל</label>
            {this.props.event.email}
            
            <label htmlFor="name">טלפון ליצירת קשר</label>
              {this.props.event.phone}

            <div className={classes.control}>
              <label htmlFor="title">כותרת</label>
              {this.props.event.title}
            </div>
          </div>
          <div className={classes.control}>
            <label for="exampleFormControlTextarea1">הערות</label>
            {this.props.event.description === "" ? "לא נרשמו הערות": this.props.event.description }
          </div>
     
       
        </div>
      </div>

      // {/* {this.handleWelcome} */}
    );
  }
}

const mapStateToProps = (state) => {
  saveCalenderToLocal(state.calender);
  return {
    calender:state.calender,
    modalCalender: state.modalCalender,
    cars: state.cars,
  };
};

export default connect(mapStateToProps, {
  addCalender,
  toggleModalCalender,
})(SeeEventCalender);
