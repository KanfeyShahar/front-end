import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addRooms, toggleModalCalender } from "../actions";
import {
  saveRoomsToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  saveCalenderToLocal,
} from "../helper-functions";
import moment from "moment";
import * as AiIcons from "react-icons/ai";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";

class RoomsAddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStart: new Date(),
      dateEnd: new Date(),
      timeStart: "",
      timeEnd: "",
      email: " ",
      title: " ",
      fullName: " ",
      description: "",
      resourceId:1,
      color: "",
      phone: "0",
    };
    this.myRef = React.createRef();
  }
  handleClick = (e) => {
    this.props.addRooms({
      id: 10000*Math.random().toFixed(4),
      start: new Date(
        moment(this.state.dateStart + " " + this.state.timeStart)._i
      ),
      end: new Date(moment(this.state.dateEnd + " " + this.state.timeEnd)._i),
      description: this.state.description,
      title: this.state.title,
      resourceId:parseInt(getElementsValue("resourceId")),
      email:getElementsValue("email"),
      phone:getElementsValue("phone"),
      color:this.state.color,
      fullName:getElementsValue("fullName"),

    });
    console.log({
      id: 10000*Math.random().toFixed(4),
      start: new Date(
        moment(this.state.dateStart + " " + this.state.timeStart)._i
      ).toString(),
      end: new Date(moment(this.state.dateEnd + " " + this.state.timeEnd)._i).toString(),
      description: this.state.description,
      title: this.state.title,
      resourceId:parseInt(getElementsValue("resourceId")),
      email:getElementsValue("email"),
      phone:getElementsValue("phone"),
      color:this.state.color,
      fullName:getElementsValue("fullName"),

    })
    // Swal.fire({
    //   icon: "success",
    //   text: "נוסף בהצלחה",
    //   confirmButtonText: "אישור",
    //   confirmButtonColor: "green",
    // });
    this.setState({
      dateStart: new Date(),
      dateEnd: new Date(),
      timeStart: "",
      timeEnd: "",
      email: " ",
      title: " ",
      resourceId:1,
      fullName: " ",
      description: "",
      color: "",
      phone: " ",
    });
  };

  valiadateInput = (dateStart, timeStart, timeEnd, title, fullName) => {
    if (
      timeStart <= timeEnd &&
      title.length > 0 &&
      fullName.length > 0 &&
      new Date(dateStart).valueOf() > new Date().valueOf()
    )
      return true;
    else {
      return false;
    }
  };
  reset() {
    this.setState = {
      dateStart: new Date(),
      dateEnd: new Date(),
      timeStart: "",
      timeEnd: "",
      email: " ",
      title: " ",
      fullName: " ",
      description: "",
      color: "",
      phone: " ",
    };
  }

  validateFormBtn = (dateStart, title, fullName) => {
    if (
      title.length > 0 &&
      fullName.length > 0 &&
      new Date(dateStart).valueOf() > new Date().valueOf() 
    ) {
      return (
        <button
          className="btn btn-primary"
          id="add-product-btn"
          onClick={(e) => {
            return this.handleClick(e);
          }}
          onMouseUp={async () => {
            return this.props.toggleModalCalender();
          }}
        >
          אישור
        </button>
      );
    }
    return (
      <button className="btn btn-secondary" disabled>
        אישור
      </button>
    );
  };

  render() {
    return (
      <div>
        <div>
          נא מלא פרטים
          <div
            className={`${classes.control} ${
              this.state.fullName.length > 0 ? "" : classes.invalid
            }`}
          >
            <label htmlFor="fullName">איש קשר*</label>
            <input
              type="text"
              id="fullName"
              placeholder=""
              onChange={(e) => {
                this.setState({ fullName: e.target.value });
              }}
              value={this.state.fullName}
            />
            {this.state.fullName.length < 0 && (
              <p className={classes.invalid}>נא לציין איש קשר</p>
            )}
            <label htmlFor="email">מייל*</label>
            <input
              type="text"
              id="email"
              placeholder=""
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              value={this.state.email}
            />
            <label htmlFor="name">טלפון ליצירת קשר*</label>
            <input
              type="text"
              id="phone"
              placeholder=""
              onChange={(e) => {
                this.setState({ phone: e.target.value });
              }}
              value={this.state.phone}
            />

            {/* {this.state.fullName.length > 0 && <p>נא כתוב את שם מבצע ההזמנה</p>} */}
            <div className={classes.control}>
              <label htmlFor="dateStart">תאריך התחלה* </label>

              <input
                type="date"
                id="dateStart"
                placeholder=""
                onChange={(e) => {
                  this.setState({ dateStart: e.target.value });
                }}
                value={this.state.dateStart}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="dateEnd">תאריך סיום* </label>

              <input
                type="date"
                id="dateEnd"
                placeholder=""
                onChange={(e) => {
                  this.setState({ dateEnd: e.target.value });
                }}
                value={this.state.dateEnd}
              />
            </div>
            <div
              className={classes.control}
            >
              <label htmlFor="timeStart">שעת התחלה*</label>
              <input
                type="time"
                id="timeStart"
                placeholder=""
                onChange={(e) => {
                  this.setState({ timeStart: e.target.value });
                }}
                value={this.state.timeStart}
              />
            </div>
            <div
              className={classes.control}
            >
              <label htmlFor="timeEnd">שעת סיום*</label>
              <input
                type="time"
                id="timeEnd"
                placeholder=""
                onChange={(e) => {
                  this.setState({ timeEnd: e.target.value });
                }}
                value={this.state.timeEnd}
              />
            </div>
            <div
              className={`${classes.control} ${
                this.state.title.length > 0 ? "" : classes.invalid
              }`}
            >
              <label htmlFor="title">כותרת*</label>
              <input
                type="text"
                id="title"
                placeholder=""
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
                value={this.state.title}
              />
              {this.state.title.length < 0 && (
                <p className={classes.invalid}>נא לציין כותרת</p>
              )}
            </div>
          </div>
          <label for="resourceId">*בחר חדר:</label>
          <div>
          <select name="resourceId" id="resourceId">
            <option value="">--בחר מספר חדר--</option>
            <option value="1">חדר 101</option>
            <option value="2">חדר 102</option>
            <option value="3">חדר 103</option>
            <option value="4">חדר 104</option>
            <option value="5">חדר 105</option>
            <option value="6">חדר 106</option>
            <option value="7">חדר 107</option>
            <option value="8">חדר 108</option>
            <option value="9">חדר 109</option>
            <option value="10">חדר 110</option>
            <option value="11">חדר 111</option>
            <option value="12">חדר 112</option>
            <option value="13">חדר 113</option>
            <option value="14">חדר 114</option>
            <option value="15">חדר 115</option>
            <option value="16">חדר 116</option>
          </select>
          </div>
          <div className={classes.description}>
            <label for="exampleFormControlTextarea1">הערות</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder=""
              onChange={(e) => {
                this.setState({ description: e.target.value });
              }}
              value={this.state.description}
            ></textarea>
            <div>
              <label htmlFor="color">בחר צבע לתצוגה</label>
              <br />
              <input
                type="color"
                name="some-name"
                onChange={(e) => {
                  this.setState({ color: e.target.value });
                }}
              />
            </div>
          </div>
          {this.validateFormBtn(
            this.state.dateStart,
            this.state.email,
            this.state.title,
            this.state.fullName,
            this.state.phone
          )}
        </div>
      </div>

      // {/* {this.handleWelcome} */}
    );
  }
}

const mapStateToProps = (state) => {
  saveRoomsToLocal(state.calender);
  return {
    rooms: state.rooms,
    modalCalender: state.modalCalender,
    cars: state.cars,
  };
};

export default connect(mapStateToProps, {
  addRooms,
  toggleModalCalender,
})(RoomsAddNew);
