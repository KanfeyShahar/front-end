import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addVolunteer, toggleModal } from "../actions";
import {
  saveFamilyToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  isValidPhone,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";

class AddVolunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      center: "",
      role: "",
      language: "",
      status: "",
      type: "",
      driver: "",
      created_date: "",
      date_birthday: "",
    };
  }
  handleClick = () => {
    if (
      this.props.volunteers.filter((p) => p.id === getElementsValue("id"))
        .length === 0
    ) {
      const friends = {
        id: parseInt(getElementsValue("id")),
        firstName: getElementsValue("firstName"),
        lastName: getElementsValue("lastName"),
        phone: getElementsValue("phone"),
        center: this.state.center,
        role: getElementsValue("role"),
        language: this.state.language,
        status: true,
        type: this.state.type,
        driver: (getElementsValue("driver")===""?false:true),
        created_date: new Date(),
        date_birthday: this.state.date_birthday,
        dateEnd: "",
      };
     this.props.addVolunteer(friends);
      
     
    
    } else {
      Swal.fire({
        icon: "error",
        title: "המתנדב קיים במערכת",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
    }
    this.setState({
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      center: "",
      address: "",
      role: "",
      language: "",
      status: "",
      type: "",
      driver: "",
      created_date: "",
      date_birthday: "",
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
  validateId = (firstName) => {
    if (isValidName(firstName)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        שדה חובה
      </small>
    );
  };
  validateAddress = (address) => {
    if (isValidName(address)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        לפחות 2 תווים
      </small>
    );
  };
  validatePhone = (phone) => {
    if (phone.length > 9) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        שדה חובה
      </small>
    );
  };
  validateCenter = (center) => {
    if (isValidName(center)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        חייב לכתוב רחוב
      </small>
    );
  };
  validateRole = (role) => {
    if (isValidName(role)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        חייב לכתוב מספר בית
      </small>
    );
  };
  validateLanguage = (language) => {
    if (isValidName(language)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        חייב לכתוב מספר נפשות
      </small>
    );
  };
  validateFormBtn = (phone, id) => {
    if (isValidPhone(phone) && isValidName(id)) {
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
      { value: " עברית", label: "עברית" },
      { value: " אנגלית", label: "אנגלית" },
      { value: " ערבית", label: "ערבית" },
      { value: " רוסית", label: "רוסית" },
    ];

    const options1 = [
      { value: "עובד/ת", label: "עובד/ת" },
      { value: "מתנדב/ת", label: "מתנדב/ת" },
    ];
    const options2 = [
      { value: "בית ידידיה", label: "בית ידידיה" },
      { value: "מרכז הכרמל", label: "מרכז הכרמל" },
      { value: "אור הכרמל", label: "אור הכרמל" },
    ];

    const { language } = this.state;
    return (
      <form>
        <div>
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
                  <label>תעודת זהות</label>
                  <input
                    id="id"
                    type="text"
                    className="form-control"
                    placeholder="****"
                    onChange={(e) => {
                      this.setState({ id: e.target.value });
                    }}
                    value={this.state.id}
                  />
                  {this.validateId(this.state.id)}
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label className={classes.newexpense}></label>
            <div className={classes.row}>
              <div className={classes.col11}>
                <labal>תפקיד</labal>
                <div className="col">
                  <input
                    id="role"
                    type="text"
                    className="form-control"
                    placeholder=""
                    onChange={(e) => {
                      this.setState({ role: e.target.value });
                    }}
                    value={this.state.role}
                  />
                </div>
              </div>
              <div className={classes.col4}>
                <labal>מרכז</labal>
                <div className="col">
                  <Select
                    id="type"
                    options={options2}
                    onChange={(e) => {
                      this.setState({ center: e.value });
                    }}
                    placeholder="מרכז"
                    isSearchable
                    autoFocus
                    value={options2.filter((x) =>
                      this.state.center.includes(x.value)
                    )}
                  />
                </div>
              </div>
              <div className={classes.col10}>
                <labal>שפות</labal>
                <div className="col">
                  <Select
                    id="language"
                    options={options}
                    onChange={(e) => {
                      this.setState({
                        language: Array.isArray(e) ? e.map((x) => x.value) : [],
                      });
                      console.log(this.state.language);
                    }}
                    placeholder="שפות"
                    isSearchable
                    isMulti
                    autoFocus
                    value={options.filter((x) =>
                      this.state.language.includes(x.value)
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div className={classes.row}>
              <div className={classes.col11}>
                <labal>טלפון</labal>
                <div className="col">
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

              <div className={classes.col4}>
                <labal>סוג חברות</labal>
                <div className="col">
                  <Select
                    id="type"
                    options={options1}
                    onChange={(e) => {
                      this.setState({ type: e.value });
                    }}
                    placeholder="סוג חברות"
                    isSearchable
                    autoFocus
                    value={options1.filter((x) =>
                      this.state.type.includes(x.value)
                    )}
                  />
                </div>
              </div>
              <div className={classes.col5}>
                <labal>תאריך לידה</labal>
                <div className="col">
                  <input
                    className={classes.NewExpenseInput1}
                    type="date"
                    min="2019-01-01"
                    max="2030-12-31"
                    onChange={(e) => {
                      this.setState({ date_birthday: e.target.value });
                    }}
                    value={this.state.date_birthday}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.col20}>
            <label>
              <input
                type="checkbox"
                id="driver"
                className="form-check-input"
                checked={this.state.driver}
                onChange={(e) => {
                  this.setState({ driver: e.target.checked });
                }}
                value={this.state.driver}
              />
              נהג
            </label>
          </div>

          {/* <div >
        <label className={classes.newexpense}></label>
          <div className={classes.row1}>
          <div className={classes.col7}>
            <div className="col-md-10">
            <label >טלפון</label>
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
            <label className={classes.newexpense}></label>
            </div>
          </div>
        </div>
        <div>
  
        </div>
       */}

          {this.validateFormBtn(this.state.phone, this.state.id)}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  saveFamilyToLocal(state.volunteers);
  return {
    modal: state.modal,
    volunteers: state.volunteers,
  };
};

export default connect(mapStateToProps, {
  addVolunteer,
  toggleModal,
})(AddVolunteer);
