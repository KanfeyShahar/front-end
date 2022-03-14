import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleActive, toggleFood, toggleHot } from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import flatpickr from "flatpickr";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateRow, updatePhone } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarProductList";
import Pagination from "./pagination";
import "./switch.css";
import "./row.css";
import * as GoIcons from "react-icons/go";
import MealItem from "./Meals/MealItem/MealItem";

class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GoodsList: [
        {
          idSupplier: "2056669",
          dateStart: "****",
          imageSend: "",
          totalAmount:500,
          deliveryImage: {},
          items: [
            {
              id: "m1",
              name: "במבה",
              category: "הנעלה",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a4",
              name: "נייר טואלט",
              category: "מוצרי ניגוב",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a6",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a7",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a8",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a8",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a8",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a8",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a8",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a8",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
            {
              id: "a8",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              priceActual: 100,
              endDate: "",
            },
          ],
        },
        {
          idSupplier: "20599665",
          dateStart: "****",
          imageSend: "",
          totalAmount: 500,
          items: [
            {
              id: "m2",
              name: "ביסלי",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              endDate: "",
            },
            {
              id: "a4",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              endDate: "",
            },
            {
              id: "a6",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              endDate: "",
            },
            {
              id: "a7",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              endDate: "",
            },
            {
              id: "a8",
              name: "נייר טואלט",
              category: "נעל בית",
              size: "גדולות",
              amountActual: 4,
              amountFrom: 4,
              price: 25.28,
              endDate: "",
            },
          ],
        },
      ],
      MasterChecked: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,
      expanded: "",
    };
  }

  sortRowsIdSupplier() {
    this.setState({
      GoodsList: this.state.GoodsList.sort((a, b) => {
        let nameA = a.idSupplier.toLowerCase();
        let nameB = b.idSupplier.toLowerCase();
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

  sortRowsCostAmount() {
    this.setState({
      GoodsList: this.state.GoodsList.sort(
        (a, b) => a.totalAmount - b.totalAmount
      ),
    });
  }

  sortRowsDateStart() {
    this.setState({
      GoodsList: this.state.GoodsList.sort(
        (a, b) =>
          new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()
      ),
    });
  }

  // getSelectedId = (ChangeId) => {
  //   selectRow(ChangeId.id);
  //   const prodIdx = getIndexByName(this.state.GoodsList, ChangeId.id);
  //   Swal.fire({
  //     title: "כמות בפועל"
  //     input: "text",
  //     inputValue:this.state.OrderList[prodIdx].userDate[0].terminalDate,
  //     confirmButtonText: "אישור",
  //     confirmButtonColor: "green",
  //     inputValidator: (value) => {
  //       if (value.length <= 0) {
  //         return "חייב להקליד מספר הזמנה מהספק";
  //       }
  //     },
  //   }).then((result) => {
  //     if (
  //       result.value &&
  //       this.state.OrderList[prodIdx].userDate[0].terminalDate !== result.value
  //     ) {
  //       this.state.OrderList[prodIdx].userDate[0].terminalDate= result.value
  //       console.log(this.state.OrderList[prodIdx].userDate[0].terminalDate)

  //     }
  //   });
  // };

 

  getSelectedCost = (ChangeCost, id) => {
    selectRow(ChangeCost);
    const prodIdx = getIndexByName(this.state.GoodsList, ChangeCost.idSupplier);
    const prodIdx1 = getIndexByName(this.state.GoodsList[prodIdx].items, id);
    Swal.fire({
      title: ` שינוי כמות בפועל : `,
      input: "number",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.state.GoodsList[prodIdx].items[prodIdx1].amountFrom,
      inputValidator: (value) => {
        if (value <= 0.05) {
          return "חייב להקליד כמות";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.state.GoodsList[prodIdx].items[prodIdx1].amountFrom !==
          result.value
      ) {
        this.state.GoodsList[prodIdx].items[prodIdx1].amountFrom = result.value;
        console.log(this.state.GoodsList[prodIdx].items[prodIdx1].amountFrom);
      }
    });
  };

  getSelectedDate = (ChangeDate) => {
    selectRow(ChangeDate.id);
    const prodIdx = getIndexByName(this.state.GoodsList, ChangeDate.id);
    Swal.fire({
      title: "נא רשום תאריך קבלה ",
      html:'<input type="date" id="swal-input" class="swal2-input">',
      focusConfirm: false,
      allowOutsideClick: false,
      confirmButtonText: "אישור",
      confirmButtonColor: "green", 
      
    }).then((result) => {
      if (new Date().valueOf() > new Date(document.getElementById('swal-input').value).valueOf()) {
        Swal.fire({
          icon: "warning",
          title: "התאריך עבר, הקלד תאריך חדש",
          confirmButtonText: "אישור",
          confirmButtonColor: "red",
        });
      }
      else if (
        result.value &&
        this.state.GoodsList[prodIdx].dateStart !== document.getElementById('swal-input').value
      ) {
        this.state.GoodsList[prodIdx].dateStart= document.getElementById('swal-input').value
        
        
      }
    });
  };

  getSelectedDateEnd = (ChangeDate,id) => {
    selectRow(ChangeDate.id);
    const prodIdx = getIndexByName(this.state.GoodsList, ChangeDate.id);
    const prodIdx1 = getIndexByName(this.state.GoodsList[prodIdx].items, id);
    Swal.fire({
      title: "נא רשום תאריך תפוגה ",
      html:'<input type="date" id="swal-input" class="swal2-input">',
      focusConfirm: false,
      allowOutsideClick: false,
      confirmButtonText: "אישור",
      confirmButtonColor: "green", 
      
    }).then((result) => {
      if (new Date().valueOf() > new Date(document.getElementById('swal-input').value).valueOf()) {
        Swal.fire({
          icon: "warning",
          title: "התאריך עבר, הקלד תאריך חדש",
          confirmButtonText: "אישור",
          confirmButtonColor: "red",
        });
      }
      else if (
        result.value &&
        this.state.GoodsList[prodIdx].items[prodIdx1].endDate !== document.getElementById('swal-input').value
      ) {
        this.state.GoodsList[prodIdx].items[prodIdx1].endDate= document.getElementById('swal-input').value
        
        
      }
    });
  };

  getSelectedActualAmount = (ChangeCost,id) => {
    selectRow(ChangeCost);
    const prodIdx = getIndexByName(this.state.GoodsList, ChangeCost.id);
    const prodIdx1 = getIndexByName(this.state.GoodsList[prodIdx].items, id);
    console.log(prodIdx1)
    Swal.fire({
      title: ` שינוי כמות בפועל : `,
      input: "number",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.state.GoodsList[prodIdx].items[prodIdx1].amountFrom,
      inputValidator: (value) => {
        if (value <= 0.05) {
          return "חייב להקליד כמות";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.state.GoodsList[prodIdx].items[prodIdx1].amountFrom!== result.value
      ) {
        this.state.GoodsList[prodIdx].items[prodIdx1].amountFrom=result.value
        console.log(this.state.GoodsList[prodIdx].items[prodIdx1].amountFrom)
      }
    });
  };

  getSelectedImage = async (ChangeCost) => {
    const prodIdx = getIndexByName(this.state.GoodsList, ChangeCost.idSupplier);
    const { value: file } = await Swal.fire({
      title: "העלה לכאן קובץ סריקה ",
      input: "file",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    // console.log(file)
    // this.state.GoodsList[prodIdx].deliveryImage=await file;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "הקובץ עלה בהצלחה לאתר",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
          confirmButtonText: "אישור",
          confirmButtonColor: "green",
        });
      };
      reader.readAsDataURL(file);
    }
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
      return this.state.GoodsList;
    } else {
      return this.state.GoodsList.filter(
        (x) =>
          x.idSupplier.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.dateStart.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 
      );
    }
  };

  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.state.GoodsList.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense}>
          <h1>קבלת סחורה</h1>

          <div />
        </div>

        <div className={classes.tablewrapper}>
          {/* <button
            className="btn btn-outline-info"
            onClick={() => {
              this.setState({
                 OrderList: this.props.families.reverse(),
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
                  <th>
                    {" "}
                    <button className={classes.button}>
                      <GoIcons.GoPlus />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    מספר הזמנה מהספק
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsIdSupplier()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך קבלה
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsDateA()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    העלאת תעודת משלוח
                  </th>
                  <th className={classes.header} th scope="col">
                    הצגת תעודת משלוח
                  </th>
                  <th className={classes.header} th scope="col">
                    עלות כוללת
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsCostAmount()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr key={x.idSupplier}>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td>
                        <button
                          className={classes.button}
                          onClick={() => {
                            if (this.state.expanded === "") {
                              this.setState({ expanded: x.idSupplier });
                            } else if (this.state.expanded === x.idSupplier) {
                              this.setState({
                                expanded: "",
                              });
                            } else {
                              this.setState({
                                expanded: x.idSupplier,
                              });
                            }
                          }}
                        >
                          <GoIcons.GoPlus />
                        </button>
                      </td>
                      <td>
                        {x.idSupplier}
                        {this.state.expanded === x.idSupplier && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  מק"ט
                                </th>
                                <th className={classes.header1} th scope="col">
                                  שם מוצר
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr key={y.id}>
                                    <td>{y.id}</td>
                                    <td>{y.name}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>{" "}
                          </div>
                        )}
                      </td>
                      <td onDoubleClick={()=> this.getSelectedDate(x)}>
                        {x.dateStart}
                        {this.state.expanded === x.idSupplier && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  קטגוריה
                                </th>
                                <th className={classes.header1} th scope="col">
                                  יחידת מידה
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr key={y.id}>
                                    <td>{y.category}</td>
                                    <td>{y.size}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>{" "}
                          </div>
                        )}
                      </td>
                      <td >
                        <button className={classes.button} onClick={() => this.getSelectedImage(x)}>
                          <AiIcons.AiOutlineCloudUpload />
                        </button>
                        {x.imageSend}
                        {this.state.expanded === x.idSupplier && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  כמות שהוזמנה
                                </th>
                                <th className={classes.header1} th scope="col">
                                  כמות בפועל{" "}
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr key={y.id}>
                                    <td>{y.amountActual}</td>
                                    <td onDoubleClick={()=>this.getSelectedActualAmount(x,y.id)}>{y.amountFrom}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        <br />
                      </td>
                      <td>
                        <button className={classes.button}>
                          <AiIcons.AiFillPicture />
                        </button>
                        {this.state.expanded === x.idSupplier && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  מחיר ליחידה
                                </th>
                                <th className={classes.header1} th scope="col">
                                  תאריך תפוגה{" "}
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr key={y.id}>
                                    <td>₪{y.price}</td>
                                    <td onDoubleClick={()=>this.getSelectedDateEnd(x,y.id)}>{y.endDate}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                      <td>₪{x.totalAmount}</td>
                    </tr>
                  ))}
              </tbody>
              <button
                className="btn btn-primary"
                onClick={() => this.getSelectedRows()}
              >
                מספר הזמנות: {this.rowsSearchConfig().length}
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
    active: state.active,
    activeFood: state.activeFood,
    activeHot: state.activeHot,
  };
};

export default connect(mapStateToProps, {
  selectRow,
  updateRow,
  updatePhone,
  toggleActive,
  toggleFood,
  toggleHot,
})(Goods);
