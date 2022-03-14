import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addEvent, toggleModal, updateRow, addFamilyEvent, getFamilyEvents,getFamily,getEvents} from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import ActionBar from "./ActionBarProductList";
import {
  saveEventsToLocal,
  getIndexByName,
  isValidName,
  isValidNumber,
  isValidPhone,
  getIndexByNameInventory,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";
import classes1 from "./header.module.css";
import Pagination from "../pages/pagination";

class DirectionRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
     familyListChoose: [...this.props.familyEvents],
     type:[...this.props.type],
      MasterChecked: false,
      MasterCheckedSelect: false,
      selected: false,
      stringF:"סל מזון",
      stringH:"ארוחה חמה",
      term: "",
      currentPage: 1,
      postsPerPage: 20,
    };
  }
  

   
  componentDidMount() {
    this.props.getFamily();
    this.props.getEvents();
    this.props.getFamilyEvents();
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
      
    if (this.state.term === "" ) {
      return this.props.familyEvents.filter((x)=>x.startDate===this.props.date_no_direction && x.direction === this.props.type_no_direction)

    }
    else {
      return this.props.familyEvents.filter((x)=>x.startDate===this.props.date_no_direction && x.direction === this.props.type_no_direction)
      
    }
  };


  arrangeAddresses = () => {
    let starting_point = {
      lat: 32.807080,
      long: 34.985580
    }

    let familyEventFiltered = this.props.familyEvents.filter((x)=>x.startDate===this.props.date_no_direction && x.direction === this.props.type_no_direction)
    
    if (familyEventFiltered.length === 0 ) {
      return familyEventFiltered
    }

    let familyEventWithCords = familyEventFiltered.map((t)=>{
      let family_info = this.props.families.filter((y)=>y.id === t.number_id)
      console.log(family_info)
      return {
        ...t,
        latitude: parseFloat(family_info[0]?.latitude),
        longitude: parseFloat(family_info[0]?.longitude)
      }


    })

    let familySorted = []

    while (familyEventWithCords.length>0) {
      let minimalLength = 9999999999999
      let minimalLengthFamily = {}

      familyEventWithCords.forEach((e) => {
        let len = (starting_point.lat- e.latitude)**2 + (starting_point.long - e.longitude)**2
        if (len<minimalLength) {
          minimalLength = len
          minimalLengthFamily = e
        }
      })

      // configuring the starting point to be the next point in the supply chain- the minimal length family
      starting_point = {
        lat: minimalLengthFamily.latitude,
        long: minimalLengthFamily.longitude
      }

      console.log(starting_point)

      familySorted = [...familySorted, minimalLengthFamily]
      familyEventWithCords = familyEventWithCords.filter((e) => e.number_id!==minimalLengthFamily.number_id)

    }

    console.log(familySorted)

    return familySorted

  }

  


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
    return (
      <form>
        <div className={classes.direction}>
          <div className={classes1.tablewrapper}  >
            {this.showSearchTerm()}
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {/* <th className={classes1.header} th scope="col">
                 מספר במסלול
                  </th>     */}
                  <th className={classes1.header} th scope="col">
                    פרטי
                  </th>
                  <th className={classes1.header} th scope="col">
                    משפחה
                  </th>
                  <th className={classes1.header} th scope="col">
                    טלפון
                  </th>
                  <th className={classes1.header} th scope="col">
                   עיר
                  </th>
                  <th className={classes1.header} th scope="col">
                   כתובת
                  </th>
                  <th className={classes1.header} th scope="col">
                    שפות
                  </th>
                  <th className={classes1.header} th scope="col">
                    פעילה
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.arrangeAddresses()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      {/* <td>
                       {parseInt(Math.random()+1)}
                      </td> */}
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
                        {x.city}
                      </td>
                      <td onDoubleClick={() => this.getSelectedRole(x.id)}>
                        {x.address}
                      </td>
                      <td onDoubleClick={() => this.getSelectedLanguage(x.id)}>
                        {x.language}
                      </td>
                      <td key={x.id} className={x.status ? "status" : ""} className={((x.status) && classes1.show) || ((!x.status) && classes1.showHidden)}  >
                      <input class="form-check-input" type="checkbox" id="x.status" value="option3" checked disabled></input>
                        </td>
                      <td>{x.type}</td>  
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={this.arrangeAddresses().length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
            מספר משפחות במסלול: {this.arrangeAddresses().length}
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    familyEvents: state.familyEvents,
    families: state.families,
    type:state.type,
    date_no_direction:state.date_no_direction,
    type_no_direction:state.type_no_direction,
    selectedDate: state.selectedDate,
  };
};

export default connect(mapStateToProps, {
  addEvent,
  toggleModal,
  updateRow,
 addFamilyEvent,
 getFamilyEvents,getFamily,getEvents
})(DirectionRoute);
