import React, { Component } from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import { addMovements, toggleModal,addProductsInventory1,updateRowInventory1,updateRowBasket1 } from "../actions";
import classes1 from "./movements.module.css"
import {
  saveMovementsToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  isValidPhone,
  getIndexByNameProduct,
  getIndexByNameInventory1
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";


class AddMovements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code:"",
      name: "",
      center: "",
      type:"",
      manufacture:"",
      size: "",
      category: "",
      count: "",
      endDate: "",
      status: "",
      created_date:"",
    };
  }
  handleClick =  (e) => {
     const newMovements = {  
      id:10000*Math.random().toFixed(4),
      name:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.name)[0]),
      code:parseInt(this.state.code),
      type:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.type)[0]),
      manufacture:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.manufacture)[0]),
      size:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.size)[0]),
      center:"אור הכרמל",
      count: parseInt(this.state.count),
      endDate:this.state.endDate,
      status:"מלאי נכנס",
      created_date:new Date().toDateString()}
      console.log(newMovements)
      this.props.addMovements(newMovements)
      if( this.props.productsInventory.filter((p) => (p.code== parseInt(this.state.code)) && (p.endDate === this.state.endDate))
      .length !== 0) {
        const prodIdx1 =getIndexByNameInventory1(
          this.props.productsInventory,
          parseInt(this.state.code),
          this.state.endDate
        );
        console.log(prodIdx1)
        const newCount = parseInt(this.props.productsInventory[prodIdx1].count)+ parseInt(this.state.count)
        this.props.updateRowInventory1({
          id: this.props.productsInventory[prodIdx1].id,
          code:this.props.productsInventory[prodIdx1].code,
          nameProducts: this.props.productsInventory[prodIdx1].nameProducts,
          size: this.props.productsInventory[prodIdx1].size,
          type: this.props.productsInventory[prodIdx1].type,
          count:parseInt(this.props.productsInventory[prodIdx1].count)+ parseInt(this.state.count),
          endDate: this.props.productsInventory[prodIdx1].endDate,
          manufacture: this.props.productsInventory[prodIdx1].manufacture,
        })
        this.props.Basket.filter((x=>(x.startDate >new Date().toLocaleDateString('en-GB')) && !x.locked)).map((x)=>( 
          (x.code ===  parseInt(this.state.code)  ? 
            this.props.updateRowBasket1({
            startDate:x.startDate,
            id: x.id,
            id_inventory:x.id_inventory,
            code:x.code,
            nameProducts: x.nameProducts,
            size: x.size,
            type: x.type,
            count:newCount ,
            manufacture: x.manufacture,
            count_real1:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real1) ,
            count_real2:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real2) ,
            count_real5:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real5) ,
            count_real3:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real3) ,
            locked:false,
            count_real4:(parseInt(newCount)<parseInt(x.sum) ? 0 : x.count_real4) ,
            sum: (parseInt(newCount)<parseInt(x.sum) ? 0 : parseInt(x.sum) ),
           endDate:x.endDate,
           serialNumber:x.serialNumber
          }):x )
         ))

      }
      
      else{
        this.props.addProductsInventory1({
          code:this.state.code,
          id: 10000*Math.random().toFixed(4),
          nameProducts: (this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.name)[0]),
          type: (this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.type)[0]),
          manufacture:(this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.manufacture)[0]),
          count: this.state.count,
          size: (this.props.products.filter((y)=>parseInt(this.state.code) === y.code).map((x)=>x.size)[0]),
          endDate: this.state.endDate,
        })
      }
      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
      // });
      e.preventDefault()
     
  
    this.setState({
      name: "",
      center: "",
      type:"",
      manufacture:"",
      size: "",
      category: "",
      count: "",
      endDate: "",
      status: "",
      created_date:"",
    });
   
  };
  validateProduct = (id) => {
    if (id.length>5) {
      return <small  >
      <label className={classes1.invalid}>לפחות 2 תווים</label>
    </small>;
    }
  };
  
  validateFormBtn = (code,endDate,count) => {
    if (
      this.props.products.filter((x)=>x.code === parseInt(this.state.code)).length>0 && (new Date(endDate).valueOf() > new Date().valueOf()) &&
      count>0
     
    ) {
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
  
    
    
    
    const { language } = this.state;
    return (
      <form>
      <div >
      <div class="form-group">
          <labal className={classes.newexpense}></labal>
          <div className={classes.row}>
            
              <div className={classes.col11}>
            <labal>כמות</labal>
            <div className="col">
            <input
                id="count"
                type="number"
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
            <labal> תאריך תפוגה</labal>
            <div className="col">
            <input
            className={classes.NewExpenseInput1}
            type='date'
            min='2019-01-01'
            max='2030-12-31'
            onChange={(e) => {
              this.setState({endDate: e.target.value });
            }}
            value={this.state.endDate}
            
          
          />
             {new Date(this.state.endDate).valueOf() < new Date().valueOf() && <p className={classes.invalid4}>תאריך אינו תקין</p>}
         
          </div>

            </div>
            <div className={classes.col10}>
            <div className="col">
            <label>קוד מוצר</label>
          <input
                id="code"
                type="text"
                className="form-control"
                onChange={(e) => {
                  this.setState({ code: e.target.value})
                }}
                value={this.state.code}
              />
                {/* {this.props.productsInventory.filter((x)=>x.code ===(this.state.code)).length===0 && <p className={classes.invalid2}>מוצר לא קיים ברשימת המלאי</p>} */}
              </div>
           
            </div>
           
          </div>
        </div>
    
 
        <div>
  
        </div>
      

        {this.validateFormBtn(
          this.state.code,
          this.state.endDate,
          this.state.count
        )}
      </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productsInventory:state.productsInventory,
    modal:state.modal,
    movements_Inventory: state.movements_Inventory,
    products:state.products,
    Basket:state.Basket
  };
};

export default connect(mapStateToProps, {
  addMovements,
  toggleModal,
  addProductsInventory1,
  updateRowInventory1,
  updateRowBasket1
})(AddMovements);
