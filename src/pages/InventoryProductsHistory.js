import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProduct,updateRowBasket,getInventory,getProducts} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io"
import DeleteProductButton from "../components/UIElements/DeleteProductButton";
import { getIndexByName, getIndexByNameInventory, getIndexByNameProductsBasket } from "../helper-functions";
import { selectRow, updateRowInventory,getMovements } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarInventoryHistory";
import Pagination from "./pagination";
import "./switch.css";
import "./row.css";

class InventoryProductsHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsInventoryList:[...this.props.products],
      MasterChecked: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,
      selected:new Date(),
      first:new Date()
    };
  }

  componentDidMount(){
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if(storedData&&storedData.token){
      this.props.getMovements(storedData.token);
      this.props.getInventory(storedData.token)
      this.props.getProducts(storedData.token)
    }
    
  }

  sortRowsnameProducts() {
    this.setState({
      productsInventoryList: this.state.productsInventoryList.sort((a, b) => {
        let nameA = a.nameProducts.toLowerCase();
        let nameB = b.nameProducts.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }
  sortRowsName() {
    this.setState({
      productsInventoryList: this.state.productsInventoryList.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }
  sortRowsSize() {
    this.setState({
      productsInventoryList: this.state.productsInventoryList.sort((a, b) => {
        let nameA = a.size.toLowerCase();
        let nameB = b.size.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }
  sortRowsCode() {
    this.setState({
      productsInventoryList: this.state.productsInventoryList.sort((a, b) => {
        let nameA = JSON.stringify(a.code).toLowerCase();
        let nameB = JSON.stringify(b.code).toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    });
  }



  sortRowsCount() {
    this.setState({
      productsInventoryList: this.state.productsInventoryList.sort(
        (a, b) => a.price - b.price
      ),
    });
  }

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      productsInventoryList: this.props.productsInventory.filter((e) => e.status),
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

  rowsSearchConfig = () => {
    if (this.state.term === "" ) {
      this.state.productsInventoryList.map((y)=>y.price=0)
      this.props.movements_Inventory.filter((x)=>new Date(x.created_date)<=new Date(this.state.first) && new Date(x.created_date)>=new Date(this.state.selected)).map((z)=>
      this.state.productsInventoryList.map((y)=> (y.code ===z.code) && z.status.includes("מלאי יוצא") ?  y.price=parseInt(y.price)-parseInt(z.count) :y.code === z.code && z.status.includes("מלאי נכנס")?y.price=y.price+z.count:"" )
      
      )

    
      return this.state.productsInventoryList.filter((x)=>x.price >0 )
    }
    else {
      return this.state.productsInventoryList.filter(
       (x)  =>
       x.price>0 &&(
        JSON.stringify(x.code).toLowerCase().indexOf(this.state.term.toLowerCase()) !==
        -1 ||
           x.name.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
             -1 ||
           x.size.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
           x.type.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
             -1 
       ) 
      );
    }
  };
  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.rowsSearchConfig().slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense40}>
          <h1>דוח מלאי </h1>
         
          <input
            className={classes.NewExpenseInput1}
            type='date'
            min='2019-01-01'
            max='2030-12-31'
            onChange={(e) => {
              this.setState({ selected: e.target.value });
            }}
            value={this.state.selected }
            
            
          />
           תאריך התחלה
          <div className={classes.row101}>
          <input
            className={classes.NewExpenseInput1}
            type='date'
            min='2019-01-01'
            max='2030-12-31'
            onChange={(e) => {
              this.setState({ first: e.target.value });
            }}
            value={this.state.first }
            
            
          />
            תאריך סיום
          </div>
        
          <div />
        </div>

        <div className={classes.tablewrapper}>
        
          <ActionBar inventory={this.rowsSearchConfig()} first={this.state.selected} end={this.state.first}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                    <th className={classes.header} th scope="col">
                    מק"ט 
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsCode()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    שם מוצר
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsname()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    יחידת מידה
                  </th>
                  <th className={classes.header} th scope="col">
                    סוג
                  </th>
                  <th className={classes.header} th scope="col">
                    יצרן
                  </th>
                  <th className={classes.header} th scope="col">
                    כמות במלאי
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      <td>
                        {x.code}
                      </td>
                      <td >
                        {x.name}
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
                        {x.price}
                      </td>
                
                    </tr>
                  ))}
              </tbody>
              <button
             
                className="btn btn-primary"
                onClick={() => this.getSelectedRows()}
              >
                מספר מוצרים: {this.rowsSearchConfig().length}
              </button>
            </table>

            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={this.rowsSearchConfig().length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productsInventory: state.productsInventory,
    events:state.events,
    Basket:state.Basket,
    movements_Inventory:state.movements_Inventory,
    products:state.products
 
  };
};

export default connect(mapStateToProps, {
  selectRow,
  updateRowInventory,
  deleteProduct,updateRowBasket,
  getMovements,
  getInventory,
  getProducts
})(InventoryProductsHistory);
