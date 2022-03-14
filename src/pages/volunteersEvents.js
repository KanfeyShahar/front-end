import React, { Component } from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import { toggleActiveEventsFamily,selectEvent,deleteEventFamily,toggleModal,updateRowFamilyEvent1,selectEventNoDirection,toggleActiveDirectionType, getFriendEvents,getEvents,getFamilyEvents} from "../actions";
import DirectionRoute from "../components/DirectionRoute";
import ButtonAdd from "../components/ButtonAdd";
import * as IoIcons from "react-icons/io"
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByNameDirection} from "../helper-functions";
import { selectRow, updateRowFamilyEvent, updatePhone } from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar1 from "../components/ActionBarEventFamily1";
import ActionBar from "../components/ActionBarProductList";
import Pagination from "./pagination";
import './switch.css'
import './row.css'

class Deliver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyEventList: [...this.props.familyEvents],
      selected:"",
      type:[...this.props.type],
      MasterCheckedDeliverd: false,
      term: "",
      direction:"",
      currentPage: 1,
      postsPerPage: 10,
      // componentDidUpdate() {
      //   this.props.toggleActiveEventsFamily(this.props.events.filter((x)=>x.status === false && x.startDate===this.state.selected).map((x)=>x.type)).then(() => {
      //     alert(this.props.selectedDate);
      //   });
      // }

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

  sortRowsFirstName() {
    this.setState({
      familyEventList: this.props.familyEvents.sort((a, b) => {
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
      familyEventList: this.props.familyEvents.sort((a, b) => {
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
      familyEventList: this.props.familyEvents.sort((a, b) => {
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
  sortRowNumber() {
    this.setState({
      familyEventList: this.props.familyEvents.sort(
        (a, b) => a.direction - b.direction
      ),
    });
  }



  
  getSelectedRemark = async (ChangeRemark) => {
    const prodIdx = getIndexByName(this.props.familyEvents, ChangeRemark);
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })

    if (text) {
      Swal.fire(text)
      this.props.updateRowFamilyEvent({
        startDate:this.props.familyEvents[prodIdx].startDate,
        id: this.props.familyEvents[prodIdx].id,
        firstName: this.props.familyEvents[prodIdx].firstName,
        lastName: this.props.familyEvents[prodIdx].lastName,
        phone: this.props.familyEvents[prodIdx].phone,
        address: this.props.familyEvents[prodIdx].address,
        city: this.props.familyEvents[prodIdx].city,
        remarks: text,
        numberOfPerson: this.props.familyEvents[prodIdx].numberOfPerson,
        language:this.props.familyEvents[prodIdx].language,
        direction: this.props.families[prodIdx].direction,
        isDeliverd: this.props.families[prodIdx].isDeliverd,
      });
    }
  };

  getSelectedDirection = (id,startDate) => {
    const prodIdx = getIndexByNameDirection(this.props.familyEvents, id,startDate);
    console.log(prodIdx)
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
      inputValue: this.props.familyEvents[prodIdx].direction,
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
        this.props.updateRowFamilyEvent({
        startDate:this.props.familyEvents[prodIdx].startDate,
        id: this.props.familyEvents[prodIdx].id,
        firstName: this.props.familyEvents[prodIdx].firstName,
        lastName: this.props.familyEvents[prodIdx].lastName,
        phone: this.props.familyEvents[prodIdx].phone,
        address: this.props.familyEvents[prodIdx].address,
        city: this.props.familyEvents[prodIdx].city,
        direction: result.value,
        numberOfPerson: this.props.familyEvents[prodIdx].numberOfPerson,
        language:this.props.familyEvents[prodIdx].language,
        remarks: this.props.familyEvents[prodIdx].remarks,
        isDeliverd: this.props.familyEvents[prodIdx].isDeliverd,
        basket_type:this.props.familyEvents[prodIdx].basket_type,
        serialNumber:this.props.familyEvents[prodIdx].serialNumber
        });
      }
    });
  };
  // getSelectedRemark = (ChangeRemark) => {
  //   selectRow(ChangeRemark);
  //   const prodIdx = getIndexByName(this.props.familyEvents, ChangeRemark);
  //   Swal.fire({
  //     title: "הערה",
  //     input: "text",
  //     inputValue: this.props.familyEvents[prodIdx].remark,
  //     confirmButtonText: "אישור",
  //     confirmButtonColor: "green",
    
  //   }).then((result) => {
  //     if (
  //       result.value 
  //     ) {
  //       this.props.updateRow({
  //         startDate:this.props.familyEvents[prodIdx].startDate,
  //         id: this.props.familyEvents[prodIdx].id,
  //         firstName: this.props.familyEvents[prodIdx].firstName,
  //         lastName: this.props.familyEvents[prodIdx].lastName,
  //         phone: this.props.familyEvents[prodIdx].phone,
  //         address: this.props.familyEvents[prodIdx].address,
  //         city: this.props.familyEvents[prodIdx].city,
  //         remark: result.value,
  //         numberOfPerson: this.props.familyEvents[prodIdx].numberOfPerson,
  //         language:this.props.familyEvents[prodIdx].language,
  //         direction: this.props.families[prodIdx].direction,
  //         isDeliverd: this.props.families[prodIdx].isDeliverd,
  //       });
  //     }
  //   });
  // };
 
  componentDidMount() {
    this.props.getEvents();
    this.props.getFriendEvents();
    this.props.getFamilyEvents();
  }

  handleClick() {
    this.props.familyEvents.filter((x=>x.selectDirection)).map((x)=>
    this.props.updateRowFamilyEvent({
      id: x.id,
      number_id:x.number_id,
      startDate: x.startDate,
      firstName:x.firstName,
      lastName: x.lastName,
      city: x.city,
      address:x.address,
      phone: x.phone,
      numberOfPerson:x.numberOfPerson,
      language: x.language,
      direction:this.state.direction,
      isDeliverd: x.isDeliverd,
      remarks:x.remarks,
      no_direction:x.no_direction,
      basket_type:x.basket_type,
      details:x.details,
      serialNumber:x.serialNumber
    }), 
    )
    // Swal.fire({
    //   icon: "success",
    //   text: "נוסף בהצלחה",
    //   confirmButtonText: "אישור",
    //   confirmButtonColor: "green",
    // });
    
  }
  onMasterCheck(e) {
    // Check/ UnCheck All Items
    this.props.familyEvents.map((x) => (x.selectDirection = e.target.checked));
    //Update State
    this.setState({
      MasterCheckedselectDirection: e.target.checked,
      familyEventList: this.props.familyEvents.filter((e) => e.selectDirection),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    this.props.familyEvents.map((x) => {
      if (x.id === item.id && x.startDate === item.startDate) {
        x.selectDirection = e.target.checked;
        const prodIdx = getIndexByName(this.props.familyEvents, item.id);
        this.props.updateRowFamilyEvent1({ selectDirection: this.props.familyEvents[prodIdx].selectDirection });
        
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.familyEvents.length;
    const totalCheckedItems = this.props.familyEvents.filter(
      (e) => e.selectDirection
    ).length;

    // Update State
    this.setState({
      MasterCheckedDeliverd: totalItems === totalCheckedItems,

      familyEventList: this.props.familyEvents.filter((e) => e.selectDirection),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      familyEventList: this.props.familyEvents.filter((e) => e.selectDirection),
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
  removeProduct = (item) => {
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
        this.props.deleteEventFamily(item)
        Swal.fire({
          title: " נמחק בהצלחה",
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
  

  rowsSearchConfig = () => {
    if (this.state.term === "") {
      return this.props.familyEvents.filter(
        (x) => x.startDate === this.state.selected
      ).sort((a,b)=>b.serialNumber-a.serialNumber)
    }
      else {
        return this.props.familyEvents.filter(
          (x) =>(x.startDate === this.state.selected) &&(
            x.lastName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.city.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.address.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.phone.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1||
          x.language.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1||
          x.direction.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
          )
           
        )
    }
  };

  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = this.props.familyEvents.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

      // const options1= this.props.events.filter((x)=>x.status === false).map(x => ({
      //   "value":x.type,
      //   "label": x.type
      // }))
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

    return (
   
      <div style={{ maxWidth: "100%" }}>
           <ButtonAdd header="המסלול המהיר ביותר (המומלץ)">
      <DirectionRoute  />
    </ButtonAdd>
    
 <div className={classes1.newexpense6}>
        <h1>תכנון מסלולי חלוקה</h1>
      
        סוג אירוע:{this.props.events.filter((x)=>x.status === false && x.startDate===this.state.selected).map((x)=>x.type)}
  
        <div />
        <div className={classes1.newExpense12}>
        <Select className="mt-4 col-md-6 col-offset-4"
         options={options}
         placeholder="בחר תאריך אירוע"
          onChange={ (e) => {
     this.setState({selected: e.value},()=> (this.props.toggleActiveEventsFamily(this.props.events.filter((x)=>x.status === false && x.startDate===this.state.selected).map((x)=>x.type)), this.props.selectEventNoDirection(e.value)))
     
    this.props.selectEvent(e.value)
    
     this.setState({type: this.props.events.filter( (x)=>x.status === false && x.startDate===this.state.selected).map( (x)=> x.type)})

     }}

 
  value={options.filter(x=> this.state.selected.includes(x.value))}
  autoFocus={true}
  />
  <Select className="mt-4 col-md-6 col-offset-4"
         options={options1}
         placeholder="בחר מספר מסלול"
          onChange={ (e) => {
          this.setState({direction: e.value},()=>this.props.toggleActiveDirectionType(e.value))
     }}
  value={options1.filter(x=> this.state.direction === x.value)}
  autoFocus={true}
  />
  </div>
  <div className={classes1.row}>
  <button class="btn btn-outline-primary" onClick={this.props.toggleModal}>סידור מסלול</button> 
  <button  class="btn btn-outline-primary" onClick={() => this.handleClick()}>שיוך למסלול</button> 


  </div>
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
         
         <ActionBar1
            selected={this.state.selected} family={this.props.familyEvents.filter((x)=>x.startDate === this.state.selected ) } type={this.props.events.filter((x)=>x.status === false && x.startDate===this.state.selected).map((x)=>x.type)} direction={this.state.direction}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.child1}></th>
                  <th className={classes.header} th scope="col">
                   ראש משפחה
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsFirstName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    שם משפחה
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsLastName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                   עיר
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsCity()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                    כתובת
                  </th>
                  <th className={classes.header} th scope="col">
                   טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                   נפשות בפועל
                  </th>
                  <th className={classes.header} th scope="col">
                  שפה
   
                  </th>
                  <th className={classes.header} th scope="col">
                  שם נהג
   
                  </th>
                  <th className={classes.header} th scope="col">
                   מסלול
                    <button
                       className={classes.button}
                      onClick={() => this.sortRowsNumber()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
               
                  {/* <th className={classes.header} th scope="col">
                    כניסה
  
                  </th>
                  <th className={classes.header} th scope="col">
                   קומה
  
                  </th>
                  <th className={classes.header} th scope="col">
                   מספר דירה
  
                  </th> */}

                  
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td className={classes.child1}> <input key={x.SelectDirection}
                          type="checkbox"
                          checked={x.selectDirection}
                          className="form-check-input"
                          id="rowcheck{x.selectDirection}"
                          onChange={(e) => this.onItemCheck(e, x)}
                        /></td>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.numberOfPerson}</td>
                      <td>{x.language}</td>
                      <td>{this.props.driversEvent.filter((y)=>y.startDate === this.state.selected && y.direction === x.direction && y.driver).map(((z)=>z.firstName+ " "))}</td>
                      <td  onDoubleClick={() => this.getSelectedDirection(x.id,x.startDate)}>{x.direction}</td>
                    </tr>
                  ))}
              </tbody>
           
            </table>
            
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={ this.rowsSearchConfig().length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
               <button
              className="btn btn-primary"
              
              onClick={() => this.getSelectedRows()}
            >
               מספר משפחות באירוע: { this.rowsSearchConfig().length}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    familyEvents: state.familyEvents,
   events: state.events,
   type:state.type,
    selectedDate:state.selectedDate,
    date_no_direction:state.date_no_direction,
    type_no_direction:state.type_no_direction,
    driversEvent: state.driversEvent,
  };
};

export default connect(mapStateToProps, { selectRow, updateRowFamilyEvent1,updateRowFamilyEvent, updatePhone,toggleActiveEventsFamily,selectEvent,toggleModal,deleteEventFamily ,selectEventNoDirection,toggleActiveDirectionType, getFriendEvents,getEvents,getFamilyEvents})(
  Deliver
);
