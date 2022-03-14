import React, { Component } from "react";
import Select from 'react-select'
import validator from 'validator'
import { connect } from "react-redux";
import { addPermissions, toggleModal } from "../actions";
import {
  savePermissionsToLocal
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";


class AddPermissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_permission:"",
    };
  }
  handleClick = (e) => {
     
      this.props.addPermissions({
        id: 10000*Math.random().toFixed(4),
        type_permission: this.state.type_permission,
        hall: "אין הרשאה",
        rooms:"אין הרשאה",
        products:"אין הרשאה",
        orders:"אין הרשאה",
        inventory:"אין הרשאה",
        movements:"אין הרשאה",
        equipments:"אין הרשאה",
        cars:"אין הרשאה",
        monitoring_inventory:"אין הרשאה",
        friends:"אין הרשאה",
        family:"אין הרשאה",
        event:"אין הרשאה",
        monitoring_event:"אין הרשאה",
      });
      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
      // });
    
    this.setState({
      type_permission:"",
    });
    e.preventDefault()
  };
 
  
  validateFormBtn = () => {
    {
      return (
        <button
          id="add-product-btn"
          onClick={(e) => {
            return this.handleClick(e);
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
      
            <div className={classes.col70}>
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
            
           
        {this.validateFormBtn(
        )}
      </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  savePermissionsToLocal(state.permissions);
  return {
    modal: state.modal,
    permissions: state.permissions,
  };
};

export default connect(mapStateToProps, {
  addPermissions,
  toggleModal,
})(AddPermissions);
