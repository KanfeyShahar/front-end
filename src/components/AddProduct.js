import React, { Component } from "react";
import { connect } from "react-redux";
import { addProducts, toggleModal } from "../actions";
import {
  saveProductToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      productNote: "",
      manufacture: "",
      type: "",
      size: "",
      price:0.00
    };
  }
  handleClick = () => {
    if (
      this.props.products.filter((p) => p.name === getElementsValue("name"))
        .length === 0
    ) {
      const newProduct = {
        code: 10000*Math.random().toFixed(4),
        name: getElementsValue("name"),
        productNote: getElementsValue("productNote"),
        manufacture: getElementsValue("manufacture"),
        type: getElementsValue("type"),
        size: getElementsValue("size"),
        price:(0.00).toFixed(2),
        count:"",
      }

      this.props.addProducts(newProduct);



      // const message = await axios.post('localhost:5000/save_product',{...this.props.products[10]})
      // console.log(message)
      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: "מוצר קיים",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
    }
    this.setState({
      name: "",
      productNote: "",
      manufacture: "",
      type: "",
      size: "",
      price:0.00
    });
  };
  validateName = (name) => {
    if (isValidName(name)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
         שם מוצר
      </small>
    );
  };
  validateProductNote = (productNote) => {
    if (isValidName(productNote)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        לציין הערות על המוצר
      </small>
    );
  };


  validateNumberOfHome = (size) => {
    if (isValidNumber(size)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        מחיר-לא חובה
      </small>
    );
  };
 
  validateFormBtn = (name,size) => {
    if (
     
      isValidName(name) &&
      isValidName(size)
 
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
          <label className={classes.newexpense}></label>
          <div className={classes.row}>
            <div className={classes.col11}>
            <div className="col">שם מוצר
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="***"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
                value={this.state.name}
              />
            </div>
            </div>
            <div className={classes.col4}>
            <div className="col">תיאור
              <input
                id="productNote"
                type="text"
                className="form-control"
                placeholder=""
                onChange={(e) => {
                  this.setState({ productNote: e.target.value });
                }}
                value={this.state.productNote}
              />
            </div>
            </div>
            <div className={classes.col10}>
            <div className="col">מחיר
              <input
                id="price"
                type="number"
                className="form-control"
                placeholder=""
                onChange={(e) => {
                  this.setState({ price: e.target.value });
                }}
              />
            </div>
            </div>
          
          </div>
        </div>
        
        <div class="form-group">
          <label className={classes.newexpense}></label>
          <div className={classes.row}>
          <div className={classes.col3}>
            <div className="col-md-10">סוג
            <input
                id="type"
                type="text"
                className="form-control"
                placeholder=""
                onChange={(e) => {
                  this.setState({ type: e.target.value });
                }}
                value={this.state.type}
              />
            </div>
            </div>
            <div className={classes.col4}>
            <div className="col-md-10">יצרן
            <input
                id="manufacture"
                type="text"
                className="form-control"
                placeholder=""
                onChange={(e) => {
                  this.setState({ manufacture: e.target.value });
                }}
                value={this.state.manufacture}
              />
            </div>
            </div>
            <div className={classes.col5}>
            <div className="col-md-10">יחידת מידה
            <input
                id="size"
                type="text"
                className="form-control"
                placeholder="***"
                onChange={(e) => {
                  this.setState({ size: e.target.value });
                }}
                value={this.state.size}
              />

              
            </div>
            </div>
          </div>
        </div>
        <div >
          
          <div className={classes.row1}>
       
            </div>
            

          </div>
     
        <div>
   
        </div>
      

        {this.validateFormBtn(
          this.state.name,
          this.state.size,
        )}
      </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  saveProductToLocal(state.products);
  return {
    modal: state.modal,
    products: state.products,
  };
};

export default connect(mapStateToProps, {
  addProducts,
  toggleModal,
})(AddProduct);
