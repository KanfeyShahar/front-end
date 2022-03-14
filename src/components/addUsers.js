import React, { Component } from "react";
import Select from 'react-select'
import validator from 'validator'
import { connect } from "react-redux";
import { addUsers, toggleModal } from "../actions";
import {
  saveUsersToLocal,
  getElementsValue,
  isValidName,
  isValidPhone,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";


class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      status: "",
      type_permission:"",
      password:""
    };
  }
  handleClick = () => {
    if (
      this.props.users.filter((p) => p.email === getElementsValue("email"))
        .length === 0
    ) {
      this.props.addUsers({
        id: 10000*Math.random().toFixed(4),
        firstName: getElementsValue("firstName"),
        lastName: getElementsValue("lastName"),
        phone: getElementsValue("phone"),
        email: getElementsValue("email"),
        type_permission:this.state.type_permission,
        password:this.state.password,
        status:true,
        created_date:new Date().toString(),
      });
      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: "המשתמש קיים במערכת",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
    }
    this.setState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      status: "",
      type_permission:"",
      password:""
    });
  };
  validateLastName = (lastName) => {
    if (isValidName(lastName)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
       שדה חובה
      </small>
    );
  };
  validateFirstName = (firstName) => {
    if (isValidName(firstName)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        שדה חובה
      </small>
    );
  };
  validateEmail = (email) => {
    if (validator.isEmail(email)) {
      return ;
    }
    return (
      <small id="emailHelp" className="form-text">
       מייל לא תקין
      </small>
    );
  };
  validatePhone = (phone) => {
    if (phone.length>9) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
       שדה חובה
      </small>
    );
  };
  validateType = (type) => {
    if (isValidName(type)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
      שדה חובה
      </small>
    );
  };
 
  
  validateFormBtn = (phone, firstName, lastName, email, type) => {
    if (
      isValidPhone(phone) &&
      isValidName(firstName)&&
      isValidName(lastName)&&
      type.length>0 &&
      validator.isEmail(email)
    ) {
      return (
        <button
          id="add-product-btn"
          onClick={() => {
            return this.handleClick();
          }}
          onMouseUp={async () => {
            return this.props.toggleModal();
          }}
          className="btn btn-primary"
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

  // handleChange = e => {
  //   this.setState({language: Array.isArray(e) ? e.map(x => x.value) : []})
  //   console.log(this.state.language)
  // }
  
  render() {
    const options = [
      { value: 'מנהל המערכת', label: 'מנהל המערכת' },
      { value: 'דרג מינהלי', label: 'דרג מינהלי' },
      { value: 'ניהול בית ידידיה', label: 'ניהול בית ידידיה' },
      { value: 'תפעול בית ידידיה', label: 'תפעול בית ידידיה' },
      { value: 'ניהול אור הכרמל', label: 'ניהול אור הכרמל' },
      { value: 'תפעול אור הכרמל', label: 'תפעול אור הכרמל' },
      { value: 'ניהול הדר הכרמל', label: 'ניהול הדר הכרמל' },
      { value: 'תפעול הדר הכרמל', label: 'תפעול הדר הכרמל' }
    ]
  
    return (
      <form>
      <div >
      <div class="form-group">
          <labal className={classes.newexpense}></labal>
          <div className={classes.row}>
              <div className={classes.col11}>
              <label>שם משפחה</label>
            <div className="col">
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ lastName: e.target.value });
                }}
                value={this.state.lastName}
              />
             {this.validateLastName(this.state.lastName)}
              
            </div>
          
            </div>
            <div className={classes.col4}>
            <div className="col">
            <label>שם פרטי</label>
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ firstName: e.target.value });
                }}
                value={this.state.firstName}
              />
               {this.validateFirstName(this.state.firstName)}
            </div>
            </div>
            <div className={classes.col10}>
            <div className="col">
          <label>טלפון</label>
            <input
                id="phone"
                type="text"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ phone: e.target.value });
                }}
                value={this.state.phone}
              />
               {this.validatePhone(this.state.phone)}
            </div>
            </div>
    
          </div>
        </div>
        
        <div class="form-group">
          <label className={classes.newexpense}></label>
          <div className={classes.row}>
          <div className={classes.col11}>
            <labal>אימייל</labal>
            <div className="col">
            <input
                id="email"
                type="text"
                className="form-control"
                placeholder=""
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                value={this.state.email}
              />
                 {this.validateEmail(this.state.email)}
            </div>
            </div>
            <div className={classes.col4}>
            <labal>סוג הרשאה</labal>
            <div className="col">
            <Select id="type_permission"
              options={options}
              onChange={(e) => {
                this.setState({type_permission: e.value})
              }}
              placeholder="בחר סוג הרשאה"
              isSearchable
              autoFocus
              value={options.filter(x=> this.state.type_permission.includes(x.value))}
              />
            </div>
            </div>
            <div className={classes.col10}>
            <div className="col">
            <label>סיסמה</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder=""
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                value={this.state.password}
              />
            </div>
            </div>
            </div>
            </div>
        {this.validateFormBtn(
          this.state.phone,
          this.state.firstName,
          this.state.lastName,
          this.state.email,
          this.state.type_permission,
        )}
      </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  saveUsersToLocal(state.users);
  return {
    modal: state.modal,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  addUsers,
  toggleModal,
})(AddUsers);
