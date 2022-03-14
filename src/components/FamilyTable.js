import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt, faSort } from "@fortawesome/free-solid-svg-icons";
import ActionBar from "./ActionBar";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateRow, updatePhone } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import NotAvailiableProductButton from './NotAvailiablProductButton'




class familiyTable extends Component {
  constructor(props) {
  super(props);
    this.state = {
 
      familyList: [...this.props.families],
      MasterChecked: false,
      MasterCheckedFood: false,
      MasterCheckedHot: false,
      term: "",

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
      })
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
      })
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
      })
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
      })
    });
  }
  sortRowNumber () {
    this.setState({
      familyList: this.props.families.sort(
        (a, b) => a.numberOfPerson - b.numberOfPerson
      )
    });
  }

  sortRowDate()  {
    this.setState({
      familyList: this.props.families.sort(
        (a, b) =>
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
      )
    });
  }
  // onMasterCheckHot(e) {
  //   // Check/ UnCheck All Items
  //   this.props.families.map((x) => (x.hot = e.target.checked));
  //   //Update State
  //   this.setState({
  //     MasterCheckedHot: e.target.checked,
  //     familyList: this.props.families.filter((e) => e.hot),
  //   });
  // }
  // // Update List Item's state and Master Checkbox State
  // onItemCheckHot(e, item) {
  //   this.props.families.map((x) => {
  //     if (x.id === item.id) {
  //       x.hots = e.target.checked;
  //       const prodIdx = getIndexByName(this.props.families, item.id);
  //       this.props.updateRow({ hot: this.props.families[prodIdx].hot });
  //     }
  //     return x;
  //   });

  //   //To Control Master Checkbox State
  //   const totalItems = this.props.families.length;
  //   const totalCheckedItems = this.props.families.filter(
  //     (e) => e.hot
  //   ).length;

  //   // Update State
  //   this.setState({
  //     MasterCheckedHot: totalItems === totalCheckedItems,

  //     familyList: this.props.families.filter((e) => e.hot),
  //   });
  // }
  // // Event to get selected rows(Optional)
  // getSelectedRowsHot() {
  //   this.setState({
  //     familyList: this.props.families.filter((e) => e.hot),
  //   });
  // }
 
  onMasterCheckHot(e) {
    // Check/ UnCheck All Items
    this.props.families.map((x) => (x.hot = e.target.checked));
    //Update State
    this.setState({
      MasterCheckedHot: e.target.checked,
      familyList: this.props.families.filter((e) => e.hot),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheckHot(e, item) {
    this.props.families.map((x) => {
      if (x.id === item.id) {
        x.hot = e.target.checked;
        const prodIdx = getIndexByName(this.props.families, item.id);
        this.props.updateRow({ hot: this.props.families[prodIdx].hot });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.families.length;
    const totalCheckedItems = this.props.families.filter((e) => e.hot).length;

    // Update State
    this.setState({
      MasterCheckedHot: totalItems === totalCheckedItems,

      familyList: this.props.families.filter((e) => e.hot),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRowsHot() {
    this.setState({
      familyList: this.props.families.filter((e) => e.hot),
    });
  }
  onMasterCheckFood(e) {
    // Check/ UnCheck All Items
    this.props.families.map((x) => (x.food = e.target.checked));
    //Update State
    this.setState({
      MasterCheckedFood: e.target.checked,
      familyList: this.props.families.filter((e) => e.food),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheckFood(e, item) {
    this.props.families.map((x) => {
      if (x.id === item.id) {
        x.food = e.target.checked;
        const prodIdx = getIndexByName(this.props.families, item.id);
        this.props.updateRow({ food: this.props.families[prodIdx].food });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.families.length;
    const totalCheckedItems = this.props.families.filter((e) => e.food).length;

    // Update State
    this.setState({
      MasterCheckedFood: totalItems === totalCheckedItems,

      familyList: this.props.families.filter((e) => e.food),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRowsFood() {
    this.setState({
      familyList: this.props.families.filter((e) => e.food),
    });
  }

  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.families.map((x) => (x.status = e.target.checked));
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      familyList: this.props.families.filter((e) => e.status),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    this.props.families.map((x) => {
      if (x.id === item.id) {
        x.status = e.target.checked;
        const prodIdx = getIndexByName(this.props.families, item.id);
        this.props.updateRow({ status: this.props.families[prodIdx].status });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.families.length;
    const totalCheckedItems = this.props.families.filter(
      (e) => e.status
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

      familyList: this.props.families.filter((e) => e.status),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      familyList: this.props.families.filter((e) => e.status),
    });
  }

  getSelectedFirstName = (ChangeFirstName) => {
    selectRow(ChangeFirstName);
    const prodIdx = getIndexByName(this.props.families, ChangeFirstName);
    Swal.fire({
      title: "עדכן את שם ראש המשפחה",
      input: "text",
      inputValue: this.props.families[prodIdx].firstName,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם ראש משפחה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].firstName !== result.value
      ) {
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: result.value,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          numberOfHome: this.props.families[prodIdx].numberOfHome,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
        });
      }
    });
  };
  getSelectedLastName = (ChangeLastName) => {
    selectRow(ChangeLastName);
    const prodIdx = getIndexByName(this.props.families, ChangeLastName);
    Swal.fire({
      title: `שנה שם משפחה`,
      input: "text",
      inputValue: this.props.families[prodIdx].lastName,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם משפחה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].lastName !== result.value
      ) {
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: result.value,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          numberOfHome: this.props.families[prodIdx].numberOfHome,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
        });
      }
    });
  };
  getSelectedPhone = (ChangePhone) => {
    selectRow(ChangePhone);
    const prodIdx = getIndexByName(this.props.families, ChangePhone);

    Swal.fire({
      title: `שנה מספר טלפון`,
      input: "text",
      inputValue: this.props.families[prodIdx].phone,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד מספר טלפון ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].phone !== result.value &&
        getIndexByPhone(this.props.families, result.value) === -1
      ) {
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: result.value,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          numberOfHome: this.props.families[prodIdx].numberOfHome,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
        });
      } else if (this.props.families[prodIdx].phone === result.value) {
        Swal.fire({
          icon: "warning",
          title: "מספר הטלפון לא שונה",
          confirmButtonText: "אישור",
          confirmButtonColor: "orange",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "מספר הטלפון שהזנת קיים במערכת",
          confirmButtonText: "אישור",
          confirmButtonColor: "red",
        });
      }
    });
  };
  getSelectedAddress = (ChangeAddress) => {
    selectRow(ChangeAddress);
    const prodIdx = getIndexByName(this.props.families, ChangeAddress);
    Swal.fire({
      title: `שינוי שם רחוב `,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].address,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "כתובת";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].address !== result.value
      ) {
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: result.value,
          city: this.props.families[prodIdx].city,
          numberOfHome: this.props.families[prodIdx].numberOfHome,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
        });
      }
    });
  };
  getSelectedCity = (ChangeCity) => {
    selectRow(ChangeCity);
    const prodIdx = getIndexByName(this.props.families, ChangeCity);
    Swal.fire({
      title: ` שינוי שם עיר`,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].city,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד עיר";
        }
      },
    }).then((result) => {
      if (result.value && this.props.families[prodIdx].city !== result.value) {
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: result.value,
          numberOfHome: this.props.families[prodIdx].numberOfHome,
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
        });
      }
    });
  };
  getSelectedNumberOfHome = (ChangeNumberOfHome) => {
    selectRow(ChangeNumberOfHome);
    const prodIdx = getIndexByName(this.props.families, ChangeNumberOfHome);
    Swal.fire({
      title: ` שינוי מספר בית : `,
      input: "number",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.families[prodIdx].numberOfHome,
      inputValidator: (value) => {
        if (value <= 1) {
          return "חייב להזין מספר בית";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.families[prodIdx].numberOfHome !== result.value
      ) {
        this.props.updateRow({
          id: this.props.families[prodIdx].id,
          firstName: this.props.families[prodIdx].firstName,
          lastName: this.props.families[prodIdx].lastName,
          phone: this.props.families[prodIdx].phone,
          address: this.props.families[prodIdx].address,
          city: this.props.families[prodIdx].city,
          numberOfHome: parseInt(result.value),
          numberOfPerson: this.props.families[prodIdx].numberOfPerson,
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
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
          numberOfHome: this.props.families[prodIdx].numberOfHome,
          numberOfPerson: parseInt(result.value),
          created_date: this.props.families[prodIdx].created_date,
          status: this.props.families[prodIdx].status,
          food: this.props.families[prodIdx].food,
          hot: this.props.families[prodIdx].hot,
        });
      }
    });
  };
  render() {
    return (
      <div className={classes.tablewrapper}>
        <ActionBar />
        <button
                        className="btn btn-outline-info"
                        onClick={()=> {
                            this.setState({
                                familyList:this.props.families.reverse()
                            });
                        }}
                        >
                            חזרה למצב הקודם
                        </button>
        <div className="direction">
          <table className="table table-striped table-hover" className={classes.tabletitle}>
            <thead>
              <tr>
                <th className={classes.header} th scope="col" >
                  שם ראש משפחה 
                  {/* <button
                    className="btn btn-outline-info"
                    onClick={() => this.sortRows()}
                  >
                    <FontAwesomeIcon icon={faSort} />
                  </button>      */}
                </th>
                <th className={classes.header} th scope="col">
                  שם משפחה
                  {/* <button
                    className="btn btn-outline-info"
                    onClick={() => this.sortRowsLast()}
                  >
                    <FontAwesomeIcon icon={faSort} />
                  </button> */}
                </th>
                <th className={classes.header} th scope="col">
                  טלפון
                </th>
                <th className={classes.header} th scope="col">
                  עיר
                  {/* <button
                    className="btn btn-outline-info"
                    onClick={() => this.sortRowsCity()}
                  >
                    <FontAwesomeIcon icon={faSort} />
                  </button> */}
                </th>
                <th className={classes.header} th scope="col">
                  רחוב
                  {/* <button
                    className="btn btn-outline-info"
                    onClick={() => this.sortRowsAddress()}
                  >
                    <FontAwesomeIcon icon={faSort} />
                  </button> */}
                </th>
                <th className={classes.header} th scope="col">
                  מספר בית
                </th>
                <th className={classes.header} th scope="col">
                  נפשות בפועל
                  <button
                    className="btn btn-outline-info"
                    onClick={() => this.sortRowNumber()}
                  >
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th className={classes.header} th scope="col">
                  תאריך הוספה<button
                    className="btn btn-outline-info"
                    onClick={() => this.sortRowDate()}
                  >
                    <FontAwesomeIcon icon={faSort} />
                  </button>
                </th>
                <th className={classes.header} th scope="col">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={this.state.MasterChecked}
                    id="mastercheck"
                    onChange={(e) => this.onMasterCheck(e)}
                  />
                  פעילה
                </th>
                <th className={classes.header} th scope="col">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={this.state.MasterCheckedFood}
                    id="mastercheck"
                    onChange={(e) => this.onMasterCheckFood(e)}
                  />
                  סל מזון
                </th>
                <th className={classes.header} th scope="col">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={this.state.MasterCheckedHot}
                    id="mastercheck"
                    onChange={(e) => this.onMasterCheckHot(e)}
                  />
                  ארוחה חמה
                </th>
                <th>
    
                    </th>
              </tr>
            </thead>
            <tbody>
             
              {this.props.families.map((x) => (
                <tr>
                  {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                  <td onDoubleClick={() => this.getSelectedFirstName(x.id)}>
                    {x.firstName}
                  </td>
                  <td onDoubleClick={() => this.getSelectedLastName(x.id)}>
                    {x.lastName}
                  </td>
                  <td onDoubleClick={() => this.getSelectedPhone(x.id)}>
                    {x.phone}
                  </td>
                  <td onDoubleClick={() => this.getSelectedCity(x.id)}>
                    {x.city}
                  </td>
                  <td onDoubleClick={() => this.getSelectedAddress(x.id)}>
                    {x.address}
                  </td>
                  <td onDoubleClick={() => this.getSelectedNumberOfHome(x.id)}>
                    {x.numberOfHome}
                  </td>
                  <td
                    onDoubleClick={() => this.getSelectedNumberOfPerson(x.id)}
                  >
                    {x.numberOfPerson}
                  </td>
                  <td>{formatDateToString(x.created_date)}</td>
                  <td key={x.id} className={x.status ? "status" : ""}>
                    <input
                      type="checkbox"
                      checked={x.status}
                      className="form-check-input"
                      id="rowcheck{x.id}"
                      onChange={(e) => this.onItemCheck(e, x)}
                    />
                  </td>
                  <td  className={x.food ? "food" : ""}>
                    <input
                      type="checkbox"
                      checked={x.food}
                      className="form-check-input"
                      id="rowcheck{x.id}"
                      onChange={(e) => this.onItemCheckFood(e, x)}
                    />
                  </td>
                  <td  className={x.hot ? "hot" : ""}>
                    <input
                      type="checkbox"
                      checked={x.hot}
                      className="form-check-input"
                      id="rowcheck{x.id}"
                      onChange={(e) => this.onItemCheckHot(e, x)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-primary"
            onClick={() => this.getSelectedRows()}
          >
            מספר משפחות: {this.state.familyList.length}
          </button>


        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    families: state.families,
  };
};

export default connect(mapStateToProps, { selectRow, updateRow, updatePhone })(
  familiyTable
);
