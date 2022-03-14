import React, { Component } from "react";
import { connect } from "react-redux";
import {
  toggleActive,
  toggleFood,
  toggleHot,
  updateRowOrderMain,
  updateRowOrderUnder,
  updateRowItems,
  getOrders,
} from "../actions";
import * as FaIcons from "react-icons/fa";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import * as GoIcons from "react-icons/go";
import { selectRow, updateRow, updatePhone } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header1.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarProductList";
import Pagination from "./pagination";
import "./switch.css";
import "./row.css";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderList: [...this.props.orders],
      MasterChecked: false,
      MasterCheckedFood: false,
      MasterCheckedHot: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,
      expanded: "",

      // columnHeaders: [
      //   {
      //     name: "שם ראש משפחה",
      //   },
      //   {
      //     name: "שם משפחה",
      //   },
      //   {
      //     name: "טלפון",
      //   },
      //   {
      //     name: "עיר",
      //   },
      //   {
      //     name: "רחוב",
      //   },
      //   {
      //     name: "מספר בניין",
      //   },
      //   {
      //     name: "נפשות",
      //   },
      //   {
      //     name: "תאריך הוספה",
      //   },
      //   {
      //     name: " מצב",
      //   },
      // ],
    };
  }

  componentDidMount() {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if(storedData&&storedData.token){
      this.props.getOrders(storedData.token);
    }
    
  }

  sortRows() {
    this.setState({
      familyList: this.props.families.sort((a, b) => {
        let nameA = a.firstName.toLowerCase();
        let nameB = b.firstName.toLowerCase();
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
  sortRowsLast() {
    this.setState({
      familyList: this.props.families.sort((a, b) => {
        let nameA = a.lastName.toLowerCase();
        let nameB = b.lastName.toLowerCase();
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
  sortRowsCity() {
    this.setState({
      familyList: this.props.families.sort((a, b) => {
        let nameA = a.city.toLowerCase();
        let nameB = b.city.toLowerCase();
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
  sortRowsAddress() {
    this.setState({
      familyList: this.props.families.sort((a, b) => {
        let nameA = a.address.toLowerCase();
        let nameB = b.address.toLowerCase();
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
  sortRowNumber() {
    this.setState({
      familyList: this.props.families.sort(
        (a, b) => a.numberOfPerson - b.numberOfPerson
      ),
    });
  }

  sortRowDate() {
    this.setState({
      familyList: this.props.orders.sort(
        (a, b) =>
          new Date(b.userDate.endDateActual).getTime() -
          new Date(a.userDate.endDateActual).getTime()
      ),
    });
  }

  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.families.map((x) => (x.hot = e.target.checked));
    //Update State
    this.setState({
      MasterCheckedHot: e.target.checked,
      familyList: this.props.families.filter((e) => e.hot),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheckStatus(e, item) {
    this.props.orders.map((x) => {
      if (x.id === item.id) {
        Swal.fire({
          title: " האם אתה בטוח על פעולתך, לא תוכל לחזור שנית על הפעולה",
          icon: "warning",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "כן",
          confirmButtonColor: "green",
          denyButtonText: `לא`,
          denyButtonColor: `red`,
        }).then((result) => {
          if (result.isConfirmed) {
            x.userDate.status = true;
            const prodIdx = getIndexByName(this.props.orders, item.id);
            this.props.updateRowOrderUnder({
              id: this.props.orders[prodIdx].id,
              totalAmount: this.props.orders[prodIdx].totalAmount,
              items: this.props.orders[prodIdx].items,
              locked: this.props.orders[prodIdx].locked,
              userDate: {
                id: this.props.orders[prodIdx].userDate.id,
                name: this.props.orders[prodIdx].userDate.name,
                center: this.props.orders[prodIdx].userDate.center,
                endDate: this.props.orders[prodIdx].userDate.endDate,
                date: this.props.orders[prodIdx].userDate.date,
                supplier: this.props.orders[prodIdx].userDate.supplier,
                status: true,
                desciption: this.props.orders[prodIdx].userDate.desciption,
                endDateActual:
                  this.props.orders[prodIdx].userDate.endDateActual,
              },
            });
            Swal.fire({
              title: "מאושר",
              icon: "success",
              confirmButtonText: "אישור",
            });
          } else if (result.isDenied) {
            Swal.fire({
              title: "לא אושר",
              icon: "info",
              confirmButtonText: "אישור",
            });
          }
        });
      } else {
        return x;
      }
    });
  }

  onItemCheckSupplier(e, item) {
    this.props.orders.map((x) => {
      if (x.id === item.id) {
        Swal.fire({
          title: " האם אתה בטוח על פעולתך, לא תוכל לחזור שנית על הפעולה",
          icon: "warning",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "כן",
          confirmButtonColor: "green",
          denyButtonText: `לא`,
          denyButtonColor: `red`,
        }).then((result) => {
          if (result.isConfirmed) {
            x.userDate.supplier = true;
            const prodIdx = getIndexByName(this.props.orders, item.id);
            this.props.updateRowOrderUnder({
              id: this.props.orders[prodIdx].id,
              totalAmount: this.props.orders[prodIdx].totalAmount,
              items: this.props.orders[prodIdx].items,
              locked: this.props.orders[prodIdx].locked,
              userDate: {
                id: this.props.orders[prodIdx].userDate.id,
                name: this.props.orders[prodIdx].userDate.name,
                center: this.props.orders[prodIdx].userDate.center,
                endDate: this.props.orders[prodIdx].userDate.endDate,
                date: this.props.orders[prodIdx].userDate.date,
                supplier: true,
                desciption: this.props.orders[prodIdx].userDate.desciption,
                status: true,
                endDateActual:
                  this.props.orders[prodIdx].userDate.endDateActual,
              },
            });
            Swal.fire({
              title: "מאושר",
              icon: "success",
              confirmButtonText: "אישור",
            });
          } else if (result.isDenied) {
            Swal.fire({
              title: "לא אושר",
              icon: "info",
              confirmButtonText: "אישור",
            });
          }
        });
      } else {
        return x;
      }
    });
  }

  getSelectedDateOn = (ChangeDate) => {
    if (!ChangeDate.locked) {
      const prodIdx = getIndexByName(this.props.orders, ChangeDate.id);
      this.props.orders.map((x) => {
        if (x.id === ChangeDate.id)
          Swal.fire({
            title: "נא רשום תאריך קבלה ",
            html: '<input type="date" id="swal-input" class="swal2-input">',
            focusConfirm: false,
            allowOutsideClick: false,
            confirmButtonText: "אישור",
            confirmButtonColor: "green",
          }).then((result) => {
            if (
              new Date().valueOf() >
              new Date(document.getElementById("swal-input").value).valueOf()
            ) {
              Swal.fire({
                icon: "warning",
                title: "התאריך עבר, הקלד תאריך חדש",
                confirmButtonText: "אישור",
                confirmButtonColor: "red",
              });
            } else if (
              result.value &&
              this.props.orders[prodIdx].userDate.endDateActual !==
                document.getElementById("swal-input").value
            ) {
              this.props.updateRowOrderUnder({
                id: this.props.orders[prodIdx].id,
                totalAmount: this.props.orders[prodIdx].totalAmount,
                items: this.props.orders[prodIdx].items,
                locked: this.props.orders[prodIdx].locked,
                userDate: {
                  id: this.props.orders[prodIdx].userDate.id,
                  name: this.props.orders[prodIdx].userDate.name,
                  center: this.props.orders[prodIdx].userDate.center,
                  endDate: this.props.orders[prodIdx].userDate.endDate,
                  date: this.props.orders[prodIdx].userDate.date,
                  supplier: this.props.orders[prodIdx].userDate.supplier,
                  desciption: this.props.orders[prodIdx].userDate.desciption,
                  status: this.props.orders[prodIdx].userDate.status,
                  endDateActual: new Date(
                    document.getElementById("swal-input").value
                  ).valueOf(),
                },
              });
            }
            console.log(this.props.orders);
          });
      });
    }
  };

  getSelectedRemark = (ChangeRemark) => {
    const prodIdx = getIndexByName(this.props.orders, ChangeRemark.id);
    this.props.orders.map((x) => {
      if (x.id === ChangeRemark.id) {
        Swal.fire({
          title: "הוסף הערות",
          input: "text",
          inputValue: this.props.orders[prodIdx].desciption,
          confirmButtonText: "אישור",
          confirmButtonColor: "green",
        }).then((result) => {
          if (result.value) {
            this.props.updateRowOrderUnder({
              id: this.props.orders[prodIdx].id,
              totalAmount: this.props.orders[prodIdx].totalAmount,
              items: this.props.orders[prodIdx].items,
              locked: this.props.orders[prodIdx].locked,
              userDate: {
                id: this.props.orders[prodIdx].userDate.id,
                name: this.props.orders[prodIdx].userDate.name,
                center: this.props.orders[prodIdx].userDate.center,
                endDate: this.props.orders[prodIdx].userDate.endDate,
                date: this.props.orders[prodIdx].userDate.date,
                supplier: this.props.orders[prodIdx].userDate.supplier,
                desciption: result.value,
                status: this.props.orders[prodIdx].userDate.status,
                endDateActual:
                  this.props.orders[prodIdx].userDate.endDateActual,
              },
            });
          }
        });
      }
    });
  };

  getSelectedPrice = (ChangeCount, Data) => {
    const prodIdx = getIndexByName(this.props.orders, ChangeCount.id);
    const prodIdx1 = getIndexByName(this.props.orders[prodIdx].items, Data.id);
    this.props.orders.map((x) => {
      if (x.id === ChangeCount.id && x.items[prodIdx1].id === Data.id) {
        Swal.fire({
          title: "שנה מחיר ליח'",
          input: "text",
          inputValue: this.props.orders[prodIdx].items[prodIdx1].price,
          confirmButtonText: "אישור",
          confirmButtonColor: "green",
          inputValidator: (value) => {
            if (value <= 0.05) {
              return "חייב להקליד מחיר, במידה ואין הקלד 0";
            }
          },
        }).then((result) => {

          let new_items_list = this.props.orders[prodIdx].items.filter((f)=> f.id!==this.props.orders[prodIdx].items[prodIdx1].id)

          if (result.value) {
            this.props.updateRowOrderUnder({
              id: this.props.orders[prodIdx].id,
              totalAmount:
                parseFloat(this.props.orders[prodIdx].totalAmount) -
                parseFloat(
                  this.props.orders[prodIdx].items[prodIdx1].priceActual
                ) +
                parseFloat(this.props.orders[prodIdx].items[prodIdx1].amountActual) *
                  parseFloat(result.value),
              userDate: this.props.orders[prodIdx].userDate,
              locked: this.props.orders[prodIdx].locked,
              items: [
                {
                id: this.props.orders[prodIdx].items[prodIdx1].id,
                amount: this.props.orders[prodIdx].items[prodIdx1].amount,
                manufacture:
                  this.props.orders[prodIdx].items[prodIdx1].manufacture,
                name: this.props.orders[prodIdx].items[prodIdx1].name,
                amountActual: this.props.orders[prodIdx].items[prodIdx1].amountActual,
                priceActual:
                  parseFloat(this.props.orders[prodIdx].items[prodIdx1].amountActual) *
                  parseFloat(result.value),
                size: this.props.orders[prodIdx].items[prodIdx1].size,
                type: this.props.orders[prodIdx].items[prodIdx1].type,
                price: result.value,
              },
              ...new_items_list],
            });
            //x.items[prodIdx1].amountActual=result.value
            //console.log(this.props.orders)
          }
        });
      }
    });
  };



  getSelectedCount = (ChangeCount, Data) => {
    const prodIdx = getIndexByName(this.props.orders, ChangeCount.id);
    const prodIdx1 = getIndexByName(this.props.orders[prodIdx].items, Data.id);
    this.props.orders.map((x) => {
      if (x.id === ChangeCount.id && x.items[prodIdx1].id === Data.id) {
        Swal.fire({
          title: "שנה את הכמות בפועל",
          input: "text",
          inputValue: this.props.orders[prodIdx].items[prodIdx1].amountActual,
          confirmButtonText: "אישור",
          confirmButtonColor: "green",
          inputValidator: (value) => {
            if (value <= 0.05) {
              return "חייב להקליד כמות, במידה ואין הקלד 0";
            }
          },
        }).then((result) => {

          let new_items_list = this.props.orders[prodIdx].items.filter((f)=> f.id!==this.props.orders[prodIdx].items[prodIdx1].id)

          if (result.value) {
            this.props.updateRowOrderUnder({
              id: this.props.orders[prodIdx].id,
              totalAmount:
                parseFloat(this.props.orders[prodIdx].totalAmount) -
                parseFloat(
                  this.props.orders[prodIdx].items[prodIdx1].priceActual
                ) +
                parseFloat(this.props.orders[prodIdx].items[prodIdx1].price) *
                  parseFloat(result.value),
              userDate: this.props.orders[prodIdx].userDate,
              locked: this.props.orders[prodIdx].locked,
              items: [
                {
                id: this.props.orders[prodIdx].items[prodIdx1].id,
                amount: this.props.orders[prodIdx].items[prodIdx1].amount,
                manufacture:
                  this.props.orders[prodIdx].items[prodIdx1].manufacture,
                name: this.props.orders[prodIdx].items[prodIdx1].name,
                price: this.props.orders[prodIdx].items[prodIdx1].price,
                priceActual:
                  parseFloat(this.props.orders[prodIdx].items[prodIdx1].price) *
                  parseFloat(result.value),
                size: this.props.orders[prodIdx].items[prodIdx1].size,
                type: this.props.orders[prodIdx].items[prodIdx1].type,
                amountActual: result.value,
              },
              ...new_items_list],
            });
            //x.items[prodIdx1].amountActual=result.value
            //console.log(this.props.orders)
          }
        });
      }
    });
  };

  RemoveProduct = (productName) => {
    Swal.fire({
      title: "האם לנעול הזמנה זו? לא תוכל לבצע שינוי לאחר לחיצה על אישור ",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "כן",
      confirmButtonColor: "green",
      denyButtonText: `לא`,
      denyButtonColor: `red`,
    }).then((result) => {
      if (result.isConfirmed) {
        const prodIdx = getIndexByName(this.props.orders, productName.id);
        this.props.updateRowOrderUnder({
          id: this.props.orders[prodIdx].id,
          totalAmount: this.props.orders[prodIdx].totalAmount,
          items: this.props.orders[prodIdx].items,
          locked: true,
          userDate: this.props.orders[prodIdx].userDate,
        });
        Swal.fire({
          title: " השינוי בוצע בהצלחה",
          icon: "success",
          confirmButtonText: "אישור",
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: " נשאר ללא שינוי ",
          icon: "info",
          confirmButtonText: "אישור",
        });
      }
    });
  };

  getSelectedNumberOfPerson = (ChangeNumberOfPerson) => {
    selectRow(ChangeNumberOfPerson);
    const prodIdx = getIndexByName(this.props.families, ChangeNumberOfPerson);
    Swal.fire({
      title: ` שנה את מספר הנפשות במשפחה: `,
      input: "number",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].numberOfPerson,
      inputValidator: (value) => {
        if (value <= 1) {
          return "מספר הנפשות חייב להיות לפחות 1";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].numberOfPerson !== result.value
      ) {
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          remarks: this.props.families[prodIdx].remarks,
          numberOfPerson: parseInt(result.value),
          language: this.props.families[prodIdx].language,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
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
    return this.props.orders.sort(
      (a, b) => new Date(b.userDate.date).getTime() -
      new Date(a.userDate.date).getTime()
     )
  };


  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.props.orders.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense40}>
          <h1>מעקב הזמנות</h1>
          <div />
        </div>

        <div className={classes.tablewrapper1}>
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
            <table className="table table-striped table-hover" align="center">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                    #
                  </th>
                  <th className={classes.header} th scope="col">
                    מספר במערכת
                    <button
                      className={classes.button}
                      onClick={() => this.sortRows()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    עלות הזמנה
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsLast()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך שליחת הזמנה
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך מבוקש לאספקה
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך בפועל
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    מרכז
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowNumber()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    שם מבצע ההזמנה
                  </th>
                  <th className={classes.header} th scope="col">
                    אושר
                  </th>

                  <th className={classes.header} th scope="col">
                    סופק
                  </th>
                  <th className={classes.header} th scope="col">
                    {/* <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterCheckedFood}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheckFood(e)}
                    /> */}
                    הערות
                  </th>
                  <th className={classes.header} th scope="col">
                    סטטוס הזמנה
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      <td align="center">
                        {" "}
                        <button
                          className={classes.button}
                          onClick={() => {
                            if (this.state.expanded === "") {
                              this.setState({ expanded: x.id });
                            } else if (this.state.expanded === x.id) {
                              this.setState({
                                expanded: "",
                              });
                            } else {
                              this.setState({
                                expanded: x.idr,
                              });
                            }
                          }}
                        >
                          <GoIcons.GoPlus />
                        </button>
                      </td>
                      <td className={classes.type121}>{parseInt(x.userDate.id)}</td>
                      <td>
                        {parseFloat(x.totalAmount).toFixed(2)}
                        {this.state.expanded === x.id && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th th scope="col">
                                  שם מוצר
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr>
                                    <td className={classes1.type121}>
                                      {" "}
                                      {y.name}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                      <td>
                        {new Date(x.userDate.date).toLocaleDateString("en-GB")}
                        {this.state.expanded === x.id && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  סוג
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr>
                                    <td className={classes1.type121}>
                                      {" "}
                                      {y.type}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                      <td>
                        {new Date(x.userDate.endDate).toLocaleDateString(
                          "en-GB"
                        )}
                        {this.state.expanded === x.id && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  יחידת מוצר
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr>
                                    <td className={classes1.type121}>
                                      {" "}
                                      {y.size}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                      <td onDoubleClick={() => this.getSelectedDateOn(x)}>
                        {new Date(x.userDate.endDateActual).toLocaleDateString(
                          "en-GB"
                        )}
                        {this.state.expanded === x.id && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  יצרן
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr>
                                    <td className={classes1.type121}>
                                      {" "}
                                      {y.manufacture}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                      <td>
                        {x.userDate.center}
                        {this.state.expanded === x.id && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  נדרש
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr>
                                    <td className={classes1.type121}>
                                      {" "}
                                      {y.amount}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                      <td>
                        {x.userDate.name}
                        {this.state.expanded === x.id && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  בפועל
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr key={y.id}>
                                    {(!x.locked && (
                                      <td
                                        className={classes1.type121}
                                        onDoubleClick={() =>
                                          this.getSelectedCount(x, y)
                                        }
                                      >
                                        {" "}
                                        {y.amountActual}
                                      </td>
                                    )) ||
                                      (x.locked && (
                                        <td className={classes1.type121}>
                                          {" "}
                                          {y.amountActual}
                                        </td>
                                      ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                      <td>
                        {(!x.userDate.status && (
                          <input
                            key={x.userDate.status}
                            type="checkbox"
                            checked={x.userDate.status}
                            className="form-check-input"
                            id="rowcheck{x.userDate.status}"
                            onChange={(e) => this.onItemCheckStatus(e, x)}
                          />
                        )) ||
                          (x.userDate.status && (
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="x.userDate.status"
                              value="option3"
                              checked
                              disabled
                            ></input>
                          ))}
                        {this.state.expanded === x.id && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  עלות ליח'
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr>
                                      <td
                                        className={classes1.type121}
                                        onDoubleClick={() =>
                                          this.getSelectedPrice(x, y)
                                        }
                                      >
                                      {" "}
                                      ₪{parseFloat(y.price).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                      <td>
                        {(!x.userDate.supplier && (
                          <input
                            key={x.userDate.supplier}
                            type="checkbox"
                            checked={x.userDate.supplier}
                            className="form-check-input"
                            id="rowcheck{x.userDate.supplier}"
                            onChange={(e) => this.onItemCheckSupplier(e, x)}
                          />
                        )) ||
                          (x.userDate.supplier && (
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="x.userDate.supplier"
                              value="option3"
                              checked
                              disabled
                            ></input>
                          ))}
                        {this.state.expanded === x.id && (
                          <div>
                            <br />
                            <table className="table">
                              <thead>
                                <th className={classes.header1} th scope="col">
                                  סה"כ
                                </th>
                              </thead>
                              <tbody>
                                {x.items.map((y) => (
                                  <tr>
                                    <td className={classes1.type121}>
                                      {" "}
                                      ₪{parseFloat(y.priceActual).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>

                      <td onDoubleClick={() => this.getSelectedRemark(x)}>
                        {" "}
                        <OverlayTrigger
                          trigger="click"
                          placement="top"
                          overlay={
                            <Popover id="popover-basic">
                              <Popover.Header
                                as="h3"
                                direction="rtl"
                                textAlign="center"
                              >
                                
                              </Popover.Header>
                              <Popover.Body>
                                {x.userDate.desciption}
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <button className={classes1.button40}>
                            <FaIcons.FaRegHandPointer />
                          </button>
                        </OverlayTrigger>
                      </td>
                      {(!x.locked && (
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => this.RemoveProduct(x)}
                          >
                            {" "}
                            נעילה
                          </button>
                        </td>
                      )) ||
                        (x.locked && (
                          <td>
                            <button
                              type="button"
                              class="btn btn-secondary btn-sm"
                              disabled
                            >
                              {" "}
                              נעול
                            </button>
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
              {/* <button
              className="btn btn-primary"
              
              onClick={() => this.getSelectedRows()}
            >
              מספר משפחות: {this.rowsSearchConfig().length}
            </button> */}
            </table>
            {console.log(this.props.orders)}

            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={this.props.orders.length}
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
    orders: state.orders,
    active: state.active,
    activeFood: state.activeFood,
    activeHot: state.activeHot,
    token_access:state.token_access
  };
};

export default connect(mapStateToProps, {
  getOrders,
  updateRowItems,
  updateRowOrderUnder,
  updateRowOrderMain,
  selectRow,
  updateRow,
  updatePhone,
  toggleActive,
  toggleFood,
  toggleHot,
})(OrderList);
