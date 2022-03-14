import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleActiveCars,getCars} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByNameCar, getIndexByName } from "../helper-functions";
import { selectRowCars, updateRowCars } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarCars";
import Pagination from "./pagination";
import './switch.css'
import './row.css'

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
     carsList: [...this.props.cars],
      MasterChecked: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,
    };
  }

componentDidMount(){
  this.props.getCars()
}

  sortRowsNumber() {
    this.setState({
      carsList: this.props.cars.sort((a, b) => {
        let nameA = JSON.stringify(a.idCars).toLowerCase();
        let nameB = JSON.stringify(b.idCars).toLowerCase();
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
  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.cars.map((x) => (x.status = e.target.checked));
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      carsList: this.props.cars.filter((e) => e.status),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    this.props.cars.map((x) => {
      if (x.idCars === item.idCars) {
        x.status = e.target.checked;
        const prodIdx = getIndexByName(this.props.cars, item.id);
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: this.props.cars[prodIdx].typeCar,
          engineCapacity: this.props.cars[prodIdx].engineCapacity,
          year: this.props.cars[prodIdx].year,
          kilometer: this.props.cars[prodIdx].kilometer,
          cost: this.props.cars[prodIdx].cost,
          carModel: this.props.cars[prodIdx].carModel,
          testValidity: this.props.cars[prodIdx].testValidity,
          insurance:this.props.cars[prodIdx].insurance,
          date_type:this.props.cars[prodIdx].date_type,
          status: e.target.checked,
          dateEnd:new Date()
        });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.cars.length;
    const totalCheckedItems = this.props.cars.filter(
      (e) => e.status
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

      carsList: this.props.cars.filter((e) => e.status),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      carsList: this.props.cars.filter((e) => e.status),
    });
  }

  sortRowsType() {
    this.setState({
      carsList: this.props.cars.sort((a, b) => {
        let nameA = a.typeCar.toLowerCase();
        let nameB = b.typeCar.toLowerCase();
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
  sortRowsEngine() {
    this.setState({
     carsList: this.props.cars.sort(
        (a, b) => a.engineCapacity - b.engineCapacity
      ),
    });
  }
  sortRowsYear() {
    this.setState({
     carsList: this.props.cars.sort(
        (a, b) => a.year - b.year
      ),
    });
  }
  sortRowsKilomater() {
    this.setState({
     carsList: this.props.cars.sort(
        (a, b) => a.kilometer - b.kilometer
      ),
    });
  }
  sortRowsCost() {
    this.setState({
     carsList: this.props.cars.sort(
        (a, b) => a.cost - b.cost
      ),
    });
  }
  sortRowsCarModel() {
    this.setState({
      carsList: this.props.cars.sort((a, b) => {
        let nameA = a.carModel.toLowerCase();
        let nameB = b.carModel.toLowerCase();
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
 

  sortRowTest() {
    this.setState({
    carsList: this.props.cars.sort(
        (a, b) =>
          new Date(b.testValidity).getTime() -
          new Date(a.testValidity).getTime()
      ),
    });
  }
  

  
  getSelectedTypeCars = (ChangeTypeCars) => {
    const prodIdx = getIndexByName(this.props.cars, ChangeTypeCars);
    Swal.fire({
      title: "עדכן סוג רכב",
      input: "text",
      inputValue: this.props.cars[prodIdx].typeCar,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב סוג רכב   ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.cars[prodIdx].typeCar !== result.value
      ) {
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: result.value,
          engineCapacity: this.props.cars[prodIdx].engineCapacity,
          year: this.props.cars[prodIdx].year,
          kilometer: this.props.cars[prodIdx].kilometer,
          cost: this.props.cars[prodIdx].cost,
          carModel: this.props.cars[prodIdx].carModel,
          testValidity: this.props.cars[prodIdx].testValidity,
          insurance:this.props.cars[prodIdx].insurance,
          status:this.props.cars[prodIdx].status,
          date_type:this.props.cars[prodIdx].date_type
        });
      }
    });
  };


  getSelectedEngineCapacity = (ChangeCapacity) => {
    const prodIdx = getIndexByName(this.props.cars, ChangeCapacity);
    Swal.fire({
      title: "עדכן נפח מנוע",
      input: "number",
      inputValue: this.props.cars[prodIdx].engineCapacity,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value <= 0) {
          return "הקלד נפח מנוע";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.cars[prodIdx].engineCapacity !== result.value
      ) {
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: this.props.cars[prodIdx].typeCar,
          engineCapacity: result.value,
          year: this.props.cars[prodIdx].year,
          kilometer: this.props.cars[prodIdx].kilometer,
          cost: this.props.cars[prodIdx].cost,
          carModel: this.props.cars[prodIdx].carModel,
          testValidity: this.props.cars[prodIdx].testValidity,
          insurance:this.props.cars[prodIdx].insurance,
          status:this.props.cars[prodIdx].status,
          date_type:this.props.cars[prodIdx].date_type
        });
      }
    });
  };
  getSelectedYear = (ChangeCapacity) => {
    const prodIdx = getIndexByName(this.props.cars, ChangeCapacity);
    Swal.fire({
      title: "עדכן שנה",
      input: "number",
      inputValue: this.props.cars[prodIdx].year,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value <= 0) {
          return "הקלד שנה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.cars[prodIdx].year !== result.value
      ) {
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: this.props.cars[prodIdx].typeCar,
          engineCapacity: this.props.cars[prodIdx].engineCapacity,
          year: result.value,
          kilometer: this.props.cars[prodIdx].kilometer,
          cost: this.props.cars[prodIdx].cost,
          carModel: this.props.cars[prodIdx].carModel,
          testValidity: this.props.cars[prodIdx].testValidity,
          insurance:this.props.cars[prodIdx].insurance,
          status:this.props.cars[prodIdx].status,
          date_type:this.props.cars[prodIdx].date_type
        });
      }
    });
  };
  getSelectedKilometer = (ChangeCapacity) => {
    const prodIdx = getIndexByName(this.props.cars, ChangeCapacity);
    Swal.fire({
      title: "'עדכן קילומטראז",
      input: "number",
      inputValue: this.props.cars[prodIdx].kilometer,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value <= 0) {
          return " 'עדכן קילומטראז";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.cars[prodIdx].kilometer !== result.value
      ) {
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: this.props.cars[prodIdx].typeCar,
          engineCapacity: this.props.cars[prodIdx].engineCapacity,
          year: this.props.cars[prodIdx].year,
          kilometer: result.value,
          cost: this.props.cars[prodIdx].cost,
          carModel: this.props.cars[prodIdx].carModel,
          testValidity: this.props.cars[prodIdx].testValidity,
          insurance:this.props.cars[prodIdx].insurance,
          status:this.props.cars[prodIdx].status,
          date_type:this.props.cars[prodIdx].date_type
        });
      }
    });
  };
  getSelectedCost = (ChangeCapacity) => {
    const prodIdx = getIndexByName(this.props.cars, ChangeCapacity);
    Swal.fire({
      title: "עדכן שווי הרכב בפועל",
      input: "number",
      inputValue: this.props.cars[prodIdx].cost,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value <= 0) {
          return "עדכן שווי הרכב בפועל";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.cars[prodIdx].cost !== result.value
      ) {
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: this.props.cars[prodIdx].typeCar,
          engineCapacity: this.props.cars[prodIdx].engineCapacity,
          year: this.props.cars[prodIdx].year,
          kilometer: this.props.cars[prodIdx].kilometer,
          cost: result.value,
          carModel: this.props.cars[prodIdx].carModel,
          testValidity: this.props.cars[prodIdx].testValidity,
          insurance:this.props.cars[prodIdx].insurance,
          status:this.props.cars[prodIdx].status,
          date_type:this.props.cars[prodIdx].date_type
        });
      }
    });
  };

  getSelectedModel = (ChangeTypeCars) => {
    const prodIdx = getIndexByName(this.props.cars, ChangeTypeCars);
    Swal.fire({
      title: " עדכן את דגם הרכב ",
      input: "text",
      inputValue: this.props.cars[prodIdx].carModel,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לעדכן את דגם הרכב   ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.cars[prodIdx].carModel !== result.value
      ) {
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: this.props.cars[prodIdx].typeCar,
          engineCapacity: this.props.cars[prodIdx].engineCapacity,
          year: this.props.cars[prodIdx].year,
          kilometer: this.props.cars[prodIdx].kilometer,
          cost: this.props.cars[prodIdx].cost,
          carModel: result.value,
          testValidity: this.props.cars[prodIdx].testValidity,
          insurance:this.props.cars[prodIdx].insurance,
          status:this.props.cars[prodIdx].status,
          date_type:this.props.cars[prodIdx].date_type
        });
      }
    });
  };

  getSelectedInsurance = (Insurance) => {
    const prodIdx = getIndexByName(this.props.cars, Insurance);
    Swal.fire({
      title: `הוסף  ביטוח `,
      input: "select",
      inputOptions: {
        "מקיף,חובה,צד ג": "מקיף, חובה, צד ג",
        "מקיף": "מקיף",
        "חובה": "חובה",
        " צד ג" : "צד ג",
        "מקיף וחובה": "מקיף וחובה",
      },
      inputPlaceholder: "בחר קטגוריה",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue:  this.props.cars[prodIdx].insurance,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "בחר קטגוריה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.cars[prodIdx].insurance !== result.value
      ) {
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: this.props.cars[prodIdx].typeCar,
          engineCapacity: this.props.cars[prodIdx].engineCapacity,
          year: this.props.cars[prodIdx].year,
          kilometer: this.props.cars[prodIdx].kilometer,
          cost: this.props.cars[prodIdx].cost,
          carModel: this.props.cars[prodIdx].carModel,
          testValidity: this.props.cars[prodIdx].testValidity,
          insurance:result.value,
          status:this.props.cars[prodIdx].status,
          date_type:this.props.cars[prodIdx].date_type
        });
      }
    });
  };
  getSelectedDate_2 = (ChangeDate) => {
    const prodIdx = getIndexByName(this.props.cars, ChangeDate);
    Swal.fire({
      title: "נא עדכן תאריך טיפול אחרון ",
      html:'<input type="date" id="swal-input" class="swal2-input">',
      focusConfirm: false,
      allowOutsideClick: false,
      confirmButtonText: "אישור",
      confirmButtonColor: "green", 
    }).then((result) => {
      if (new Date().valueOf() < new Date(document.getElementById('swal-input').value).valueOf()) {
        Swal.fire({
          icon: "warning",
          title: "התאריך לא תקין, הקלד תאריך חדש",
          confirmButtonText: "אישור",
          confirmButtonColor: "red",
        });
      }
      else if (
        result.value &&
        this.props.cars[prodIdx].date_type !== document.getElementById('swal-input').value
      ) {
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: this.props.cars[prodIdx].typeCar,
          engineCapacity: this.props.cars[prodIdx].engineCapacity,
          year: this.props.cars[prodIdx].year,
          kilometer: this.props.cars[prodIdx].kilometer,
          cost: this.props.cars[prodIdx].cost,
          carModel: this.props.cars[prodIdx].carModel,
          date_type: document.getElementById('swal-input').value,
          insurance:this.props.cars[prodIdx].insurance,
          status:this.props.cars[prodIdx].status,
          testValidity:this.props.cars[prodIdx].testValidity
        
      })
    };
  });
}

  getSelectedDate = (ChangeDate) => {
    const prodIdx = getIndexByName(this.props.cars, ChangeDate);
    Swal.fire({
      title: "נא עדכן תוקף טסט",
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
        this.props.cars[prodIdx].insurance !== document.getElementById('swal-input').value
      ) {
        this.props.updateRowCars({
          id:this.props.cars[prodIdx].id,
          idCars: this.props.cars[prodIdx].idCars,
          typeCar: this.props.cars[prodIdx].typeCar,
          engineCapacity: this.props.cars[prodIdx].engineCapacity,
          year: this.props.cars[prodIdx].year,
          kilometer: this.props.cars[prodIdx].kilometer,
          cost: this.props.cars[prodIdx].cost,
          carModel: this.props.cars[prodIdx].carModel,
          testValidity: document.getElementById('swal-input').value,
          insurance:this.props.cars[prodIdx].insurance,
          status:this.props.cars[prodIdx].status,
          date_type:this.props.cars[prodIdx].date_type
        
      })
    };
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
    if (this.state.term === "" && this.props.activeCars) {
      return this.props.cars.filter((x)=> x.status)
    }if(this.state.term === "" && !this.props.activeCars){return this.props.cars.filter((x)=> !x.status)}
    else {
      return this.props.cars.filter(
        (x) =>
          x.idCars.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.typeCar.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.engineCapacity.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.insurance.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1||
          x.testValidity.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
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
        <h1>רשימת רכבים</h1>
         
          <div class="toggle-button-cover">
        <div class="button-cover">
        <div class="button r" id="button-1">
          <input type="checkbox" class="checkbox" onClick={()=>this.props.toggleActiveCars()}/>
          <div class="knobs"></div>
          <div class="layer"></div>
        </div>
      </div>
      </div>
      
   
          
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
          <ActionBar cars={this.props.cars.filter((x)=> x.status)}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                    מספר רכב
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsNumber()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    סוג רכב
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsType()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    נפח מנוע
                  </th>
                  <th className={classes.header} th scope="col">
                    שנת רכב
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsYear()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    ק"מ בפועל
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsKilomater()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                     שווי בפועל
                     <button
                       className={classes.button}
                      onClick={() => this.sortRowsCost()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    דגם
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsCarModel()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    תוקף טסט
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowTest()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                   ביטוחים
                  </th>
                  <th className={classes.header} th scope="col">
                  תאריך טיפול אחרון
                  </th>
                  <th className={classes.header} th scope="col">
                    פעיל

                  </th>
                  
                  <th className={((this.props.activeCars) && classes.showHidden) || ((!this.props.activeCars) && classes.header)} th scope="col">תאריך סיום
                </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td >
                        {x.idCars}
                      </td>
                      <td onDoubleClick={() => this.getSelectedTypeCars(x.id)}>
                        {x.typeCar}
                      </td>
                      <td onDoubleClick={() => this.getSelectedEngineCapacity(x.id)}>
                        {x.engineCapacity}
                      </td>
                      <td onDoubleClick={() => this.getSelectedYear(x.id)}>
                        {x.year}
                      </td>
                      <td onDoubleClick={() => this.getSelectedKilometer(x.id)}>
                        {x.kilometer}
                      </td>
                      <td
                        onDoubleClick={() => this.getSelectedCost(x.id)}
                      >
                        ₪{x.cost}
                      </td>
                      <td
                        onDoubleClick={() =>
                          this.getSelectedModel(x.id)
                        }
                      >
                        {x.carModel}
                      </td>
                      <td onDoubleClick={() => this.getSelectedDate(x.id)}>
                        {new Date(x.testValidity).toLocaleDateString("en-GB")}
                      </td>
                      <td onDoubleClick={() => this.getSelectedInsurance(x.id)}>
                        {x.insurance}
                      </td>
                      <td onDoubleClick={() => this.getSelectedDate_2(x.id)}>
                        { new Date(x.date_type).toLocaleDateString("en-GB")}
                      </td>
                      <td key={x.idCars} className={x.status ? "status" : ""}>
                        <input
                          type="checkbox"
                          checked={x.status}
                          className="form-check-input"
                          id="rowcheck{x.idCars}"
                          onChange={(e) => this.onItemCheck(e, x)}
                        />
                      </td>
                    
                      <td className={((!x.status) && classes.show) || ((x.status) && classes.showHidden)} > {new Date(x.dateEnd).toLocaleDateString("en-GB")}</td>
                    </tr>
                  ))}
              </tbody>
              <button
              className="btn btn-primary"
              
              onClick={() => this.getSelectedRows()}
            >
              מספר רכבים: {this.rowsSearchConfig().length}
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
   cars:state.cars,
    activeCars:state.activeCars,
  };
};

export default connect(mapStateToProps, {  updateRowCars,toggleActiveCars,getCars })(
  Cars
);
