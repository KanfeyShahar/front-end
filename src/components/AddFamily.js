import React, { Component } from "react";
import { connect } from "react-redux";
import { addFamily, toggleModal } from "../actions";
import {
  saveFamilyToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  isValidPhone,
} from "../helper-functions";
import axios from 'axios'
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";

class AddFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      city:"",
      address: "",
      remarks: "",
      numberOfPerson: "",
      language:"",
      status: "",
      food: "",
      hot: "",
      created_date:"",
      latitude:"",
      longitude:"",
      floor:"",
      entrance:"",
      apartment:"",
    };
  }
  handleClick = () => {
    if (
      this.props.families.filter((p) => p.phone === getElementsValue("phone"))
        .length === 0
    ) {
      const newFamily ={
        id: 10000*Math.random().toFixed(4),
        firstName: getElementsValue("firstName"),
        lastName: getElementsValue("lastName"),
        phone: getElementsValue("phone"),
        city: getElementsValue("city"),
        address: getElementsValue("address"),
        remarks:getElementsValue("remarks"),
        numberOfPerson: parseInt(getElementsValue("numberOfPerson")),
        language:getElementsValue("language"),
        status: true,
        food: (getElementsValue("food")===""?false:true),
        hot: (getElementsValue("hot") === ""? false : true),
        apartment:this.state.apartment,
        entrance:this.state.entrance,
        floor:this.state.floor,
        created_date: new Date(),
        dateEnd:"",
      }
      this.props.addFamily(newFamily);
      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: "המשפחה נוספה בעבר",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
    }
    this.setState({
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      address: "",
      remarks: "",
      numberOfPerson:"",
      language:"",
      status: "",
      food: "",
      hot: "",
      created_date:"",
      floor:"",
      entrance:"",
      apartment:"",
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
  
  validatePhone = (phone) => {
    if (isValidPhone(phone)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
       שדה חובה
      </small>
    );
  };
  validateCity = (city) => {
    if (isValidName(city)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
       שדה חובה
      </small>
    );
  };
  validateNumberOfHome = (numberOfHome) => {
    if (isValidNumber(numberOfHome)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
       שדה חובה
      </small>
    );
  };
  validateNumberOfPerson = (numberOfPerson) => {
    if (isValidNumber(numberOfPerson)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        שדה חובה
      </small>
    );
  };
  validateFormBtn = (phone, address, city) => {
    if (
      isValidPhone(phone) 
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


  render() {
    return (
      <form>
      <div >
        <div class="form-group">
          <div className={classes.row}>
            <div className={classes.col1}>
            <labal>שם ראש המשפחה</labal>
            <div className="col">
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="*****"
                onChange={(e) => {
                  this.setState({ firstName: e.target.value });
                }}
                value={this.state.firstName}
              />
            </div>
            </div>
            <div className={classes.col}>
            <labal>שם משפחה</labal>
            <div className="col">
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="*****"
                onChange={(e) => {
                  this.setState({ lastName: e.target.value });
                }}
                value={this.state.lastName}
              />
              {this.validateLastName(this.state.lastName)}
            </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
        
          <div className={classes.row}>
          
          <div className={classes.col3}>
          <labal>הערות</labal>
            <div className="col-md-10">
            <input
                id="remarks"
                type="text"
                className="form-control"
                placeholder=""
                onChange={(e) => {
                  this.setState({ remarks: e.target.value });
                }}
                value={this.state.remarks}
              />
            </div>
            </div>
            <div className={classes.col4}>
            <labal>כתובת</labal>
            <div className="col-md-10">
            <input
                id="address"
                type="text"
                className="form-control"
                placeholder="*****"
                onChange={(e) => {
                  this.setState({ address: e.target.value });
                }}
                value={this.state.address}
              />
 
            </div>
            </div>
            <div className={classes.col5}>
            <labal>עיר</labal>
            <div className="col-md-10">
            <input
                id="city"
                type="text"
                className="form-control"
                placeholder="*****"
                onChange={(e) => {
                  this.setState({ city: e.target.value });
                }}
                value={this.state.city}
              />
              {this.validateCity(this.state.city)}

              
            </div>
            </div>
          </div>
        </div>
        <div class="form-group">
        
        <div className={classes.row}>
        
        <div className={classes.col3}>
        <labal>קומה</labal>
          <div className="col-md-10">
          <input
              id="floor"
              type="text"
              className="form-control"
              placeholder=""
              onChange={(e) => {
                this.setState({floor: e.target.value });
              }}
              value={this.state.floor}
            />
          </div>
          </div>
          <div className={classes.col4}>
          <labal>כניסה</labal>
          <div className="col-md-10">
          <input
              id="entrance"
              type="text"
              className="form-control"
              placeholder=""
              onChange={(e) => {
                this.setState({entrance: e.target.value });
              }}
              value={this.state.entrance}
            />
          </div>
          </div>
          <div className={classes.col5}>
          <labal>מספר דירה</labal>
          <div className="col-md-10">
          <input
              id="apartment"
              type="text"
              className="form-control"
              placeholder=""
              onChange={(e) => {
                this.setState({apartment: e.target.value });
              }}
              value={this.state.apartment}
            />            
          </div>
          </div>
        </div>
      </div>
        <div >
        <div class="form-group">
          <div className={classes.row}>
          <div className={classes.col3}>
          <labal> טלפון</labal>
            <div className="col-md-10">
              <input
                id="phone"
                type="text"
                className="form-control"
                placeholder=" "
                onChange={(e) => {
                  this.setState({ phone: e.target.value });
                }}
                value={this.state.phone}
              />
              {this.validatePhone(this.state.phone)}
            </div>
            </div>
            <div className={classes.col4}>
            <labal> שפת אם</labal>
            <div className="col-md-10">
            <select id="language" className="form-control" placeholder="">
              <option>עברית</option>
              <option>אנגלית</option>
              <option>רוסית</option>
              <option>ערבית</option>
            </select>
              
            </div>
            </div>
            <div className={classes.col4}>
            <div className="col-md-10">
            <labal> מספר נפשות</labal>
              <input
                id="numberOfPerson"
                type="number"
                className="form-control"
                onChange={(e) => {
                  this.setState({ numberOfPerson: e.target.value });
                }}
                value={this.state.numberOfPerson}
              />
              {this.validateNumberOfPerson(this.state.numberOfPerson)}
            </div>
            </div>

          </div>
        </div>
        </div>
        <div>
            <span>
          {/* <label>
            <input type="checkbox" id="status"
            className="form-check-input"
            checked={this.state.status}
             onChange={(e) => {
                this.setState({ status: e.target.checked })}}
                value={this.state.status}
              />
            מצב
          </label> */}
            <div className={classes.row}>
            <div className={classes.col8}>
          <label>
            <input type="checkbox" id="food"
            className="form-check-input"
            checked={this.state.food}
             onChange={(e) => {
                this.setState({ food: e.target.checked })}}
                value={this.state.food}
              />
            סל מזון
          </label>
          </div>
          <label>
            <input type="checkbox" id="hot"
            className="form-check-input"
            checked={this.state.hot}
             onChange={(e) => {
                this.setState({ hot: e.target.checked })}}
                value={this.state.hot}
              />
            ארוחה חמה
          </label>
         
          {/* <label >
            תאריך תחילה
          <input
            type='date' id="created_date"
            min='2015-01-01'
            max='2025-12-31'
            onChange={(e) => {
              this.setState({created_date: e.target.value })}}
              value={this.state.created_date}
          />
          </label> */}
          </div>


          </span>
        </div>
      

        {this.validateFormBtn(
          this.state.phone,
          this.state.address,
          this.state.city,
        )}
      </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  saveFamilyToLocal(state.families);
  return {
    modal: state.modal,
    families: state.families,
  };
};

export default connect(mapStateToProps, {
  addFamily,
  toggleModal,
})(AddFamily);
