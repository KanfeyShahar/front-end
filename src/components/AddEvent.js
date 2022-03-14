import React, { Component } from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import { addEvent, toggleModal } from "../actions";
import {
  saveEventsToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  isValidPhone,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";
import volunteers from "../pages/volunteers";


class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:"",
      name: "",
      remarks:"",
      startDate: "",
      type: "",
      status:"false",
    };
  }
  handleClick = () => {
    if (
     (this.props.events.filter((y)=>y.startDate === this.state.startDate)).length === 0
    ) {
      const Event = { id: 10000*Math.random().toFixed(4),
        name: getElementsValue("name"),
        startDate: this.state.startDate,
        remarks:getElementsValue("remarks"),
        type: this.state.type,
        status:false,
        basket1:0,
        basket2:0,
        basket3:0,
        basket4:0,
        basket5:0,
        dateEnd:""}
      this.props.addEvent(Event)

      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
        
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: "אירוע קיים במערכת",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
    }
    
    this.setState({
      id:"",
      name: "",
      startDate: "",
      type: "",
      remarks:"",
      status:"false",
    });
  };
  
  validateType = (id) => {
    if (isValidName(id)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">שדה חובה
      </small>
    );
  };
  validateName = (id) => {
    if (isValidName(id)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">שדה חובה
      </small>
    );
  };

  
  validateDate = (date) => {
    if (new Date(date).valueOf() >= new Date().valueOf()) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
     תאריך התחלה-שדה חובה
      </small>
    );
  };
 
  validateFormBtn = ( type,name,date) => {
    if (
      isValidName(type)&&
      isValidName(name) &&
      (new Date(date).valueOf() >= new Date().valueOf())
     
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
    const options2 = [
      { value: 'סל מזון', label: 'סל מזון' },
      { value: 'ארוחה חמה', label: 'ארוחה חמה' },
    ]
    return (
      <form>
      <div >
      <div class="form-group">
          <div className={classes.row}>
              <div className={classes.col1}>
              <label>שם אירוע*</label>
            <div className="col">
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
                value={this.state.name}
              />
              {/* {this.validateName(this.state.name)} */}
              
            </div>
          
          
            </div>
            <div className={classes.col}>
            <div className="col">
            <label>תיאור אירוע</label>
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
            </div></div>
            <div class="form-group">
              <div className={classes.row}>
            
            <div className={classes.col99}>
            <labal>תאריך* </labal>
            <div className="col">
            <input
            className={classes.NewExpenseInput1}
            type='date'
            min='2019-01-01'
            max='2030-12-31'
            onChange={(e) => {
              this.setState({ startDate: e.target.value });
            }}
            value={this.state.startDate}
            
            
          />   
          <br/>
          {this.validateName(this.state.name)}
          </div>
         </div>
         
          <div className={classes.col}>
            <labal>סוג אירוע*</labal>
            <Select id="type"
              options={options2}
              onChange={(e) => {
                this.setState({type: e.value})
              }}
              placeholder="סל מזון/ ארוחה חמה"
              isSearchable
              autoFocus
              value={options2.filter(x=> this.state.type.includes(x.value))}
              />

         
            </div>
          </div>

        </div>
        
        <div>
  
        </div>
      

        {this.validateFormBtn(
          this.state.type,
          this.state.name,
          this.state.startDate
        )}
      </div>
      </form>
      
    );
  }
}

const mapStateToProps = (state) => {
  saveEventsToLocal(state.events);
  return {
    modal: state.modal,
    events: state.events,
    families:state.families,
    volunteers: state.volunteers
  };
};

export default connect(mapStateToProps, {
  addEvent,
  toggleModal,
})(AddEvent);
