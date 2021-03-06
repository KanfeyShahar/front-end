import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProduct,updateRowBasket,getInventory} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io"
import DeleteProductButton from "../components/UIElements/DeleteProductButton";
import { getIndexByName, getIndexByNameInventory, getIndexByNameProductsBasket } from "../helper-functions";
import { selectRow, updateRowInventory } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarInventory";
import Pagination from "./pagination";
import "./switch.css";
import "./row.css";

class InventoryProducts extends Component {
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
      title: '?????????? ????"?? ????????',
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].code,
      confirmButtonText: "??????????",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return '???? ???????? ????"?? ????????';
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
      title: "?????????? ???????? ????????",
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].manufacture,
      confirmButtonText: "??????????",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "???? ???????? ???????? ????????";
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
      title: "???? ???????? ?????????? ??????????",
      html:'<input type="date" id="swal-input" class="swal2-input">',
      focusConfirm: false,
      allowOutsideClick: false,
      confirmButtonText: "??????????",
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
            title: "???????????? ???????????? ?????????? ??????",
            confirmButtonText: "??????????",
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
      title: "?????????? ?????? ????????",
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].type,
      confirmButtonText: "??????????",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "???? ???????? ?????? ????????";
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
      title: "?????????? ???? ????????",
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].nameProducts,
      confirmButtonText: "??????????",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "???? ???????? ???? ????????";
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
      title: `??????  ?????????????? `,
      input: "select",
      inputOptions: {
        ??????????: "??????????",
        ??????????: "??????????",
        ??????????: "??????????",
        ??????: "??????",
      },
      inputPlaceholder: "?????? ??????????????",
      confirmButtonText: "??????????",
      confirmButtonColor: "green",
      inputValue: this.props.productsInventory[prodIdx].category,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "?????? ??????????????";
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
      title: "?????????? ???????????? ???????? ",
      input: "text",
      inputValue: this.props.productsInventory[prodIdx].size,
      confirmButtonText: "??????????",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "???? ???????? ???????????? ????????";
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

 

  getSelectedCount = (ChangeName) => {
    selectRow(ChangeName.id);
    const prodIdx = getIndexByName(
      this.props.productsInventory,
      ChangeName.id,
    );
 
    Swal.fire({
      title: "?????????? ???????? ????????????  ",
      input: "number",
      inputValue: this.props.productsInventory[prodIdx].count,
      confirmButtonText: "??????????",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value <= 0) {
          return "???? ???????? ???? ?????????? ???????????? ?????? ??????";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].count !== result.value
      ) {
      }
      this.props.updateRowInventory({
        id: this.props.productsInventory[prodIdx].id,
        code:this.props.productsInventory[prodIdx].code,
        nameProducts: this.props.productsInventory[prodIdx].nameProducts,
        size: this.props.productsInventory[prodIdx].size,
        type: this.props.productsInventory[prodIdx].type,
        count: result.value,
        endDate: this.props.productsInventory[prodIdx].endDate,
        manufacture: this.props.productsInventory[prodIdx].manufacture,
    
      });
      const newCount =result.value
      this.props.Basket.filter((x=>(x.startDate >new Date().toLocaleDateString('en-GB')) && !x.locked)).map((x)=>( 
        (x.id_inventory === ChangeName.id  ? 
          this.props.updateRowBasket({
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
        }):x )
       ))
     
    });
  };

  removeProduct = (productName) => {
    let arrayCOPY = this.state.productsInventoryList.filter(
      (x) => x.id === productName.id && x.endDate === productName.endDate
    );
    Swal.fire({
      title: "??????? ???????????? ?????????? ???????? ????",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "????",
      confirmButtonColor: "green",
      denyButtonText: `????`,
      denyButtonColor: `red`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.deleteProduct(productName)
        console.log(this.state.productsInventoryList);
        // Swal.fire({
        //   title: "?????????? ???????? ????????????",
        //   icon: "success",
        //   confirmButtonText: "??????????",
        // });
      } else if (result.isDenied) {
        Swal.fire({
          title: "?????????? ???? ????????",
          icon: "info",
          confirmButtonText: "??????????",
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
        ???????????? ???????????? :{this.state.term}
        <button
          className="btn btn-sm btn-info"
          onClick={() => this.setState({ term: "" })}
        >
          ?????? ??????????
        </button>
      </p>
    );
  };

  rowsSearchConfig = () => {
    if (this.state.term === "" ) {
      return this.props.productsInventory.sort(
        (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      )
      
    }
    else {
      return this.props.productsInventory.filter(
       (x)  => JSON.stringify(x.code).toLowerCase().indexOf(this.state.term.toLowerCase()) !==
       -1 ||
          x.nameProducts.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.manufacture.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.endDate.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 
      ).sort( (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
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
          <h1>?????????? ???????? ?????? ?????????? </h1>

          <div />
        </div>

        <div className={classes.tablewrapper}>
        
          <ActionBar inventory={this.props.productsInventory}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                    <th className={classes.header} th scope="col">
                    ????"?? 
                  </th>
                  <th className={classes.header} th scope="col">
                    ???? ????????
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsnameProducts()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    ?????????? ????????
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsSize()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    ??????
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsCategory()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    ????????
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsCategory()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    ???????? ??????????
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsCount()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    ?????????? ??????????
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    ??????????
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      {/* <td>{x.id}</td> */}
                      <td onDoubleClick={() => this.getSelectedCode(x)}>
                        {x.code}
                      </td>
                      <td onDoubleClick={() => this.getSelectedName(x)}>
                        {x.nameProducts}
                      </td>
                      <td onDoubleClick={() => this.getSelectedSize(x)}>
                        {x.size}
                      </td>
                      <td onDoubleClick={() => this.getSelectedType(x)}>
                        {x.type}
                      </td>
                      <td onDoubleClick={() => this.getSelectedManufacture(x)}>
                        {x.manufacture}
                      </td>
                      <td onDoubleClick={() => this.getSelectedCount(x)}>
                        {x.count}
                      </td>
                      <td onDoubleClick={() => this.getSelectedDate(x)}>
                        {new Date(x.endDate).toLocaleDateString('en-GB')}
                      </td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => this.removeProduct(x)}
                        >
                          <IoIcons.IoMdTrash/>
                          ??????????
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <button
             
                className="btn btn-primary"
                onClick={() => this.getSelectedRows()}
              >
                ???????? ????????????: {this.rowsSearchConfig().length}
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
    Basket:state.Basket
 
  };
};

export default connect(mapStateToProps, {
  selectRow,
  updateRowInventory,
  deleteProduct,updateRowBasket,
  getInventory
})(InventoryProducts);
