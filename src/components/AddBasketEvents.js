import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addEvent, toggleModal, updateRow, addFamilyEvent,updateRowListBasketProduct,addBasket} from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import ActionBar from "./ActionBarProductList";
import {
  saveEventsToLocal,
  getIndexByName,
  isValidName,
  isValidNumber,
  isValidPhone,
  getIndexByNameProductsBasket,getIndexByNameListProduct
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";
import classes1 from "./header.module.css";
import Pagination from "../pages/pagination";

class AddBasket extends Component {
  constructor(props) {
    super(props);
    this.state = {
     productChoose: [...this.props.productsInventory],
      MasterChecked: false,
      MasterCheckedSelect: false,
      selected: false,
      term: "",
      currentPage: 1,
      postsPerPage: 10,
      amount:false
    };
  }

  

  handleClick = (e) => {
    var array =this.props.Basket.filter((x)=>x.startDate===this.props.selectedDate).map(z=>z.serialNumber)
    var max=0;
    for(let i=0; i<this.props.Basket.filter((x)=>x.startDate===this.props.selectedDate).length;i++){
      if(array[i]>max){
        max=array[i]
      }
    }
    var Length = max+1
    if(this.state.amount===false){this.props.productsInventory
      .filter((x) => x.selectd )
      .map ( (x) => 
       this.props.addBasket({
        startDate: this.props.selectedDate,
        id: parseInt(10000*Math.random().toFixed(4)),
        serialNumber:Length++,
          id_inventory:x.id,
          code:x.code,
          nameProducts:x.nameProducts,
          size: x.size,
          type: x.type,
          count:x.count,
          manufacture:x.manufacture,
          count_real1: 0,
          count_real2: 0,
          count_real3: 0,
          count_real4:  0,
          count_real5: 0,
          sum:0,
          locked:false,
          endDate:x.endDate,
        },this.props.productsInventory.map((x)=>x.selectd =false))
      );
      // Swal.fire({
      //   icon: "error",
      //   title: "חלה שגיאה, חזור שנית על פעולה זו",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "red",
      // });
     
   
    e.preventDefault();}
     
  };

  onMasterCheckSelect(e) {
    const check = this.props.Basket.filter((y)=>y.startDate === this.props.date )
    // Check/ UnCheck All Items
    this.props.productsInventory.map((x) => (x.selectd = e.target.checked && getIndexByNameProductsBasket(check, x.id)===-1 ));
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      productChoose: this.props.productsInventory.filter(
        (e) => e.selectd
      ),
    });
  }
  onItemCheckSelect(e, item) {
    this.props.productsInventory.map((x) => {
      if (x.id === item.id ) {
        x.selectd = e.target.checked;
        const prodIdx = getIndexByName(this.props.productsInventory, item.id);
        // this.props.updateRow({
        //   select: this.props.families[prodIdx].select,
        // });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.productsInventory.length;
    const totalCheckedItems = this.props.productsInventory.filter(
      (e) => e.selectd
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

     productChoose: this.props.productsInventory.filter((e) => e.selectd),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      productChoose: this.props.productsInventory.filter((e) => e.selectd),
    });
  }

  
  sortRowDate() {
    this.setState({
      productChoose: this.props.productsInventory.sort(
        (a, b) =>
          new Date(b.endDate).getTime() -
          new Date(a.endDate).getTime()
      ),
    });
  }

  showSearchTerm = () => {
    if (this.state.term === "") {
      return;
    }
    return (
      <p>
        תוצאות החיפוש :{this.state.term}
        <button
          className="btn btn-sm btn-info"
          onClick={() => this.setState({ term: "" })}
        >
          מחק חיפוש
        </button>
      </p>
    );
  };
  
  


  validateFormBtn = () => {
    if (this.props.productsInventory.filter((e) => e.selectd).length > 0) {
      return (
        <button
          id="add-product-btn"
          onClick={ (e) => {
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

 

  render() {

    const rowsSearchConfig = () => {
     
      const check = this.props.Basket.filter((y)=>y.startDate === this.props.date )
      if (this.state.term === "" ) {
        return this.props.productsInventory.filter((x)=> getIndexByNameProductsBasket(check, x.id)===-1 ).sort((a,b)=>  new Date(a.endDate).getTime() -
        new Date(b.endDate).getTime())
      } 
      else{
        return this.props.productsInventory.filter((x)=>
        getIndexByNameProductsBasket(check, x.id)===-1  && (
          x.nameProducts.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.type.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.manufacture.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||x.endDate.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          JSON.stringify(x.code).toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 )
      ).sort((a,b)=>  new Date(a.endDate).getTime() -
      new Date(b.endDate).getTime())
      }
    };
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.props.productsInventory.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });
    return (
      <form>
        <div className={classes.direction}>
          <div className={classes1.tablewrapper}  >
          <div className={classes.search}>
          <input
                id="term"
                type="text"
                className="form-control"
                placeholder="חיפוש"
                onChange={(e) => {
                  this.setState({ term: e.target.value });
                }}
              />
              </div>
            {this.showSearchTerm()}
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes1.header} th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheckSelect(e)}
                    />
                  </th>
                  
                  <th className={classes1.header} th scope="col">
                   שם מוצר
                  </th>
                  <th className={classes1.header} th scope="col">
                    יחידת מידה
                  </th>
                  <th className={classes1.header} th scope="col">
                    סוג
                  </th>
                  <th className={classes1.header} th scope="col">
                   יצרן
                  </th>
                  <th className={classes1.header} th scope="col">
                   כמות במלאי
                  </th>
                  <th className={classes1.header} th scope="col">
                   תאריך תפוגה
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td>
                      <input key={x.sselectd}
                          type="checkbox"
                          checked={x.selectd}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheckSelect(e, x)}
                        />
                      </td>
                      <td >
                        {x.nameProducts}
                      </td>
                      <td >
                        {x.size}
                      </td>
                      <td >
                        {x.type}
                      </td>
                      <td >
                        {x.manufacture}
                      </td>
                      <td >
                        {x.count}
                      </td>
                      <td>{new Date(x.endDate).toLocaleDateString("en-GB")}</td>
                    </tr>
                  ))}
                
              </tbody>
            </table>
          
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={rowsSearchConfig().length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
          {this.validateFormBtn()}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    families: state.families,
    Basket:state.Basket,
    toggleActiveDateFood:state.toggleActiveDateFood,
    selectedDate: state.selectedDate,
    productsInventory:state.productsInventory
  };
};

export default connect(mapStateToProps, {
  updateRowListBasketProduct,
  addBasket,
  addEvent,
  toggleModal,
  updateRow,
 addFamilyEvent,
 
})(AddBasket);
