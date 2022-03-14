import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProduct,updateRowBasket,getInventory,updateRowP,getProducts} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io"
import DeleteProductButton from "../components/UIElements/DeleteProductButton";
import { getIndexByName, getIndexByNameInventory, getIndexByNameProductsBasket,getIndexByNameProducts } from "../helper-functions";
import { selectRow, updateRowInventory } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarInventory";
import Pagination from "./pagination";
import "./switch.css";
import "./row.css";

class InventoryMonitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsInventoryList: [...this.props.productsInventory],
      MasterChecked: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,
    };
  }

  componentDidMount(){
    this.props.getInventory()
    this.props.getProducts()
  }

  sortRowsnameProducts() {
    this.setState({
      productsInventoryList: this.props.productsInventory.sort((a, b) => {
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
  sortRowsCategory() {
    this.setState({
      productsInventoryList: this.props.productsInventory.sort((a, b) => {
        let nameA = a.category.toLowerCase();
        let nameB = b.category.toLowerCase();
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
      productsInventoryList: this.props.productsInventory.sort((a, b) => {
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
  sortRowsId() {
    this.setState({
      productsInventoryList: this.props.productsInventory.sort((a, b) => {
        let nameA = JSON.stringify(a.id).toLowerCase();
        let nameB = JSON.stringify(b.id).toLowerCase();
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

  sortRowsDate() {
    this.setState({
      productsInventoryList: this.props.productsInventory.sort(
        (a, b) => new Date(a.endDate).getTime() - new Date(a.endDate).getTime()
      ),
    });
  }

  sortRowsCount() {
    this.setState({
      productsInventoryList: this.props.productsInventory.sort(
        (a, b) => a.count - b.count
      ),
    });
  }
  sortRowsCost() {
    this.setState({
      productsInventoryList: this.props.productsInventory.sort(
        (a, b) => a.cost - b.cost
      ),
    });
  }
  sortRowsCountError() {
    this.setState({
      productsInventoryList: this.props.productsInventory.sort(
        (a, b) => a.countOfError - b.countOfError
      ),
    });
  }

  onItemCheck(e, item) {
    this.props.productsInventory.map((x) => {
      if (x.id === item.id) {
        x.status = e.target.checked;
        const prodIdx = getIndexByName(this.props.productsInventory, item.id);

        return this.props.productsInventory[prodIdx].status;
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.productsInventory.length;
    const totalCheckedItems = this.props.productsInventory.filter(
      (e) => e.status
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      productsInventoryList: this.props.productsInventory.filter((e) => e.status),
    });
  }
  getSelectedCode = (ChangeName) => {
    const prodIdx = getIndexByName(
      this.props.productsInventory,
      ChangeName.id,
    );
    Swal.fire({
      title: 'שינוי מק"ט מוצר',
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].code,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return 'נא הקלד מק"ט מוצר';
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].code !== result.value
      ) this.props.updateRowInventory({
        id: this.props.productsInventory[prodIdx].id,
        code:result.value,
        nameProducts: this.props.productsInventory[prodIdx].nameProducts,
        size: this.props.productsInventory[prodIdx].size,
        type: this.props.productsInventory[prodIdx].type,
        count: this.props.productsInventory[prodIdx].count,
        endDate: this.props.productsInventory[prodIdx].endDate,
        manufacture: this.props.productsInventory[prodIdx].manufacture,
    
      });
    });
  };

  getSelectedManufacture = (ChangeName) => {
    const prodIdx = getIndexByName(
      this.props.productsInventory,
      ChangeName.id,
    );
    Swal.fire({
      title: "שינוי יצרן מוצר",
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].manufacture,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "נא הקלד יצרן מוצר";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].manufacture !== result.value
      ) this.props.updateRowInventory({
        id: this.props.productsInventory[prodIdx].id,
        code:this.props.productsInventory[prodIdx].code,
        nameProducts: this.props.productsInventory[prodIdx].nameProducts,
        size: this.props.productsInventory[prodIdx].size,
        type: this.props.productsInventory[prodIdx].type,
        count: this.props.productsInventory[prodIdx].count,
        endDate: this.props.productsInventory[prodIdx].endDate,
        manufacture: result.value,
    
      });
    });
  };

  getSelectedDate = (ChangeDate) => {
    const prodIdx = getIndexByName(this.props.productsInventory, ChangeDate.id);
    Swal.fire({
      title: "נא עדכן תאריך תפוגה",
      html:'<input type="date" id="swal-input" class="swal2-input">',
      focusConfirm: false,
      allowOutsideClick: false,
      confirmButtonText: "אישור",
      confirmButtonColor: "green", 
    }).then((result) => {
      if (
        result.value &&
        new Date().valueOf() <= new Date(document.getElementById('swal-input').value).valueOf()
      ) {
        this.props.updateRowInventory({
          id: this.props.productsInventory[prodIdx].id,
          code:this.props.productsInventory[prodIdx].code,
          nameProducts: this.props.productsInventory[prodIdx].nameProducts,
          size: this.props.productsInventory[prodIdx].size,
          type:  this.props.productsInventory[prodIdx].type,
          count: this.props.productsInventory[prodIdx].count,
          endDate:document.getElementById('swal-input').value,
          manufacture: this.props.productsInventory[prodIdx].manufacture,
      
        });
        
      }else{
        Swal.fire({
            icon: "error",
            title: "התאריך שניסית לעדכן עבר",
            confirmButtonText: "אישור",
            confirmButtonColor: "red",
          })
      }
    });
  };




  getSelectedType = (ChangeName) => {
    selectRow(ChangeName.id);
    const prodIdx = getIndexByName(
      this.props.productsInventory,
      ChangeName.id,
    );
    Swal.fire({
      title: "שינוי סוג מוצר",
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].type,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "נא הקלד סוג מוצר";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].type !== result.value
      ) this.props.updateRowInventory({
        id: this.props.productsInventory[prodIdx].id,
        code:this.props.productsInventory[prodIdx].code,
        nameProducts: this.props.productsInventory[prodIdx].nameProducts,
        size: this.props.productsInventory[prodIdx].size,
        type: result.value,
        count: this.props.productsInventory[prodIdx].count,
        endDate: this.props.productsInventory[prodIdx].endDate,
        manufacture: this.props.productsInventory[prodIdx].manufacture,
    
      });
    });
  };

  getSelectedName = (ChangeName) => {
    selectRow(ChangeName.id);
    const prodIdx = getIndexByName(
      this.props.productsInventory,
      ChangeName.id,
    );
    Swal.fire({
      title: "שינוי שם מוצר",
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].nameProducts,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "נא הקלד שם מוצר";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].nameProducts !== result.value
      ) this.props.updateRowInventory({
        id: this.props.productsInventory[prodIdx].id,
        code:this.props.productsInventory[prodIdx].code,
        nameProducts: result.value,
        size: this.props.productsInventory[prodIdx].size,
        type: this.props.productsInventory[prodIdx].type,
        count: this.props.productsInventory[prodIdx].count,
        endDate: this.props.productsInventory[prodIdx].endDate,
        manufacture: this.props.productsInventory[prodIdx].manufacture,
    
      });
    });
  };
  getSelectedCategory = (Change) => {
    selectRow(Change.id);
    const prodIdx = getIndexByNameInventory(
      this.props.productsInventory,
      Change.id,
      Change.endDate
    );
    Swal.fire({
      title: `שנה  קטגוריה `,
      input: "select",
      inputOptions: {
        טואלט: "טואלט",
        פירות: "פירות",
        ירקות: "ירקות",
        אחר: "אחר",
      },
      inputPlaceholder: "בחר קטגוריה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.productsInventory[prodIdx].category,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "בחר קטגוריה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].category !== result.value
      ) {
      }
      this.props.updateRowInventory({
        id: this.props.productsInventory[prodIdx].id,
        nameProducts: this.props.productsInventory[prodIdx].nameProducts,
        size: this.props.productsInventory[prodIdx].size,
        category: result.value,
        count: this.props.productsInventory[prodIdx].count,
        endDate: this.props.productsInventory[prodIdx].endDate,
        countOfError: this.props.productsInventory[prodIdx].countOfError,
    
      });
    });
  };
  getSelectedSize = (ChangeName) => {
    selectRow(ChangeName.id);
    const prodIdx = getIndexByNameInventory(
      this.props.productsInventory,
      ChangeName.id,
      ChangeName.endDate
    );
    Swal.fire({
      title: "שינוי יחידות מידה ",
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].size,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "נא הקלד יחידות מידה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].size !== result.value
      ) {
      }
      this.props.updateRowInventory({
        id: this.props.productsInventory[prodIdx].id,
        code:this.props.productsInventory[prodIdx].code,
        nameProducts: this.props.productsInventory[prodIdx].nameProducts,
        size: result.value,
        type: this.props.productsInventory[prodIdx].type,
        count: this.props.productsInventory[prodIdx].count,
        endDate: this.props.productsInventory[prodIdx].endDate,
        manufacture: this.props.productsInventory[prodIdx].manufacture,
    
      });
    });
  };

 
  getSelectedCount = (ChangeSize) => {
    const prodIdx = getIndexByNameProducts(this.props.products, ChangeSize);
    Swal.fire({
      title: `שנה רמת ביטחון במרכז`,
      input: "number",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.products[prodIdx].count,
      inputValidator: (value) => {
        if (value.length < 0) {
          return "חייב לציין רמת ביטחון, במידה ואין הקלד 0";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.products[prodIdx].count !== result.value
      ) {
        this.props.updateRowP({
          code: this.props.products[prodIdx].code,
         name: this.props.products[prodIdx].name,
         productNote: this.props.products[prodIdx].productNote,
         manufacture:this.props.products[prodIdx].manufacture,
         size:  this.props.products[prodIdx].size,
          type: this.props.products[prodIdx].type,
          price: this.props.products[prodIdx].price,
          count:result.value
        });
      }
    });
  };

  removeProduct = (productName) => {
    let arrayCOPY = this.state.productsInventoryList.filter(
      (x) => x.id === productName.id && x.endDate === productName.endDate
    );
    Swal.fire({
      title: "?האם ברצונך למחוק מוצר זה",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "כן",
      confirmButtonColor: "green",
      denyButtonText: `לא`,
      denyButtonColor: `red`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.deleteProduct(productName)
        console.log(this.state.productsInventoryList);
        // Swal.fire({
        //   title: "המוצר נמחק בהצלחה",
        //   icon: "success",
        //   confirmButtonText: "אישור",
        // });
      } else if (result.isDenied) {
        Swal.fire({
          title: "המוצר לא נמחק",
          icon: "info",
          confirmButtonText: "אישור",
        });
      }
    });
  };
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
basket_sum = (Id) => {
    let sum = this.props.productsInventory.filter((x)=>x.code === Id)
    let sum1=0
    for(let i=0; i<sum.length;i++){
      sum1=sum1+(parseInt(sum[i].count))
    }
  
    return sum1
  };



  rowsSearchConfig = () => {
    if (this.state.term === "" ) {
     let array = this.props.productsInventory
     let array2= this.props.products.filter((x)=> array.findIndex(arr => arr.code === x.code)>-1).sort(
      (a, b) => (b.count-this.basket_sum(b.code)) - (a.count-this.basket_sum(a.code))
     )
     
     
      return array2
      
    }
    else {
      return this.props.productsInventory.filter(
       
       (x)  => x.id.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
       -1 ||
          x.category.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.size.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.endDate.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 
      );
    }
  };
  render() {
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
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense40}>

          <div />
        </div>

        <div className={classes.tablewrapper}>
        
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                    <th className={classes.header} th scope="col">
                    מק"ט 
                  </th>
                  <th className={classes.header} th scope="col">
                    שם מוצר
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsnameProducts()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    יחידת מידה
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsSize()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    סוג
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsCategory()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    יצרן
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsCategory()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    כמות במלאי
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsCount()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                   רמת ביטחון
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    מצב
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      <td >
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
                      <td>{this.basket_sum(x.code)}</td>
                      <td onDoubleClick={() => this.getSelectedCount(x.code)}>
                        {x.count}
                      </td>
                      <td>{parseInt(x.count)>parseInt(this.basket_sum(x.code)) || x.count===""? (
                        <button
                          className="btn btn-danger"
                        >
                        </button>
                      ):parseInt(x.count)===parseInt(this.basket_sum(x.code))?  (<button
                          className="btn btn-warning"
                        >
                        </button>):  (<button
                          className="btn btn-success"
                        >
                        </button>)}</td>
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
    products:state.products
 
  };
};

export default connect(mapStateToProps, {
  selectRow,
  getProducts,
  updateRowInventory,
  deleteProduct,updateRowBasket,
  getInventory,
  updateRowP
})(InventoryMonitor);
