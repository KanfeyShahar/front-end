import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleActiveV, toggleFood, toggleHot } from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import DeleteProductButton from "../components/UIElements/DeleteProductButton";
import { getIndexByName, getIndexByNameInventory } from "../helper-functions";
import { selectRow, updateRowInventory, updatePhone } from "../actions";
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
        (a, b) => new Date(a.dateEnd).getTime() - new Date(a.dateEnd).getTime()
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
  getSelectedRows() {
    this.setState({
      productsInventoryList: this.props.productsInventory.filter((e) => e.status),
    });
  }

  getSelectedName = (ChangeName) => {
    selectRow(ChangeName.id);
    const prodIdx = getIndexByNameInventory(
      this.props.productsInventory,
      ChangeName.id,
      ChangeName.endDate
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
      ) {
        this.state.productsInventoryList[prodIdx].nameProducts = result.value;
        console.log(this.props.productsInventory[prodIdx].nameProducts);
      }
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
      this.state.productsInventoryList[prodIdx].category = result.value;
      console.log(this.props.productsInventory[prodIdx].category);
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
      this.props.productsInventory[prodIdx].size = result.value;
      console.log(this.props.productsInventory[prodIdx].size);
    });
  };
  getSelectedCost = (ChangeName) => {
    selectRow(ChangeName.id);
    const prodIdx = getIndexByNameInventory(
      this.props.productsInventory,
      ChangeName.id,
      ChangeName.endDate
    );
    Swal.fire({
      title: "שינוי עלות ליחידה  ",
      input: "number",
      inputValue: this.props.productsInventory[prodIdx].cost,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value <= 0) {
          return "נא הקלד עלות חדשה ליחידה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].cost !== result.value
      ) {
      }
      this.props.productsInventory[prodIdx].cost = result.value;
      console.log(this.props.productsInventory[prodIdx].cost);
    });
  };
  getSelectedCountOfError = (ChangeName) => {
    selectRow(ChangeName.id);
    const prodIdx = getIndexByNameInventory(
      this.props.productsInventory,
      ChangeName.id,
      ChangeName.endDate
    );
    Swal.fire({
      title: "שינוי מלאי ביטחון  ",
      input: "number",
      inputValue: this.props.productsInventory[prodIdx].count,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value <= 0) {
          return "נא הקלד מלאי ביטחון";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].countOfError !== result.value
      ) {
      }
      this.props.productsInventory[prodIdx].countOfError = result.value;
      console.log(this.props.productsInventory[prodIdx].countOfError);
    });
  };

  getSelectedCount = (ChangeName) => {
    selectRow(ChangeName.id);
    const prodIdx = getIndexByNameInventory(
      this.props.productsInventory,
      ChangeName.id,
      ChangeName.endDate
    );
    Swal.fire({
      title: "שינוי כמות ליחידה  ",
      input: "number",
      inputValue: this.props.productsInventory[prodIdx].count,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value <= 0) {
          return "נא הקלד את הכמות הכוללת בסך הכל";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.productsInventory[prodIdx].count !== result.value
      ) {
      }
      this.props.productsInventory[prodIdx].count = result.value;
      console.log(this.props.productsInventory[prodIdx].count);
    });
  };

  removeProduct = (productName) => {
    let arrayCOPY = this.state.productsInventoryList.filter(
      (x) => x.id !== productName.id || x.endDate !== productName.endDate
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
        this.setState({ productsInventoryList: arrayCOPY });
        console.log(this.state.productsInventoryList);
        Swal.fire({
          title: "המוצר נמחק בהצלחה",
          icon: "success",
          confirmButtonText: "אישור",
        });
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

  rowsSearchConfig = () => {
    if (this.state.term === "") {
      return this.props.productsInventory
    }
    else {
      return this.props.productsInventory.filter(
        (x) =>
        x.category.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.nameProducts.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.size.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.endDate.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.id.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
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
        <div className={classes1.newexpense}>
        <h1>מלאי מוצרים </h1>
      
   
          
          <div />
        </div>

        <div className={classes.tablewrapper}>
          {/* <button
            className="btn btn-outline-info"
            onClick={() => {
              this.setState({
                familyList: this.props.families.reverse(),
              });
            }}
          >
            חזרה למצב הקודם
          </button>{" "} */}
          <ActionBar
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
                      onClick={() => this.sortRowsId()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
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
                    קטגוריה
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
                    תאריך תפוגה
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    מלאי ביטחון
                  </th>
                  <th className={classes.header} th scope="col">
                    מחיקה
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td>{x.id}</td>
                      <td onDoubleClick={() => this.getSelectedName(x)}>
                        {x.nameProducts}
                      </td>
                      <td onDoubleClick={() => this.getSelectedSize(x)}>
                        {x.size}
                      </td>
                      <td onDoubleClick={() => this.getSelectedCategory(x)}>
                        {x.category}
                      </td>
                      <td onDoubleClick={() => this.getSelectedCount(x)}>
                        {x.count}
                      </td>
                      <td onDoubleClick={() => this.getSelectedDate(x)}>
                        {x.endDate}
                      </td>
                      <td>{x.countOfError}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => this.removeProduct(x)}
                        >
                          מחיקה
                        </button>
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
    activeV: state.activeV,
  };
};

export default connect(mapStateToProps, {
  selectRow,
  updateRowInventory,
  updatePhone,
  toggleActiveV,
  toggleFood,
  toggleHot,
})(InventoryProducts);
