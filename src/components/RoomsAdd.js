import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addCar, toggleModal,deleteRooms,updateRowRooms } from "../actions";
import {
  saveCarsToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  isValidPhone,
} from "../helper-functions";
import * as AiIcons from "react-icons/ai";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";

class RoomsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
      edit: false,
      dateStart: this.props.event.start,
      dateEnd: this.props.event.end,
      timeStart: this.props.event.start,
      timeEnd: this.props.event.end,
      email: this.props.event.email,
      title: this.props.event.title,
      fullName:this.props.event.fullName,
      resourceId:this.props.event.resourceId,
      description: this.props.event.description,
      color: this.props.event.color,
      phone:this.props.event.phone,
    };
  }
  handleCancel = () => {
    this.setState({ deleted: true });
    this.setState({ edit: false });
  };
  handleCancel1 = () => {
    this.setState({ deleted: false });
    this.setState({ edit: false });
  };
  handleEdit = () => {
    this.setState({ deleted: false });
    this.setState({ edit: true });
  };
 handleDelete = (e) => {
this.props.deleteRooms({
  id:this.props.event.id
})

// Swal.fire({
//   icon: "success",
//   text: "נמחק בהצלחה",
//   confirmButtonText: "אישור",
//   confirmButtonColor: "green",
// });
e.preventDefault();
this.setState({ deleted: false });
this.setState({ edit: false });
 }

 handleEditEvent = (e) => {
  this.props.updateRowRooms({
    id:this.props.event.id,
    start:this.props.event.start,
    end:this.props.event.end,
    description:this.state.description === "" ? this.props.event.description : this.state.description,
    resourceId:document.getElementById("resourceId1").value  === "" ? this.props.event.resourceId : parseInt(document.getElementById("resourceId1").value),
    title:this.state.title === undefined ? this.props.event.title : this.state.title,
    email:this.state.email === undefined ? this.props.event.email : this.state.email,
    phone:this.state.phone === undefined ? this.props.event.phone : this.state.phone,
    color:this.state.color === undefined ? this.props.event.color : this.state.color,
    fullName:this.state.fullName === undefined ? this.props.event.fullName : this.state.fullName,})

    // Swal.fire({
    //   icon: "success",
    //   text: "עודכן בהצלחה",
    //   confirmButtonText: "אישור",
    //   confirmButtonColor: "green",
    // });
    e.preventDefault();
    this.setState({ deleted: false });
    this.setState({ edit: false });
};


  DeleteEvents = () => {};

  // handleChange = e => {
  //   this.setState({language: Array.isArray(e) ? e.map(x => x.value) : []})
  //   console.log(this.state.language)
  // }

  render() {
    return (
      <div>
        {!this.state.deleted && !this.state.edit && (
          
          <div>
              <div className={classes.header15}>
           פרטי האירוע:
            </div>
                <div>
          <div   className={classes.control} >
            <label htmlFor="fullName">איש קשר</label>
                   {this.props.event.fullName}
            <label htmlFor="email">מייל</label>
            {this.props.event.email}
            
            <label htmlFor="name">טלפון ליצירת קשר</label>
              {this.props.event.phone}
              <label htmlFor="dateStart">תאריך התחלה</label>
              {new Date(this.props.event.start).toLocaleDateString('en-GB')}
              <label htmlFor="dateStart">תאריך סיום</label>
              {new Date(this.props.event.end).toLocaleDateString('en-GB')}
              <label htmlFor="dateStart">שעת התחלה</label>
              {new Date(this.props.event.start).toLocaleTimeString('en-GB')}
              <label htmlFor="dateStart">שעת סיום</label>
              {new Date(this.props.event.end).toLocaleTimeString('en-GB')}
            <div className={classes.control}>
              <label htmlFor="title">כותרת</label>
              {this.props.event.title}
            </div>
            <div className={classes.control}>
              <label htmlFor="resourceId">חדר</label>
              {this.props.event.resourceId}
            </div>
          </div>
          <div className={classes.control}>
            <label for="exampleFormControlTextarea1">הערות</label>
            {this.props.event.description === "" ? "לא נרשמו הערות": this.props.event.description }
          </div>
     
       
        </div>
            <div className={classes.header2}>
              האם ברצונך למחוק או לערוך אירוע זה?
            </div>
            <div>
              <button
                className={classes.header3}
                onClick={this.handleCancel.bind(this)}
              >
                <AiIcons.AiFillDelete />
              </button>

              <button
                className={classes.header3}
                onClick={this.handleEdit.bind(this)}
              >
                <AiIcons.AiFillEdit />
              </button>
            </div>
          </div>
        )}
        {this.state.deleted && !this.state.edit && (
          <div>
            <div>
              האם אתה בטוח לבצע פעולה זו? לא תוכל לחזור שנית על פעולה זו
              <div className={classes.actions}>
                <button onClick={this.handleDelete.bind(this)} className={classes.submit} onMouseUp={async () => {
            return this.props.toggleModal();
          }}>
                  אישור
                </button>
                <button
                  onClick={this.handleCancel1.bind(this)}
                  className={classes.submit}
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        )}
        {this.state.edit && !this.state.deleted && (
          <div>
            נא ערוך פרטים
            <div
              className={classes.control}
              
            >
              <label htmlFor="fullName">איש קשר</label>
              <input
                type="text"
                id="fullName"
                placeholder={this.props.event.fullName}
                onChange={(e) => {
                  this.setState({ fullName: e.target.value });
                
                }} 
              />
               <label htmlFor="email">מייל</label>
              <input
                type="text"
                id="email"
                placeholder={this.props.event.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }} 
              />
               <label htmlFor="name">טלפון ליצירת קשר</label>
              <input
                type="text"
                id="phone"
                placeholder={this.props.event.phone}
                onChange={(e) => {
                  this.setState({ phone: e.target.value });
                }} 
              />
              {/* {this.state.fullName.length > 0 && <p>נא כתוב את שם מבצע ההזמנה</p>} */}
      
              <div
                className={classes.control}
              >
                <label htmlFor="title">כותרת</label>
                <input
                  type="text"
                  id="title"
                  placeholder={this.props.event.title}
                  onChange={(e) => {
                    this.setState({ title: e.target.value });
                  }}
      
                />
              
              </div>
            </div>
            <label for="resourceId1">בחר חדר:</label>
          <div>
          <select name="resourceId1" id="resourceId1">
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
            <div className={classes.description2}>
               <label for="exampleFormControlTextarea1">הערות</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                placeholder={this.props.event.decription}
                rows="3"
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
                value={this.state.description}
              ></textarea>
               <div>
              <label htmlFor="color">בחר צבע לתצוגה</label>
              <br/>
              <input type="color" name="some-name"  onChange={(e) => {
                  this.setState({ color: e.target.value });
                }}/>
                </div>
              </div>
              <div className={classes.actions}>
                <button onClick={this.handleEditEvent.bind(this)} className={classes.submit} onMouseUp={async () => {
            return this.props.toggleModal();
          }}>
                  אישור
                </button>
                <button
                  onClick={this.handleCancel1.bind(this)}
                  className={classes.submit}
                >
                  ביטול
                </button>
              </div>
          </div>
          
        )}{" "}
      </div>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  addCar,deleteRooms,updateRowRooms,
  toggleModal,
})(RoomsAdd);
