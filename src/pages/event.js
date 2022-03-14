import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleActiveEvents} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateRowEvents, updatePhone,getEvents } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarEvent";
import Pagination from "./pagination";
import './switchEvent.css'
import './row.css'

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [...this.props.events],
      MasterChecked: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,
    };
  }
  componentDidMount() {
    this.props.getEvents()
   }
  

  sortRowsName() {
    this.setState({
        eventList: this.props.events.sort((a, b) => {
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


  sortRowDateFirst() {
    this.setState({
     eventList: this.props.events.sort(
        (a, b) =>
          new Date(b.startDate).getTime() -
          new Date(a.startDate).getTime()
      ),
    });
  }

  
  sortRowDateEnd() {
    this.setState({
     eventList: this.props.events.sort(
        (a, b) =>
          new Date(b.endDate).getTime() -
          new Date(a.endDate).getTime()
      ),
    });
  }
  

 

  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.events.map((x) => (x.status = e.target.checked));
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      eventList: this.props.events.filter((e) => e.status),
    });
  }
  

  

  onItemCheck(e, item) {
    this.props.events.map((x) => {
      if (x.id === item.id) {
        Swal.fire({
          title: " לפני נעילת האירוע, בדוק אם כל הנושאים סגורים. לא תוכל לבצע שינויים לאחר הנעילה.",
          icon: "warning",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "כן",
          confirmButtonColor: "green",
          denyButtonText: `לא`,
          denyButtonColor: `red`,
        }).then((result) => {
          if (result.isConfirmed) {
            x.status =true;
            const prodIdx = getIndexByName(this.props.events, item.id);
            this.props.updateRowEvents({
              id: this.props.events[prodIdx].id,
              name:this.props.events[prodIdx].name,
              startDate: this.props.events[prodIdx].startDate,
              dateEnd:new Date(),
              type: this.props.events[prodIdx].type,
              remarks:this.props.events[prodIdx].remarks,
              status: true,
              basket1: this.props.events[prodIdx].basket1,
          basket2: this.props.events[prodIdx].basket2,
          basket3: this.props.events[prodIdx].basket3,
          basket4: this.props.events[prodIdx].basket4,
          basket5: this.props.events[prodIdx].basket5,
            });
            Swal.fire({
              title: "בוצע",
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
        })
        
       
      }
      else{
      return x;
      }
    });
    

    //To Control Master Checkbox State
    const totalItems = this.props.events.length;
    const totalCheckedItems = this.props.events.filter(
      (e) => e.status
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

      eventList: this.props.events.filter((e) => e.status),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      eventList: this.props.events.filter((e) => e.status),
    });
  }

  getSelectedName = (ChangeFirstName) => {
    selectRow(ChangeFirstName);
    const prodIdx = getIndexByName(this.props.events, ChangeFirstName);
    Swal.fire({
      title: "עדכן את שם אירוע",
      input: "text",
      inputValue: this.props.events[prodIdx].name,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם אירוע";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.events[prodIdx].name !== result.value
      ) {
        this.props.updateRowEvents({
          id: this.props.events[prodIdx].id,
          name:result.value,
        startDate: this.props.events[prodIdx].startDate,
        dateEnd: this.props.events[prodIdx].dateEnd,
          type: this.props.events[prodIdx].type,
          remarks:this.props.events[prodIdx].remarks,
          status: this.props.events[prodIdx].status,
          basket1: this.props.events[prodIdx].basket1,
          basket2: this.props.events[prodIdx].basket2,
          basket3: this.props.events[prodIdx].basket3,
          basket4: this.props.events[prodIdx].basket4,
          basket5: this.props.events[prodIdx].basket5,
        });
      }
    });
  };

  
  
  getSelectedRemark = (ChangeFirstName) => {
    selectRow(ChangeFirstName);
    const prodIdx = getIndexByName(this.props.events, ChangeFirstName);
    Swal.fire({
      title: "עדכן את  תיאור אירוע",
      input: "text",
      inputValue: this.props.events[prodIdx].remarks,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם אירוע";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.events[prodIdx].remarks !== result.value
      ) {
        this.props.updateRowEvents({
          id: this.props.events[prodIdx].id,
          name:this.props.events[prodIdx].type,
        startDate: this.props.events[prodIdx].startDate,
        dateEnd: this.props.events[prodIdx].dateEnd,
          type: this.props.events[prodIdx].type,
          remarks:result.value,
          status: this.props.events[prodIdx].status,
          basket1: this.props.events[prodIdx].basket1,
          basket2: this.props.events[prodIdx].basket2,
          basket3: this.props.events[prodIdx].basket3,
          basket4: this.props.events[prodIdx].basket4,
          basket5: this.props.events[prodIdx].basket5,
        });
      }
    });
  };

  getSelectedDate = (ChangeDate) => {
    const prodIdx = getIndexByName(this.props.events, ChangeDate);
    Swal.fire({
      title: "נא עדכן תאריך התחלה",
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
        this.props.updateRowEvents({
            id: this.props.events[prodIdx].id,
            name:this.props.events[prodIdx].name,
            startDate: document.getElementById('swal-input').value,
            dateEnd: this.props.events[prodIdx].dateEnd,
            type: this.props.events[prodIdx].type,
            remarks:this.props.events[prodIdx].remarks,
            status: this.props.events[prodIdx].status,
            basket1: this.props.events[prodIdx].basket1,
          basket2: this.props.events[prodIdx].basket2,
          basket3: this.props.events[prodIdx].basket3,
          basket4: this.props.events[prodIdx].basket4,
          basket5: this.props.events[prodIdx].basket5,
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

getSelectedType = (ChangeType) => {
  selectRow(ChangeType);
  const prodIdx = getIndexByName(this.props.events, ChangeType);
  Swal.fire({
    title: `שנה סוג אירוע `,
    input: "select",
    inputOptions: {
        "סל מזון": 'סל מזון',
        "ארוחה חמה": 'ארוחה חמה',
      },
    inputPlaceholder: 'בחר סוג אירוע',
    confirmButtonText: "אישור",
    confirmButtonColor: "green",
    inputValue: this.props.events[prodIdx].type,
    inputValidator: (value) => {
      if (value.length <= 0) {
        return "חייב לבחור סוג אירוע";
      }
    },
  }).then((result) => {
    if (
      result.value &&
      this.props.events[prodIdx].type !== result.value
    ) {
      this.props.updateRowEvents({
          id: this.props.events[prodIdx].id,
          name:this.props.events[prodIdx].name,
          startDate: this.props.events[prodIdx].startDate,
          dateEnd: this.props.events[prodIdx].dateEnd,
          type: result.value,
          remarks:this.props.events[prodIdx].remarks,
          status: this.props.events[prodIdx].status,
          basket1: this.props.events[prodIdx].basket1,
          basket2: this.props.events[prodIdx].basket2,
          basket3: this.props.events[prodIdx].basket3,
          basket4: this.props.events[prodIdx].basket4,
          basket5: this.props.events[prodIdx].basket5,
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
    if (this.state.term === "" && !this.props.activeEvents  ) {
        return this.props.events.filter((x)=>!x.status).sort((a,b)=>b.startDate-a.startDate)
      }
      if (this.state.term === "" && this.props.activeEvents  ) {
        return this.props.events.filter((x)=>x.status)
      }
    else {
      return this.props.events.filter(
        (x) =>
          x.type.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.name.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 
      ).sort((a,b)=>b.startDate-a.startDate)
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
        <h1> אירועים</h1>
          
        <div class="toggle-button-cover">
        <div class="button-cover">
        <div class="button r" id="button-1">
          <input type="checkbox" class="checkbox" onClick={()=>this.props.toggleActiveEvents()}/>
          <div class="hola"></div>
          <div class="hola1"></div>
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
            getTerm={(term) => this.forceUpdate(this.setState({ term: term, currentPage:1 }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                      שם אירוע
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך 
                    {/* <button
                       className={classes.button}
                      onClick={() => this.sortRowDateFirst()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                 
                  <th className={classes.header} th scope="col">
                    סוג אירוע
                  </th>
                  <th className={classes.header} th scope="col">
                    תיאור האירוע
                  </th>
                  <th className={classes.header} th scope="col">
                    בוצע

                  </th>
                  <th className={((!this.props.activeEvents) && classes.showHidden) || ((this.props.activeEvents) && classes.header)} th scope="col">תאריך סיום
                  <button
                      className={classes.button}
                      onClick={() => this.sortRowDate()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button></th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig().sort(
        (a, b) =>
          new Date(b.endDate).getTime() -
          new Date(a.endDate).getTime()
      )
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td onDoubleClick={() => this.getSelectedName(x.id)}>
                        {x.name}
                      </td>
                      <td onDoubleClick={() => this.getSelectedDate(x.id)}>
                        {new Date(x.startDate).toLocaleDateString("en-GB")}
                      </td>
                      <td onDoubleClick={() => this.getSelectedType(x.id)}>
                        {x.type}
                      </td>
                      <td onDoubleClick={() => this.getSelectedRemark(x.id)}>{x.remarks}</td>
                    {(!x.status && <td key={x.id} className={x.status ? "status" : ""}>
                        <input
                          type="checkbox"
                          checked={x.status}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheck(e, x)}
                        />
                      
                     </td>) || (x.status &&<td><input class="form-check-input" type="checkbox" id="x.userDate.supplier" value="option3" checked disabled></input></td>)}
                      <td className={((x.status) && classes.show) || ((!x.status) && classes.showHidden)} > {new Date(x.dateEnd).toLocaleDateString("en-GB")}</td>
                    </tr>
                  ))}
              </tbody>
              <button
              className="btn btn-primary"
              
              onClick={() => this.getSelectedRows()}
            >
              מספר אירועים: {this.rowsSearchConfig().length}
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
    events: state.events,
    activeEvents:state.activeEvents,
  };
};

export default connect(mapStateToProps, { selectRow, updateRowEvents, updatePhone,toggleActiveEvents,getEvents })(
  Event
);
