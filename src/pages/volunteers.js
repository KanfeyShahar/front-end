import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleActiveV,toggleFood, toggleHot,getFriends} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateRowV, updatePhone } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarV";
import Pagination from "./pagination";
import './switch.css'
import './row.css'

class Volunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volunteersList: [...this.props.volunteers],
      MasterChecked: false,
      MasterCheckedDriver: false,
      term: "",
      currentPage: 1,
      postsPerPage: 15,

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
    this.props.getFriends()
   }

  sortRows() {
    this.setState({
      volunteersList: this.props.volunteers.sort((a, b) => {
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
      volunteersList: this.props.volunteers.sort((a, b) => {
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
  sortRowsCenter() {
    this.setState({
      volunteersList: this.props.volunteers.sort((a, b) => {
        let nameA = a.center.toLowerCase();
        let nameB = b.center.toLowerCase();
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

  sortRowsLanguage() {
    this.setState({
      volunteersList: this.props.volunteers.sort((a, b) => {
        let nameA = a.id.toLowerCase();
        let nameB = b.id.toLowerCase();
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

  sortRowDate() {
    this.setState({
      volunteersList: this.props.volunteers.sort(
        (a, b) =>
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
      ),
    });
  }

  sortRowBirthdayDate() {
    this.setState({
      volunteersList: this.props.volunteers.sort(
        (a, b) =>
          new Date(b.date_birthday).getTime() -
          new Date(a.date_birthday).getTime()
      ),
    });
  }
  
  onMasterCheckDriver(e) {
    // Check/ UnCheck All Items
    this.props.volunteers.map((x) => (x.driver = e.target.checked));
    //Update State
    this.setState({
      MasterCheckedDriver: e.target.checked,
      volunteersList: this.props.volunteers.filter((e) => e.driver),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheckDriver(e, item) {
    this.props.volunteers.map((x) => {
      if (x.id === item.id) {
        x.driver = e.target.checked;
        const prodIdx = getIndexByName(this.props.volunteers, item.id);
        this.props.updateRowV({ id: this.props.volunteers[prodIdx].id,
          date_birthday:this.props.volunteers[prodIdx].date_birthday,
          firstName:this.props.volunteers[prodIdx].firstName ,
          lastName: this.props.volunteers[prodIdx].lastName,
          phone: this.props.volunteers[prodIdx].phone,
          center: this.props.volunteers[prodIdx].center,
          role: this.props.volunteers[prodIdx].role,
          language: this.props.volunteers[prodIdx].language,
          created_date: this.props.volunteers[prodIdx].created_date,
          driver:this.props.volunteers[prodIdx].driver,
          type:this.props.volunteers[prodIdx].type,
          status: this.props.volunteers[prodIdx].status,
          dateEnd: this.props.volunteers[prodIdx].dateEnd});
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.volunteers.length;
    const totalCheckedItems = this.props.volunteers.filter(
      (e) => e.driver
    ).length;

    // Update State
    this.setState({
      MasterCheckedDriver: totalItems === totalCheckedItems,

      volunteersList: this.props.volunteers.filter((e) => e.driver),
    });
  }

 

  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.volunteers.map((x) => (x.status = e.target.checked));
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      volunteersList: this.props.volunteers.filter((e) => e.status),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    this.props.volunteers.map((x) => {
      if (x.id === item.id) {
        x.status = e.target.checked;
        const prodIdx = getIndexByName(this.props.volunteers, item.id);
        this.props.updateRowV({ 
          id: this.props.volunteers[prodIdx].id,
          date_birthday:this.props.volunteers[prodIdx].date_birthday,
          firstName:this.props.volunteers[prodIdx].firstName ,
          lastName: this.props.volunteers[prodIdx].lastName,
          phone: this.props.volunteers[prodIdx].phone,
          center: this.props.volunteers[prodIdx].center,
          role: this.props.volunteers[prodIdx].role,
          language: this.props.volunteers[prodIdx].language,
          created_date: this.props.volunteers[prodIdx].created_date,
          driver:this.props.volunteers[prodIdx].driver,
          type:this.props.volunteers[prodIdx].type,
          status: this.props.volunteers[prodIdx].status,
          dateEnd: new Date(), });
        if(!item.status){item.dateEnd= new Date()}
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.volunteers.length;
    const totalCheckedItems = this.props.volunteers.filter(
      (e) => e.status
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

      volunteersList: this.props.volunteers.filter((e) => e.status),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      volunteersList: this.props.volunteers.filter((e) => e.status),
    });
  }

  getSelectedFirstName = (ChangeFirstName) => {
    const prodIdx = getIndexByName(this.props.volunteers, ChangeFirstName);
    Swal.fire({
      title: "שינוי שם פרטי",
      input: "text",
      inputValue: this.props.volunteers[prodIdx].firstName,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 1) {
          return "חייב להקליד שם  ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.volunteers[prodIdx].firstName !== result.value
      ) {
        this.props.updateRowV({
          id: this.props.volunteers[prodIdx].id,
          date_birthday:this.props.volunteers[prodIdx].date_birthday,
          firstName: result.value,
          lastName: this.props.volunteers[prodIdx].lastName,
          phone: this.props.volunteers[prodIdx].phone,
          center: this.props.volunteers[prodIdx].center,
          role: this.props.volunteers[prodIdx].role,
          language: this.props.volunteers[prodIdx].language,
          created_date: this.props.volunteers[prodIdx].created_date,
          driver:this.props.volunteers[prodIdx].driver,
          type:this.props.volunteers[prodIdx].type,
          status: this.props.volunteers[prodIdx].status,
          dateEnd: this.props.volunteers[prodIdx].dateEnd,
     
        });
      }
    });
  };
  getSelectedLastName = (ChangeLastName) => {
    const prodIdx = getIndexByName(this.props.volunteers, ChangeLastName);
    Swal.fire({
      title: `שנה שם משפחה`,
      input: "text",
      inputValue: this.props.volunteers[prodIdx].lastName,
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
        this.props.volunteers[prodIdx].lastName !== result.value
      ) {
        this.props.updateRowV({
          id: this.props.volunteers[prodIdx].id,
          date_birthday:this.props.volunteers[prodIdx].date_birthday,
          firstName: this.props.volunteers[prodIdx].firstName,
          lastName: result.value,
          phone: this.props.volunteers[prodIdx].phone,
          center: this.props.volunteers[prodIdx].center,
          role: this.props.volunteers[prodIdx].role,
          language: this.props.volunteers[prodIdx].language,
          created_date: this.props.volunteers[prodIdx].created_date,
          driver:this.props.volunteers[prodIdx].driver,
          type:this.props.volunteers[prodIdx].type,
          status: this.props.volunteers[prodIdx].status,
          dateEnd: this.props.volunteers[prodIdx].dateEnd,
         
        });
      }
    });
  };
  getSelectedPhone = (ChangePhone) => {
    const prodIdx = getIndexByName(this.props.volunteers, ChangePhone);
    Swal.fire({
      title: `שנה מספר טלפון`,
      input: "text",
      inputValue: this.props.volunteers[prodIdx].phone,
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
        this.props.volunteers[prodIdx].phone !== result.value &&
        getIndexByPhone(this.props.volunteers, result.value) === -1
      ) {
        this.props.updateRowV({
          id: this.props.volunteers[prodIdx].id,
          date_birthday:this.props.volunteers[prodIdx].date_birthday,
          firstName: this.props.volunteers[prodIdx].firstName,
          lastName: this.props.volunteers[prodIdx].lastName,
          phone: result.value,
          center: this.props.volunteers[prodIdx].center,
          role: this.props.volunteers[prodIdx].role,
          language: this.props.volunteers[prodIdx].language,
          created_date: this.props.volunteers[prodIdx].created_date,
          driver:this.props.volunteers[prodIdx].driver,
          type:this.props.volunteers[prodIdx].type,
          status: this.props.volunteers[prodIdx].status,
          dateEnd: this.props.volunteers[prodIdx].dateEnd,
   
        });
      } else if (this.props.volunteers[prodIdx].phone === result.value) {
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

  getSelectedCenter = (ChangeCenter) => {
    const prodIdx = getIndexByName(this.props.volunteers, ChangeCenter);
    Swal.fire({
      title: `בחר מרכז`,
      input: "select",
      inputOptions: {
        "בית ידידיה": "בית ידידיה",
        "אור הכרמל": "אור הכרמל",
        "הדר הכרמל": "הדר הכרמל",
      },
      inputPlaceholder: "בחר מרכז",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.volunteers[prodIdx].center,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "בחר מרכז";
        }
      },
    }).then((result) => {
      if (
        result.value && this.props.volunteers[prodIdx].center !== result.value
      ) {
        this.props.updateRowV({
          id: this.props.volunteers[prodIdx].id,
          date_birthday:this.props.volunteers[prodIdx].date_birthday,
          firstName: this.props.volunteers[prodIdx].firstName,
          lastName: this.props.volunteers[prodIdx].lastName,
          phone: this.props.volunteers[prodIdx].phone,
          center: result.value,
          role: this.props.volunteers[prodIdx].role,
          language: this.props.volunteers[prodIdx].language,
          created_date: this.props.volunteers[prodIdx].created_date,
          driver:this.props.volunteers[prodIdx].driver,
          type:this.props.volunteers[prodIdx].type,
          status: this.props.volunteers[prodIdx].status,
          dateEnd: this.props.volunteers[prodIdx].dateEnd,
     
        });
      }
    });
  };

  
  getSelectedRole = (ChangeRole) => {
    selectRow(ChangeRole);
    const prodIdx = getIndexByName(this.props.volunteers, ChangeRole);
    Swal.fire({
      title: ` שינוי תפקיד בעמותה : `,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.volunteers[prodIdx].role,
      inputValidator: (value) => {
        if (value <= 1) {
          return "חייב להזין  תפקיד";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.volunteers[prodIdx].role !== result.value
      ) {
        this.props.updateRowV({
          id: this.props.volunteers[prodIdx].id,
          date_birthday:this.props.volunteers[prodIdx].date_birthday,
          firstName: this.props.volunteers[prodIdx].firstName,
          lastName: this.props.volunteers[prodIdx].lastName,
          phone: this.props.volunteers[prodIdx].phone,
          center: this.props.volunteers[prodIdx].center,
          role: result.value,
          language: this.props.volunteers[prodIdx].language,
          created_date: this.props.volunteers[prodIdx].created_date,
          driver:this.props.volunteers[prodIdx].driver,
          type:this.props.volunteers[prodIdx].type,
          status: this.props.volunteers[prodIdx].status,
          dateEnd: this.props.volunteers[prodIdx].dateEnd,
        });
      }
    });
  };

  getSelectedDateBirthday = (ChangeRole) => {
    const prodIdx = getIndexByName(this.props.volunteers, ChangeRole);
    Swal.fire({
      title: "נא עדכן תאריך לידה",
      html:'<input type="date" id="swal-input" class="swal2-input">',
      focusConfirm: false,
      allowOutsideClick: false,
      confirmButtonText: "אישור",
      confirmButtonColor: "green", 
    }).then((result) => {
      if (
        result.value &&
        new Date().valueOf() > new Date(document.getElementById('swal-input').value).valueOf()
      ) {
        this.props.updateRowV({
          id: this.props.volunteers[prodIdx].id,
          date_birthday:document.getElementById('swal-input').value,
          firstName: this.props.volunteers[prodIdx].firstName,
          lastName: this.props.volunteers[prodIdx].lastName,
          phone: this.props.volunteers[prodIdx].phone,
          center: this.props.volunteers[prodIdx].center,
          role: this.props.volunteers[prodIdx].role,
          language: this.props.volunteers[prodIdx].language,
          created_date: this.props.volunteers[prodIdx].created_date,
          driver:this.props.volunteers[prodIdx].driver,
          type:this.props.volunteers[prodIdx].type,
          status: this.props.volunteers[prodIdx].status,
          dateEnd: this.props.volunteers[prodIdx].dateEnd,
        });
        
      }else{
        Swal.fire({
            icon: "error",
            title: "התאריך שעודכן לא תקין",
            confirmButtonText: "אישור",
            confirmButtonColor: "red",
          })
      }
    });
  };




  getSelectedLanguage = (ChangeLanguage) => {
    selectRow(ChangeLanguage);
    const prodIdx = getIndexByName(this.props.volunteers, ChangeLanguage);
    Swal.fire({
      title: `הוסף שפות `,
      input: "text",
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.volunteers[prodIdx].language,
      inputValidator: (value) => {
        if (value <= 1) {
          return "אין קלט לקלוט";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.volunteers[prodIdx].language !== result.value
      ) {
        this.props.updateRowV({
          id: this.props.volunteers[prodIdx].id,
          date_birthday:this.props.volunteers[prodIdx].date_birthday,
          firstName: this.props.volunteers[prodIdx].firstName,
          lastName: this.props.volunteers[prodIdx].lastName,
          phone: this.props.volunteers[prodIdx].phone,
          center: this.props.volunteers[prodIdx].center,
          role: this.props.volunteers[prodIdx].role,
          language: result.value,
          created_date: this.props.volunteers[prodIdx].created_date,
          driver:this.props.volunteers[prodIdx].driver,
          type:this.props.volunteers[prodIdx].type,
          status: this.props.volunteers[prodIdx].status,
          dateEnd: this.props.volunteers[prodIdx].dateEnd,
      
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
    if (this.state.term === "" && this.props.activeV ) {
      return this.props.volunteers.filter((x)=>x.status )
    } if (this.state.term === "" && !this.props.activeV ) {
      return this.props.volunteers.filter((x)=>!x.status )}
    else {
      return this.props.volunteers.filter(
        (x) =>
        JSON.stringify(x.id).toLowerCase().indexOf(this.state.term.toLowerCase()) !==
        -1 ||
          x.lastName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.center.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.phone.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1||
          JSON.stringify(x.language).toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1||
          x.type.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
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
        <h1>חברי עמותה</h1>

          <div class="toggle-button-cover">
        <div class="button-cover">
        <div class="button r" id="button-1">
          <input type="checkbox" class="checkbox" onClick={()=>this.props.toggleActiveV()}/>
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
          <ActionBar friend={this.props.volunteers.filter((x)=>x.status)}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term,currentPage:1 }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                    תעודת זהות
                  </th>
                  <th className={classes.header} th scope="col">
                  תאריך לידה
                  {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowBirthdayDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    שם פרטי
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRows()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    שם משפחה
                    {/* <button
                       className={classes.button}
                      onClick={() => this.sortRowsLast()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                    טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                   מרכז
                   {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowsCenter()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">
                     תפקיד
                  </th>
                  <th className={classes.header} th scope="col">
                    שפות 
                  </th>
                  <th className={classes.header} th scope="col">
                    פעיל
                  </th>
                  <th className={classes.header} th scope="col">
                    סוג חברות
                  </th>
                  <th className={classes.header} th scope="col">
                   נהג
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך הוספה
                    {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={((this.props.activeV) && classes.showHidden) || ((!this.props.activeV) && classes.header)} th scope="col">תאריך סיום
                  {/* <button
                      className={classes.button}
                      onClick={() => this.sortRowDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                    </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig().sort(
        (a, b) =>
          new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime()
      ).slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td >
                        {x.id}
                      </td>
                      <td onDoubleClick={()=>this.getSelectedDateBirthday(x.id)}>{new Date(x.date_birthday).toLocaleDateString("en-GB")}</td>
                      <td onDoubleClick={() => this.getSelectedFirstName(x.id)}>
                        {x.firstName}
                      </td>
                      <td onDoubleClick={() => this.getSelectedLastName(x.id)}>
                        {x.lastName}
                      </td>
                      <td onDoubleClick={() => this.getSelectedPhone(x.id)}>
                        {x.phone}
                      </td>
                      <td onDoubleClick={() => this.getSelectedCenter(x.id)}>
                        {x.center}
                      </td>
                      <td
                        onDoubleClick={() => this.getSelectedRole(x.id)}
                      >
                        {x.role}
                      </td>
                      <td
                        onDoubleClick={() =>
                          this.getSelectedLanguage(x.id)
                        }
                      >
                        {x.language}
                      </td>
                      
                      <td key={x.id} className={x.status ? "status" : ""}>
                        <input
                          type="checkbox"
                          checked={x.status}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheck(e, x)}
                        />
                      </td>
                      <td>{x.type}</td>
                      <td key={x.driver} className={x.driver ? "driver" : ""}>
                        <input
                          type="checkbox"
                          checked={x.driver}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheckDriver(e, x)}
                        />
                      </td>
                      <td>{new Date(x.created_date).toLocaleDateString("en-GB")}</td>
                      <td className={((!x.status) && classes.show) || ((x.status) && classes.showHidden)} > {new Date(x.dateEnd).toLocaleDateString("en-GB")}</td>
                    </tr>
                  ))}
              </tbody>
              <button
              className="btn btn-primary"
              onClick={() => this.getSelectedRows()}
            >
              מספר חברי עמותה: {this.rowsSearchConfig().length}
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
    volunteers: state.volunteers,
    activeV:state.activeV,
  };
};

export default connect(mapStateToProps, { selectRow, updateRowV, updatePhone,toggleActiveV,toggleFood,toggleHot,getFriends })(
  Volunteer
);
