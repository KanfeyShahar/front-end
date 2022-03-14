import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import {
  addMovements,
  toggleModalRemove,
  updateRowInventory1,
  updateRowBasket1,
} from "../actions";
import classes1 from "./movements.module.css";
import {
  saveMovementsToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  getIndexByName,
  getIndexByNameInventory1,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";

class RemoveMovements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 0,
      id: "",
      name: "",
      center: "",
      size: "",
      type: "",
      manufacture: "",
      count: "",
      endDate: "",
      status: "",
      created_date: "",
    };
  }
  handleClick = (e) => {
    if (
      this.props.productsInventory.filter(
        (p) =>
          p.code === parseInt(this.state.code) &&
          p.endDate === this.state.endDate &&
          parseInt(p.count) >= parseInt(this.state.count)
      ).length !== 0
    ) {
      const new_movements = {
        id: 10000 * Math.random().toFixed(4),
        name: this.props.products
          .filter((y) => parseInt(this.state.code) === y.code)
          .map((x) => x.name)[0],
        code: parseInt(this.state.code),
        center: this.state.center,
        type: this.props.products
          .filter((y) => parseInt(this.state.code) === y.code)
          .map((x) => x.type)[0],
        manufacture: this.props.products
          .filter((y) => parseInt(this.state.code) === y.code)
          .map((x) => x.manufacture)[0],
        size: this.props.products
          .filter((y) => parseInt(this.state.code) === y.code)
          .map((x) => x.size)[0],
        count: this.state.count,
        endDate: this.state.endDate,
        status: "מלאי יוצא",
        created_date: new Date().toDateString(),
      };
      this.props.addMovements(new_movements);
      const prodIdx1 = getIndexByNameInventory1(
        this.props.productsInventory,
        parseInt(this.state.code),
        this.state.endDate
      );
      this.props.updateRowInventory1({
        id: this.props.productsInventory[prodIdx1].id,
        code: this.props.productsInventory[prodIdx1].code,
        nameProducts: this.props.productsInventory[prodIdx1].nameProducts,
        size: this.props.productsInventory[prodIdx1].size,
        type: this.props.productsInventory[prodIdx1].type,
        count:
          parseInt(this.props.productsInventory[prodIdx1].count) -
          parseInt(this.state.count),
        endDate: this.props.productsInventory[prodIdx1].endDate,
        manufacture: this.props.productsInventory[prodIdx1].manufacture,
      });
      const newCount =
        parseInt(this.props.productsInventory[prodIdx1].count) -
        parseInt(this.state.count);
      this.props.Basket.filter(
        (x) => x.startDate > new Date().toLocaleDateString("en-GB") && !x.locked
      ).map((x) =>
        x.code === parseInt(this.state.code)
          ? this.props.updateRowBasket1({
              startDate: x.startDate,
              id: x.id,
              id_inventory: x.id_inventory,
              code: x.code,
              nameProducts: x.nameProducts,
              size: x.size,
              type: x.type,
              count: newCount,
              manufacture: x.manufacture,
              count_real1:
                parseInt(newCount) < parseInt(x.sum) ? 0 : x.count_real1,
              count_real2:
                parseInt(newCount) < parseInt(x.sum) ? 0 : x.count_real2,
              count_real5:
                parseInt(newCount) < parseInt(x.sum) ? 0 : x.count_real5,
              count_real3:
                parseInt(newCount) < parseInt(x.sum) ? 0 : x.count_real3,
              locked: false,
              count_real4:
                parseInt(newCount) < parseInt(x.sum) ? 0 : x.count_real4,
              sum: parseInt(newCount) < parseInt(x.sum) ? 0 : parseInt(x.sum),
              endDate: x.endDate,
              serialNumber:x.serialNumber
            })
          : x
      );
      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה, שים לב לכמויות שעודכנו בסל המזון באירועים פתוחים בלבד",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
      // });
      e.preventDefault();
      this.setState({
        code: 0,
        id: "",
        name: "",
        center: "",
        size: "",
        category: "",
        count: "",
        endDate: "",
        status: "",
        created_date: "",
      });
    } else {
      Swal.fire({
        icon: "warning",
        text: "המלאי לא קיים במערכת או גדול מהכמות במלאי",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
      e.preventDefault();
    }

    this.setState({
      code: 0,
      id: "",
      name: "",
      center: "",
      size: "",
      category: "",
      count: "",
      endDate: "",
      status: "",
      created_date: "",
    });
  };

  validateProduct = (id) => {
    if (id.length > 5) {
      return (
        <small>
          <label className={classes1.invalid}>לפחות 2 תווים</label>
        </small>
      );
    }
  };

  validateFormBtn = (code, endDate, count, center) => {
    if (
      parseInt(count)> 0 &&
      this.state.center.length > 0 &&
      this.props.productsInventory.filter((x)=>x.code === parseInt(this.state.code) && x.count>=parseInt(this.state.count) && x.endDate === this.state.endDate).length>0 &&
      new Date(endDate).valueOf() > new Date().valueOf()
    ) {
      return (
        <button
          id="add-product-btn"
          onClick={(e) => {
            return this.handleClick(e);
          }}
          onMouseUp={async () => {
            return this.props.toggleModalRemove();
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
    const options = [
      { value: "עברית", label: "עברית" },
      { value: "אנגלית", label: "אנגלית" },
      { value: "ערבית", label: "ערבית" },
      { value: "רוסית", label: "רוסית" },
    ];
    const options1 = [
      { value: "הדר הכרמל", label: "הדר הכרמל" },
      { value: "בית ידידיה", label: "בית ידידיה" },
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
                {this.props.productsInventory.filter((x)=>x.code === parseInt(this.state.code) && x.count>=parseInt(this.state.count) && x.endDate === this.state.endDate).length>0 && <p >כמות תקינה</p>}
                   {this.props.productsInventory.filter((x)=>x.code === parseInt(this.state.code) && x.count<parseInt(this.state.count) && x.endDate === this.state.endDate).length>0 && <p className={classes.invalid2}> כמות לא תקינה</p>}
              </div>
             
              <div className={classes.col4}>
                <labal>מרכז</labal>
                <div className="col">
                  <Select
                    id="center"
                    options={options1}
                    onChange={(e) => {
                      this.setState({ center: e.value });
                      console.log(this.state.center);
                    }}
                    placeholder="בחר מרכז"
                    isSearchable
                    autoFocus
                    value={options1.filter((x) =>
                      this.state.center.includes(x.value)
                    )}
                  />
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
                      this.setState({ code: e.target.value });
                    }}
                    value={this.state.code}
                  />
                </div>
                {this.props.productsInventory.filter((x)=>x.code === parseInt(this.state.code)).length>0 && <p>מוצר קיים ברשימת המלאי</p>}
                {this.props.productsInventory.filter((x)=>x.code === parseInt(this.state.code)).length===0 && <p className={classes.invalid2}>מוצר לא קיים ברשימת המלאי</p>}
              </div>
            </div>
          </div>

          <div class="form-group">
            <div className={classes.row100}>
              <labal> תאריך תפוגה</labal>
              <div className="col">
                <input
                  className={classes.NewExpenseInput1}
                  type="date"
                  min="2019-01-01"
                  max="2030-12-31"
                  onChange={(e) => {
                    this.setState({ endDate: e.target.value });
                  }}
                  value={this.state.endDate}
                />
                 {this.props.productsInventory.filter((x)=>x.code === parseInt(this.state.code) && x.endDate === this.state.endDate).length>0 && <p className={classes.invalid3}>תאריך תקין</p>}
                {this.props.productsInventory.filter((x)=>x.code === parseInt(this.state.code) && x.endDate === this.state.endDate).length===0 && <p className={classes.invalid1}>מוצר לא קיים בתאריך התפוגה שנבחר </p>}
               
              </div>
              
            </div>
          </div>
        </div>
        <div>
          {this.validateFormBtn(
            this.state.code,
            this.state.endDate,
            this.state.count,
            this.state.center
          )}
          {console.log( this.state.code, this.state.center, this.state.endDate,  this.state.count,)}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  saveMovementsToLocal(state.movements_Inventory);
  return {
    modalI: state.modalI,
    movements_Inventory: state.movements_Inventory,
    productsInventory: state.productsInventory,
    Basket: state.Basket,
    products: state.products,
  };
};

export default connect(mapStateToProps, {
  addMovements,
  toggleModalRemove,
  updateRowInventory1,
  updateRowBasket1,
})(RemoveMovements);
