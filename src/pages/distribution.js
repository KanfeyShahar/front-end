import React, { Component } from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import { toggleActive,toggleFood, toggleHot,selectEvent,deleteEventMember,updateRowMemberEvent,updateRowMemberEvent1,getFriends,getEvents,getFriendEvents} from "../actions";
import * as IoIcons from "react-icons/io"
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone ,getIndexByNameFriend} from "../helper-functions";
import { selectRow, updateRow, updatePhone } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBarEventFriend";
import Pagination from "./pagination";
import './switch.css'
import './row.css'
import { ValueErrorBar } from "devextreme-react/chart";

class Distribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverDistrubation: [...this.props.driversEvent],
      selected:"",
      type:[...this.props.type],
      MasterChecked: false,
      MasterCheckedFood: false,
      MasterCheckedHot: false,
      direction1:"",
      term: "",
      currentPage: 1,
      postsPerPage: 10  ,
    };
  }

  componentDidMount() {
    this.props.getFriends()
    this.props.getEvents()
    this.props.getFriendEvents()
   }


   sortRowsName() {
    this.setState({
      driverDistrubation: this.props.driversEvent.sort((a, b) => {
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

  sortRowsLastName() {
    this.setState({
      driverDistrubation: this.props.driversEvent.sort((a, b) => {
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

  sortRowsDirection() {
    this.setState({
      driverDistrubation: this.props.driversEvent.sort((a, b) => {
        let nameA = a.direction.toLowerCase();
        let nameB = b.direction.toLowerCase();
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
  getSelectedRole = (ChangeFirstName) => {
    const prodIdx = getIndexByName(this.props.driversEvent, ChangeFirstName);
    Swal.fire({
      title: "עדכן את  תפקיד אירוע",
      input: "text",
      inputValue: this.props.driversEvent[prodIdx].role_event,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד תפקיד באירוע ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.driversEvent[prodIdx].role_event !== result.value
      ) {
        this.props.updateRowMemberEvent({
          id: this.props.driversEvent[prodIdx].id,
          number_id:this.props.driversEvent[prodIdx].number_id,
          startDate: this.props.driversEvent[prodIdx].startDate,
          lastName:this.props.driversEvent[prodIdx].lastName,
          firstName: this.props.driversEvent[prodIdx].firstName,
          phone: this.props.driversEvent[prodIdx].phone,
          role_event: result.value,
          driver: this.props.driversEvent[prodIdx].driver,
          direction: this.props.driversEvent[prodIdx].direction,
          remarks: this.props.driversEvent[prodIdx].remarks,
          serialNumber:this.props.driversEvent[prodIdx].serialNumber
        })
        }
    });
  };

  getSelectedRemarks = (ChangeFirstName) => {
    const prodIdx = getIndexByName(this.props.driversEvent, ChangeFirstName);
    Swal.fire({
      title: "הערות",
      input: "text",
      inputValue: this.props.driversEvent[prodIdx].remarks,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length < 0 ) {
          return "חייב להקליד תפקיד באירוע ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.driversEvent[prodIdx].remarks !== result.value
      ) {
        this.props.updateRowMemberEvent({
          id: this.props.driversEvent[prodIdx].id,
          number_id:this.props.driversEvent[prodIdx].number_id,
          startDate: this.props.driversEvent[prodIdx].startDate,
          lastName:this.props.driversEvent[prodIdx].lastName,
          firstName: this.props.driversEvent[prodIdx].firstName,
          phone: this.props.driversEvent[prodIdx].phone,
          role_event: this.props.driversEvent[prodIdx].role_event,
          driver: this.props.driversEvent[prodIdx].driver,
          direction: this.props.driversEvent[prodIdx].direction,
          remarks: result.value,
          serialNumber:this.props.driversEvent[prodIdx].serialNumber
        })
        }
    });
  };



  onItemCheck(e, item) {
    this.props.driversEvent.map((x) => {
      if (x.id === item.id && x.startDate === item.startDate) {
        x.selectDirection = e.target.checked;
        const prodIdx = getIndexByName(this.props.driversEvent, item.id);
        this.props.updateRowMemberEvent1({ selectDirection: this.props.driversEvent[prodIdx].selectDirection });
        
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.driversEvent.length;
    const totalCheckedItems = this.props.driversEvent.filter(
      (e) => e.selectDirection
    ).length;

    // Update State
    this.setState({
      MasterCheckedDeliverd: totalItems === totalCheckedItems,

      driverDistrubation: this.props.driversEvent.filter((e) => e.selectDirection),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      driverDistrubation: this.props.driversEvent.filter((e) => e.selectDirection),
    });
  }

  handleClick() {
    this.props.driversEvent.filter((x=>x.selectDirection)).map((x)=>
    this.props.updateRowMemberEvent({
      id: x.id,
      number_id:x.number_id,
      startDate: x.startDate,
      lastName:x.lastName,
      firstName: x.firstName,
      phone: x.phone,
      role_event: x.role_event,
      driver: x.driver,
      direction: this.state.direction1,
      remarks: x.remarks,
      serialNumber:x.serialNumber
    }) 
    )
    // Swal.fire({
    //   icon: "success",
    //   text: "נוסף בהצלחה",
    //   confirmButtonText: "אישור",
    //   confirmButtonColor: "green",
    // });
    
  }

  getSelectedDirection = (id) => {
    const prodIdx = getIndexByName(this.props.driversEvent, id);
    Swal.fire({
      title: `שנה מסלול `,
      input: "select",
      inputOptions: {
          'מסלול 1':'מסלול 1',
          'מסלול 2':'מסלול 2',
          'מסלול 3':'מסלול 3',
          'מסלול 4':'מסלול 4',
          'מסלול 5':'מסלול 5',
          'מסלול 6':'מסלול 6',
          'מסלול 7':'מסלול 7',
          'מסלול 8':'מסלול 8',
          'מסלול 9':'מסלול 9',
          'מסלול 10':'מסלול 10',
          'מסלול 11':'מסלול 11',
          'מסלול 12':'מסלול 12',
          'מסלול 13':'מסלול 13',
          'מסלול 14':'מסלול 14',
          'מסלול 15':'מסלול 15',
          'מסלול 16':'מסלול 16',
          'מסלול 17':'מסלול 17',
          'מסלול 18':'מסלול 18',
          'מסלול 19':'מסלול 19',
          'מסלול 20':'מסלול 20',
        },
      inputPlaceholder: 'בחר מסלול',
      inputValue: this.props.driversEvent[prodIdx].direction,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב לבחור מסלול";
        }
      },
    }).then((result) => {
      if (
        result.value 
      ) {
        this.props.updateRowMemberEvent({
          id: this.props.driversEvent[prodIdx].id,
          number_id:this.props.driversEvent[prodIdx].number_id,
          startDate: this.props.driversEvent[prodIdx].startDate,
          lastName:this.props.driversEvent[prodIdx].lastName,
          firstName: this.props.driversEvent[prodIdx].firstName,
          phone: this.props.driversEvent[prodIdx].phone,
          role_event: this.props.driversEvent[prodIdx].role_event,
          driver: this.props.driversEvent[prodIdx].driver,
          direction: result.value,
          remarks: this.props.driversEvent[prodIdx].remarks,
          serialNumber:this.props.driversEvent[prodIdx].serialNumber
        })
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
  removeProduct = (item) => {
    const prodIdx = getIndexByName(this.props.driversEvent, item);
    Swal.fire({
      title: "? האם ברצונך למחוק רשומה זו",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "כן",
      confirmButtonColor: "green",
      denyButtonText: `לא`,
      denyButtonColor: `red`,
    }).then((result) => {
      if (result.isConfirmed) {
        const DeleteFriend= {
          id: this.props.driversEvent[prodIdx].id,
          number_id:this.props.driversEvent[prodIdx].number_id,
          startDate: this.props.driversEvent[prodIdx].startDate,
          lastName:this.props.driversEvent[prodIdx].lastName,
          firstName: this.props.driversEvent[prodIdx].firstName,
          phone: this.props.driversEvent[prodIdx].phone,
          role_event: this.props.driversEvent[prodIdx].role_event,
          driver: this.props.driversEvent[prodIdx].driver,
          direction: this.props.driversEvent[prodIdx].direction,
          remarks: this.props.driversEvent[prodIdx].remarks,
          serialNumber:this.props.driversEvent[prodIdx].serialNumber
        }
        this.props.deleteEventMember(DeleteFriend)
        // Swal.fire({
        //   title: " נמחק בהצלחה",
        //   icon: "success",
        //   confirmButtonText: "אישור",
        // });
      } else if (result.isDenied) {
        Swal.fire({
          title: " נשאר ללא שינוי ",
          icon: "info",
          confirmButtonText: "אישור",
        });
      }
    });
  };

  rowsSearchConfig = () => {
    if (this.state.term === ""  ) {
      console.warn('distributuin ====>')
      console.warn(this.props.driversEvent.filter((x)=>x.startDate === this.state.selected ))
      return this.props.driversEvent.filter((x)=>x.startDate === this.state.selected ).sort((a,b)=>b.serialNumber-a.serialNumber)
    }
    else {
      return this.props.driversEvent.filter(
        (x) =>x.startDate === this.state.selected && (
          x.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
          -1 ||
        x.lastName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
          -1  ||
          x.direction.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
          -1  ||
          x.phone.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
          -1  
        )
        
      ).sort((a,b)=>b.serialNumber-a.serialNumber)
    }
    }
 

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

    const options= this.props.events.filter((x)=>x.status === false).map(x => ({
      "value":x.startDate,
      "label": new Date(x.startDate).toLocaleDateString("en-GB")
    }))

      const options1=  [
        { value:'מסלול 1', label: 'מסלול 1' },
        { value:'מסלול 2', label: 'מסלול 2' },
        { value:'מסלול 3', label: 'מסלול 3' },
        { value:'מסלול 4', label: 'מסלול 4' },
        { value:'מסלול 5', label: 'מסלול 5' },
        { value:'מסלול 6', label: 'מסלול 6' },
        { value:'מסלול 7', label: 'מסלול 7' },
        { value:'מסלול 8', label: 'מסלול 8' },
        { value:'מסלול 9', label: 'מסלול 9' },
        { value:'מסלול 10', label: 'מסלול 10' },
        { value:'מסלול 11', label: 'מסלול 11' },
        { value:'מסלול 12', label: 'מסלול 12' },
        { value:'מסלול 13', label: 'מסלול 13' },
        { value:'מסלול 14', label: 'מסלול 14' },
        { value:'מסלול 15', label: 'מסלול 15' },
        { value:'מסלול 16', label: 'מסלול 16' },
        { value:'מסלול 17', label: 'מסלול 17' },
        { value:'מסלול 18', label: 'מסלול 18' },
        { value:'מסלול 19', label: 'מסלול 19' },
        { value:'מסלול 20', label: 'מסלול 20' },
     
   
      ]
      var array=0;

    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense6}>
        <h1>חברי עמותה באירוע</h1>
         סוג אירוע:{this.props.events.filter((x)=>x.status === false && x.startDate===this.state.selected).map((x)=>x.type)}
        <div />
        <div className={classes1. newExpense12}>
        <Select className="mt-4 col-md-6 col-offset-4"
         options={options}
         placeholder="בחר תאריך אירוע"
          onChange={(e) => {
    this.setState({selected: e.value})
    this.props.selectEvent(e.value)
  }}

 
  value={options.filter(x=> this.state.selected.includes(x.value))}
  autoFocus={true}
  />
        <Select className="mt-4 col-md-6 col-offset-4"
         options={options1}
         placeholder="בחר מספר מסלול"
          onChange={ (e) => {
          this.setState({direction1: e.value})
     }}
  value={options1.filter(x=> this.state.direction1 === x.value)}
  autoFocus={true}
  />
  <br/>
  <div className={classes1.row}>
  <button  class="btn btn-outline-primary" onClick={() => this.handleClick()}>שיוך למסלול</button>
     
  </div>
        </div>
        </div>

        <div className={classes.tablewrapper}>
          <ActionBar friend={ this.props.driversEvent.filter((x)=>x.startDate === this.state.selected )} selected={this.state.selected} type={this.props.events.filter((x)=>x.status === false && x.startDate===this.state.selected).map((x)=>x.type)}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))} date={this.state.selected}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                   תאריך הגעה
              
                  </th>
                  <th></th>
                  <th className={classes.header} th scope="col">
                    משפחה
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsLastName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                   פרטי
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                   תפקיד באירוע
                  </th>
                  <th className={classes.header} th scope="col">
                   נהג
                  </th>
                  <th className={classes.header} th scope="col">
                   מסלול
                    {/* <button
                       className={classes.button}
                      onClick={() => this.sortRowsDirection()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button> */}
                  </th>
                  <th className={classes.header} th scope="col">שפות</th>
                  <th className={classes.header} th scope="col">
                    הערות
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
                      <td>{new Date(x.startDate).toLocaleDateString("en-GB")}</td>
                     <td> <input key={x.SelectDirection}
                          type="checkbox"
                          checked={x.selectDirection}
                          className="form-check-input"
                          id="rowcheck{x.selectDirection}"
                          onChange={(e) => this.onItemCheck(e, x)}
                        /></td>
                      <td>{x.lastName}</td>
                      <td>{x.firstName}</td>
                      <td>{x.phone}</td>
                      <td onDoubleClick={() => this.getSelectedRole(x.id)}>{x.role_event}</td>
                      {/* {(x.driver && <td><input class="form-check-input" type="checkbox" id="x.driver" value="option3" checked disabled></input></td> )||(!x.driver && <td><input class="form-check-input" type="checkbox" id="x.driver" value="option3" disabled></input></td> )} */}
                      {(JSON.stringify(x.driver)=="true") && (<td><input class="form-check-input" type="checkbox" id="aaa" value="true" checked disabled></input></td>)}
                      { (JSON.stringify(x.driver)!=="true") && (<td><input class="form-check-input"  type="checkbox" disabled></input></td>) }
                      <td onDoubleClick={()=> this.getSelectedDirection(x.id)}>{x.direction}</td>
                      <td>{this.props.volunteers.filter((y)=>y.id===x.number_id).map((z)=>z.language)}</td>
                      <td onDoubleClick={() => this.getSelectedRemarks(x.id)}>{x.remarks}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => this.removeProduct(x.id)}
                        >
                          <IoIcons.IoMdTrash/>
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
              מספר חברי עמותה באירוע: { this.rowsSearchConfig().length}
            </button>
            </table>
            
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={ this.rowsSearchConfig().length}
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
    driversEvent: state.driversEvent,
   events: state.events,
    active:state.active,
    activeFood:state.activeFood,
   type:state.type,
    selectedDate:state.selectedDate,
    volunteers: state.volunteers,
  };
};

export default connect(mapStateToProps, { selectRow, updateRow, updatePhone,toggleActive,toggleFood,toggleHot,updateRowMemberEvent1,selectEvent,deleteEventMember,updateRowMemberEvent,getFriends,getEvents,getFriendEvents})(
  Distribution
);
