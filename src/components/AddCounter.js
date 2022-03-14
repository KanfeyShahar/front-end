import React, { Component } from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import { addCounter, toggleModal,addCounter1 } from "../actions";
import {
  saveEventsToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  isValidPhone,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";



class AddCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:"",
      name: "",
      remarks:"",
      startDate: "",
      number: 0,
      status:false,
      type:"",
    };
  }
  handleClick = () => {
    if (
      this.props.counter_inventory.filter((x)=>x.startDate === this.state.startDate).length ===0
    ) {
      const Counter = { 
        id: 10000*Math.random().toFixed(4),
        name: getElementsValue("name"),
        startDate: this.state.startDate,
        remarks:getElementsValue("remarks"),
        number: "0",
        type:this.state.type,
        status:false,
      }
      if(this.state.type ==="מלאי מזון"){
        this.props.addCounter(Counter)
        this.props.productsInventory.map((x)=>
        this.props.addCounter1({
          id:10000*Math.random().toFixed(4),
          id_number:x.id,
          startDate:this.state.startDate,
          code:x.code,
          nameProducts:x.nameProducts,
          center:"",
          count:x.count,
          count_actual:"",
          endDate:x.endDate,
          remarks:""
        })
        )
      }else{
        this.props.addCounter(Counter)
        this.props.equipments.map((x)=>
        this.props.addCounter1({
          id:10000*Math.random().toFixed(4),
          id_number:x.id,
          startDate:this.state.startDate,
          center:x.center,
          code:x.id,
          nameProducts:x.name_equipment,
          count:x.count,
          count_actual:"",
          endDate:"",
          remarks:""
        })
        )
      }
    
     

      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
        
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: "תאריך ספירה קיים במערכת",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
    }
    
    this.setState({
      id:"",
      name: "",
      startDate: "",
      number: 0,
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
 
  validateFormBtn = (name,date) => {
    if (
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
      { value: 'מלאי מזון', label: 'מלאי מזון' },
      { value: 'ציוד', label: 'ציוד' },
    ]
    return (
      <form>
      <div >
      <div class="form-group">
         </div>
            <div class="form-group">
              <div className={classes.row}>
            
            <div className={classes.col11}>
            <label>שם אחראי</label>
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
              {this.validateName(this.state.name)}
              
            </div>
         </div>
          <div className={classes.col4}>
          <label>אירוע ספירה</label>
            <div className="col">
            <Select id="type"
              options={options2}
              onChange={(e) => {
                this.setState({type: e.value})
              }}
              placeholder="שדה חובה"
              isSearchable
              autoFocus
              value={options2.filter(x=> this.state.type.includes(x.value))}
              />
             
            </div>
           

         
            </div>
            <div className={classes.col11}>
            <labal> תאריך ביצוע הספירה </labal>
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
          </div>
           

         
            </div>
          </div>

        </div>
        <div className={classes.row}>
              <div className={classes.col9}>
              <labal>הערות</labal>
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
        <div>
  
        </div>
      

        {this.validateFormBtn(
          this.state.name,
          this.state.startDate
        )}
      </div>
      </form>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    counter_inventory:state.counter_inventory,
    productsInventory:state.productsInventory,
    equipments:state.equipments
  };
};

export default connect(mapStateToProps, {
  addCounter,
  addCounter1,
  toggleModal,
})(AddCounter);
