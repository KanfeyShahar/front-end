import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleActive,toggleFood, toggleHot,getUsers} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateUsers, updatePhone, toggleActiveUsers } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarUsers";
import Pagination from "./pagination";
import './switch.css'
import './row.css'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [...this.props.users],
      MasterChecked: false,
      MasterCheckedFood: false,
      MasterCheckedHot: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,

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


  componentDidMount(){
    this.props.getUsers()
  }
  sortRows() {
    this.setState({
      usersList: this.props.users.sort((a, b) => {
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
      usersList: this.props.users.sort((a, b) => {
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
  

  sortRowDate() {
    this.setState({
      usersList: this.props.users.sort(
        (a, b) =>
          new Date(b.created_date).getTime() -
          new Date(a.created_date).getTime()
      ),
    });
  }
  
  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.users.map((x) => (x.status = e.target.checked));
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      usersList: this.props.users.filter((e) => e.status),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    this.props.users.map((x) => {
      if (x.id === item.id) {
        x.status = e.target.checked;
        const prodIdx = getIndexByName(this.props.users, item.id);
        this.props.updateUsers({
          id: this.props.users[prodIdx].id,
          firstName:this.props.users[prodIdx].firstName,
          lastName: this.props.users[prodIdx].lastName,
          phone:this.props.users[prodIdx].phone,
          email: this.props.users[prodIdx].email,
          password:this.props.users[prodIdx].password,
          type_permission: this.props.users[prodIdx].type_permission,
          created_date: this.props.users[prodIdx].created_date,
          status:e.target.checked,
          dateEnd:new Date()
        });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.users.length;
    const totalCheckedItems = this.props.users.filter(
      (e) => e.status
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

      usersList: this.props.users.filter((e) => e.status),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      usersList: this.props.users.filter((e) => e.status),
    });
  }

  
  getSelectedPassword = (x) => {
    selectRow(x);
    const prodIdx = getIndexByName(this.props.users, x.id);
    Swal.fire({
      title: "עדכן סיסמת משתמש",
      input: "text",
      inputValue:this.props.users[prodIdx].password,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד סיסמת משתמש";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.users[prodIdx].firstName !== result.value
      ) {
        this.props.updateUsers({
          id: this.props.users[prodIdx].id,
          firstName: this.props.users[prodIdx].firstName,
          lastName: this.props.users[prodIdx].lastName,
          phone: this.props.users[prodIdx].phone,
          email: this.props.users[prodIdx].email,
          password:result.value,
          type_permission: this.props.users[prodIdx].type_permission,
          created_date: this.props.users[prodIdx].created_date,
          status: this.props.users[prodIdx].status,
          dateEnd: this.props.users[prodIdx].dateEnd
        });
      }
    });
  };

  getSelectedFirstName = (x) => {
    selectRow(x);
    const prodIdx = getIndexByName(this.props.users, x.id);
    Swal.fire({
      title: "עדכן שם פרטי משתמש",
      input: "text",
      inputValue:this.props.users[prodIdx].firstName,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם משתמש";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.users[prodIdx].firstName !== result.value
      ) {
        this.props.updateUsers({
          id: this.props.users[prodIdx].id,
          firstName: result.value,
          lastName: this.props.users[prodIdx].lastName,
          phone: this.props.users[prodIdx].phone,
          email: this.props.users[prodIdx].email,
          password:this.props.users[prodIdx].password,
          type_permission: this.props.users[prodIdx].type_permission,
          created_date: this.props.users[prodIdx].created_date,
          status: this.props.users[prodIdx].status,
          dateEnd: this.props.users[prodIdx].dateEnd
        });
      }
    });
  };
  getSelectedLastName = (x) => {
    selectRow(x);
    const prodIdx = getIndexByName(this.props.users, x.id);
    Swal.fire({
      title: `שנה שם משפחה של המשתמש`,
      input: "text",
      inputValue: this.props.users[prodIdx].lastName,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם משפחה של המשתמש";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.users[prodIdx].lastName !== result.value
      ) {
        this.props.updateUsers({
          id: this.props.users[prodIdx].id,
          firstName:this.props.users[prodIdx].firstName,
          lastName: result.value,
          phone: this.props.users[prodIdx].phone,
          email: this.props.users[prodIdx].email,
          password:this.props.users[prodIdx].password,
          type_permission: this.props.users[prodIdx].type_permission,
          created_date: this.props.users[prodIdx].created_date,
          status: this.props.users[prodIdx].status,
          dateEnd: this.props.users[prodIdx].dateEnd
        });
      }
    });
  };
  getSelectedPhone = (x) => {
    const prodIdx = getIndexByName(this.props.users, x.id);
    Swal.fire({
      title: `שנה מספר טלפון של המשתמש`,
      input: "text",
      inputValue: this.props.users[prodIdx].phone,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד מספר טלפון של המשתמש";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.users[prodIdx].phone !== result.value
      ) {
        this.props.updateUsers({
          id: this.props.users[prodIdx].id,
          firstName:this.props.users[prodIdx].firstName,
          lastName: this.props.users[prodIdx].lastName,
          phone:result.value,
          email: this.props.users[prodIdx].email,
          password:this.props.users[prodIdx].password,
          type_permission: this.props.users[prodIdx].type_permission,
          created_date: this.props.users[prodIdx].created_date,
          status: this.props.users[prodIdx].status,
          dateEnd: this.props.users[prodIdx].dateEnd
        });
      }
    });
  };

  getSelectedEmail = (x) => {
    const prodIdx = getIndexByName(this.props.users, x.id);
    Swal.fire({
      title: `שנה אימייל של המשתמש`,
      input: "text",
      inputValue: this.props.users[prodIdx].email,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד מייל של המשתמש";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.users[prodIdx].email !== result.value
      ) {
        this.props.updateUsers({
          id: this.props.users[prodIdx].id,
          firstName:this.props.users[prodIdx].firstName,
          lastName: this.props.users[prodIdx].lastName,
          phone:this.props.users[prodIdx].phone,
          email: result.value,
          password:this.props.users[prodIdx].password,
          type_permission: this.props.users[prodIdx].type_permission,
          created_date: this.props.users[prodIdx].created_date,
          status: this.props.users[prodIdx].status,
          dateEnd: this.props.users[prodIdx].dateEnd
        });
      }
    });
  };
  
  getSelectedType = (x) => {
    const prodIdx = getIndexByName(this.props.users, x.id);
    Swal.fire({
      title: `שנה סוג הרשאה `,
      input: "select",
      inputOptions: {
        'מנהל המערכת': 'מנהל המערכת',
          'דרג מינהלי': 'דרג מינהלי',
          'ניהול בית ידידיה': 'ניהול בית ידידיה',
          'דרג תפעולי בית ידידיה': 'דרג תפעולי בית ידידיה',
          'ניהול הדר הכרמל': 'ניהול הדר הכרמל',
          'תפעול הדר הכרמל': 'תפעול הדר הכרמל',
          'ניהול אור הכרמל': 'ניהול אור הכרמל',
          'תפעול אור הכרמל': 'תפעול אור הכרמל',
        },
      inputPlaceholder: ' בחר סוג הרשאה',
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValue: this.props.users[prodIdx].type_permission,
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור סוג הרשאה";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.users[prodIdx].type_permission !== result.value
      ) {
        this.props.updateUsers({
          id: this.props.users[prodIdx].id,
          firstName:this.props.users[prodIdx].firstName,
          lastName: this.props.users[prodIdx].lastName,
          phone:this.props.users[prodIdx].phone,
          email: this.props.users[prodIdx].email,
          password:this.props.users[prodIdx].password,
          type_permission: result.value,
          created_date: this.props.users[prodIdx].created_date,
          status: this.props.users[prodIdx].status,
          dateEnd: this.props.users[prodIdx].dateEnd
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
    if (this.state.term === "" && this.props.activeUsers ) {
      return this.props.users.filter((x)=>x.status )
    }
      else if (this.state.term === "" && !this.props.activeUsers ) {
        return this.props.users.filter((x)=>!x.status )
    }
    else {
      return this.props.users.filter(
        (x) =>
          x.lastName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.phone.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.type_permission.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.email.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
      );
    }
  };

  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.props.users.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense40}>
        <h1>ניהול משתמשים</h1>
         
          <div class="toggle-button-cover">
        <div class="button-cover">
        <div class="button r" id="button-1">
          <input type="checkbox" class="checkbox" onClick={()=>this.props.toggleActiveUsers()}/>
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
          <ActionBar
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                  שם פרטי
                    <button
                      className={classes.button}
                      onClick={() => this.sortRows()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                   שם משפחה
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsLast()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                  אימייל
                  </th>
                  <th className={classes.header} th scope="col">
                   טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                   סוג הרשאה
                  </th>
                  <th className={classes.header} th scope="col">
                   סיסמה
                  </th>
                  <th className={classes.header} th scope="col">
                    {/* <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}
                    /> */}
                  פעיל

                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך הוספה
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={((this.props.activeUsers) && classes.showHidden) || ((!this.props.activeUsers) && classes.header)} th scope="col">תאריך סיום
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td onDoubleClick={() => this.getSelectedFirstName(x)}>
                        {x.firstName}
                      </td>
                      <td onDoubleClick={() => this.getSelectedLastName(x)}>
                        {x.lastName}
                      </td>
                      <td onDoubleClick={() => this.getSelectedEmail(x)}>
                        {x.email}
                      </td>
                      <td onDoubleClick={() => this.getSelectedPhone(x)}>
                        {x.phone}
                      </td>
                      <td onDoubleClick={() => this.getSelectedType(x)}>
                        {x.type_permission}
                      </td>
                      <td onDoubleClick={() => this.getSelectedPassword(x)}>*****</td>
                      <td key={x.id} className={x.status ? "status" : ""}>
                        <input
                          type="checkbox"
                          checked={x.status}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheck(e, x)}
                        />
                      </td>
                      <td>{(new Date(x.created_date).toLocaleDateString('en-GB'))}</td>
                      <td className={((!x.status) && classes.show) || ((x.status) && classes.showHidden)} > {(new Date(x.dateEnd).toLocaleDateString('en-GB'))}</td>
                    </tr>
                  ))}
              </tbody>
              <button
              className="btn btn-primary"
              
              onClick={() => this.getSelectedRows()}
            >
              מספר משתמשים: {this.rowsSearchConfig().length}
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
    users: state.users,
    activeUsers:state.activeUsers,
  };
};

export default connect(mapStateToProps, { selectRow, updateUsers, updatePhone,toggleActiveUsers,toggleFood,toggleHot,getUsers })(
  Users
);
