import React, { Component } from "react";
import { connect } from "react-redux";
import { addProductsInventory, toggleModal,addMovements,addListBasket,updateRowListBasketProduct } from "../actions";
import Select from 'react-select'
import {
  saveProductInventoryToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  isValidPhone,getIndexByNameListProduct
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";

class AddInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameProducts: "",
      type: "",
      manufacture:"",
      count: 0,
      size: "",
      endDate: "",
    };
  }
  handleClick = () => {
    if (
      this.props.productsInventory.filter((p) => (parseInt(this.state.code) === p.code) && (p.endDate === this.state.endDate))
        .length === 0
    ) {
      this.props.addProductsInventory({
        id: 10000*Math.random().toFixed(4),
        code:parseInt(getElementsValue("code")),
        nameProducts:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.name)[0]),
        type:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.type)[0]),
        manufacture:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.manufacture)[0]),
        count:parseInt(getElementsValue("count")),
        size:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.size)[0]),
        endDate: this.state.endDate,
      });
      const newMovements = {  
        id:10000*Math.random().toFixed(4),
        name:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.name)[0]),
        code:parseInt(this.state.code),
        type:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.type)[0]),
        manufacture:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.manufacture)[0]),
        size:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.size)[0]),
        center:"מרכז הכרמל",
        count: parseInt(this.state.count),
        endDate:this.state.endDate,
        status:"מלאי נכנס",
        created_date:new Date().toDateString()}
        this.props.addMovements(newMovements)
      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: "רשומה זו קיימת במערכת",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
    }
    this.setState({
      nameProducts: "",
      type: "",
      manufacture:"",
      count: 0,
      size: "",
      endDate: "",
      countOfError:"",
    });
  };
  validateProductName = (productName) => {
    if (isValidName(productName)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        נא לציין שם מוצר
      </small>
    );
  };
  validateId = (id) => {
    if (isValidName(id)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
      נא לציין מק"ט/מספר סידורי
      </small>
    );
  };
  validateSize = (size) => {
    if (isValidName(size)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
          לציין יחידות מידה
      </small>
    );
  };
  validateDate = (endDate) => {
    if (new Date(endDate).valueOf() > new Date().valueOf()) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
      תאריך תפוגה
      </small>
    );
  };
  validateCost = (cost) => {
    if (isValidNumber(cost)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
       
      </small>
    );
  };

  validateCount = (count) => {
    if (isValidNumber(count)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
       
      </small>
    );
  };
 
 
  validateFormBtn = ( code,count, endDate) => {
    if (
      (this.props.products.filter((x)=> parseInt(this.state.code) === x.code)).length>0 &&
      (new Date(endDate).valueOf() > new Date().valueOf())&&
      count>0
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
          <div className={classes.col11}>
            
            <div className="col">
            <labal>כמות</labal> 
              <input
                id="count"
                type="text"
                className="form-control"
                placeholder=""
                onChange={(e) => {
                  this.setState({ count: e.target.value });
                }}
                value={this.state.count}
              />
           
            </div>
            </div>
            <div className={classes.col4}>
            <div className="col">
            <labal>תאריך תפוגה</labal> 
            <input
            className={classes.NewExpenseInput1}
            type='date'
            min='2019-01-01'
            max='2030-12-31'
            onChange={(e) => {
              this.setState({ endDate: e.target.value });
            }}
            value={this.state.endDate }
            
            
          />
         
            </div>
            </div>
            <div className={classes.col10}>
            
            <div className="col">
            <labal>מק"ט</labal> 
              <input
                id="code"
                type="text"
                className="form-control"
                placeholder=""
                onChange={(e) => {
                  this.setState({ code: e.target.value });
                }}
                value={this.state.code}
              />
            
              {this.validateProductName(this.state.code)}
            
            </div>
            </div>
            {console.log(this.props.products.filter((x)=>x.code === parseInt(this.state.code)).map((y)=>y.name))}

          </div>
        </div>
    
        {this.validateFormBtn(
          this.state.code,
          this.state.count,
          this.state.endDate
        )}
      </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  saveProductInventoryToLocal(state.productsInventory);
  return {
    basketProducts:state.basketProducts,
    modal: state.modal,
    productsInventory: state.productsInventory,
    products:state.products,
  };
};

export default connect(mapStateToProps, {
  addProductsInventory,
  toggleModal,addListBasket,updateRowListBasketProduct,addMovements
})(AddInventory);
