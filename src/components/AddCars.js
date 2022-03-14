import React, { Component } from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import { addCar, toggleModal } from "../actions";
import {
  saveCarsToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  isValidPhone,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";


class AddCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCars:"",
      typeCar: "",
      engineCapacity: "",
      year: "",
      kilometer: "",
      cost: "",
      carModel: "",
      testValidity: "",
       insurance:"",
       status:true,
       dateEnd:"",
    };
  }
  handleClick = () => {
    if (
      this.props.cars.filter((p) => p.idCars === getElementsValue("idCars"))
        .length === 0
    ) {
      const newCar = {id:10000*Math.random().toFixed(4),
        idCars: getElementsValue("idCars"),
        typeCar: getElementsValue("typeCar"),
        engineCapacity: getElementsValue("engineCapacity"),
        year: parseInt(getElementsValue("year")),
        kilometer: getElementsValue("kilometer"),
        cost: getElementsValue("cost"),
        carModel:getElementsValue("carModel"),
        testValidity:this.state.testValidity,
        insurance: (this.state.insurance),
        date_type:new Date(),
        status: true,}
        console.log(newCar)
      this.props.addCar(newCar)
    } else {
      Swal.fire({
        icon: "error",
        title: "רכב זה קיים במערכת",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
    }
    this.setState({
      idCars:"",
      typeCar: "",
      engineCapacity: "",
      year: "",
      kilometer: "",
      cost: "",
      carModel: "",
      testValidity: "",
       insurance:"",
       status:true,
       dateEnd:"",
    });
  };
  validateIdCars = (idCars) => {
    if (isValidName(idCars)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">שדה חובה
      </small>
    );
  };
  validateType = (idCars) => {
    if (isValidName(idCars)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">שדה חובה
      </small>
    );
  };
  validateEngine = (idCars) => {
    if (isValidName(idCars)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">שדה חובה
      </small>
    );
  };
  validateCarModel = (idCars) => {
    if (isValidName(idCars)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">שדה חובה
      </small>
    );
  };
  validateYear = (idCars) => {
    if (isValidNumber(idCars)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">שדה חובה
      </small>
    );
  };
  validateCost = (idCars) => {
    if (isValidNumber(idCars)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">שדה חובה
      </small>
    );
  };
  validateKilometer = (idCars) => {
    if (isValidNumber(idCars)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">שדה חובה
      </small>
    );
  };
  validateDate = (date) => {
    if (new Date(date).valueOf() > new Date().valueOf()) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
     תאריך עתידי
      </small>
    );
  };
 
  validateFormBtn = (id, type,engine,year,kilometer,cost,carModel,testValidity) => {
    if (
      isValidName(id) &&
      isValidName(type)&&
      isValidName(engine) &&
      isValidNumber(year) &&
      isValidNumber(kilometer) &&
      isValidNumber(cost) &&
      isValidName(carModel) &&
      (new Date(testValidity).valueOf() > new Date().valueOf())
     
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
      { value: ' מקיף', label: 'מקיף' },
      { value: ' חובה', label: 'חובה' },
      { value: ' צד ג', label: 'צד ג' },
    ]
    
    
    
    const { language } = this.state;
    return (
      <form>
      <div >
      <div class="form-group">
          <labal className={classes.newexpense}></labal>
          <div className={classes.row}>
              <div className={classes.col11}>
              <label>מספר רכב</label>
            <div className="col">
              <input
                id="idCars"
                type="text"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ idCars: e.target.value });
                }}
                value={this.state.idCars}
              />
              {this.validateIdCars(this.state.idCars)}
              
            </div>
          
            </div>
            <div className={classes.col4}>
            <div className="col">
            <label>סוג רכב</label>
              <input
                id="typeCar"
                type="text"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ typeCar: e.target.value });
                }}
                value={this.state.typeCar}
              />
               {this.validateType(this.state.typeCar)}
            </div>
            </div>
            <div className={classes.col10}>
            <div className="col">
          <label>נפח מנוע</label>
            <input
                id="engineCapacity"
                type="text"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ engineCapacity: e.target.value });
                }}
                value={this.state.engineCapacity}
              />
              {this.validateEngine(this.state.engineCapacity)}
            </div>
            </div>
    
          </div>
        </div>
        
        <div class="form-group">
          <label className={classes.newexpense}></label>
          <div className={classes.row}>
          <div className={classes.col11}>
            <labal>שנת רכב</labal>
            <div className="col">
            <input
                id="year"
                type="number"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ year: e.target.value });
                }}
                value={this.state.year}
              />
                {this.validateYear(this.state.year)}
            </div>
            </div>
            <div className={classes.col4}>
            <labal>ק"מ בפועל</labal>
            <div className="col">
            <input
                id="kilometer"
                type="number"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ kilometer: e.target.value });
                }}
                value={this.state.kilometer}
              />
                {this.validateKilometer(this.state.kilometer)}
            </div>
            </div>
            <div className={classes.col10}>
            <labal>ביטוחים</labal>
            <div className="col">
              <Select id="insurance"
              options={options}
              onChange={(e) => {
                this.setState({insurance: Array.isArray(e) ? e.map(x=>x.value) : []})
                console.log(this.state.insurance)
              }}
              placeholder="ביטוחים"
              isSearchable
              isMulti
              autoFocus
              value={options.filter(x=> this.state.insurance.includes(x.value))}
              />
              
            </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label className={classes.newexpense}></label>
          <div className={classes.row}>
          <div className={classes.col11}>
            <labal>שווי בפועל</labal>
            <div className="col">
            <input
                id="cost"
                type="number"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ cost: e.target.value });
                }}
                value={this.state.cost}
              />
                {this.validateCost(this.state.cost)}
            </div>
            </div>
            <div className={classes.col4}>
            <labal>דגם</labal>
            <div className="col">
            <input
                id="carModel"
                type="text"
                className="form-control"
                placeholder="****"
                onChange={(e) => {
                  this.setState({ carModel: e.target.value });
                }}
                value={this.state.carModel}
              />
                {this.validateCarModel(this.state.carModel)}
            </div>
            </div>
            <div className={classes.col5}>
          
            <labal>תוקף טסט</labal>
            <div className="col">
            <input
            className={classes.NewExpenseInput1}
            type='date'
            min='2019-01-01'
            max='2030-12-31'
            onChange={(e) => {
              this.setState({ testValidity: e.target.value });
            }}
            value={this.state.testValidity}
            
            
          />
          </div>
            </div>
          </div>
        </div>
        
        <div>
  
        </div>
      

        {this.validateFormBtn(
          this.state.idCars,
          this.state.typeCar,
          this.state.engineCapacity,
          this.state.year,
          this.state.kilometer,
          this.state.cost,
          this.state.carModel,
          this.state.testValidity
        )}
      </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  saveCarsToLocal(state.cars);
  return {
    modal: state.modal,
    cars: state.cars,
  };
};

export default connect(mapStateToProps, {
  addCar,
  toggleModal,
})(AddCars);
