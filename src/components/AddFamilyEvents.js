import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addEvent, toggleModal, updateRow, addFamilyEvent} from "../actions";
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
  getIndexByNameFriend
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";
import classes1 from "./header.module.css";
import Pagination from "../pages/pagination";

class AddFamilyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
     familyListChoose: [...this.props.families],
     type:[...this.props.type],
      MasterChecked: false,
      MasterCheckedSelect: false,
      selected: false,
      stringF:"סל מזון",
      stringH:"ארוחה חמה",
      term: "",
      currentPage: 1,
      postsPerPage: 10,
    };
  }
  handleClick = (e) => {
    var array =this.props.familyEvents.filter((x)=>x.startDate===this.props.selectedDate).map(z=>z.serialNumber)
    var max=0;
    for(let i=0; i<this.props.familyEvents.filter((x)=>x.startDate===this.props.selectedDate).length;i++){
      if(array[i]>max){
        max=array[i]
      }
    }
    var Length = max+1
    if(this.state.stringF.localeCompare(this.props.type[0])===0){this.props.families
      .filter((x) => x.selectd && x.food)
      .map ( (x) => 
       this.props.addFamilyEvent({
        id: parseInt(10000*Math.random().toFixed(4)),
        serialNumber:Length++,
        number_id:x.id,
        startDate: this.props.selectedDate,
        firstName:x.firstName,
        lastName: x.lastName,
        city: x.city,
        address:x.address,
        phone: x.phone,
        numberOfPerson:x.numberOfPerson,
        language: x.language,
        basket_type:"",
        direction: "",
        details:"לא מוכן",
        isDeliverd: false,
        remarks: "",
        }), this.props.families.map((x)=>x.selectd =false,(x)=> x.select=false)
      );
      
    //  Swal.fire({
    //   icon: "success",
    //   text: "נוסף בהצלחה",
    //   confirmButtonText: "אישור",
    //   confirmButtonColor: "green",
    // });
   
    e.preventDefault();}
     else if (this.state.stringH.localeCompare(this.props.type[0])===0){
      this.props.families
      .filter((x) => x.selectd && x.hot)
      .map((x) =>
       this.props.addFamilyEvent({
        id:10000*Math.random().toFixed(4),
        number_id:x.id,
        startDate: this.props.selectedDate,
        firstName:x.firstName,
        lastName: x.lastName,
        city: x.city,
        address:x.address,
        phone: x.phone,
        numberOfPerson:x.numberOfPerson,
        language: x.language,
        basket_type:"",
        direction: "",
        details:"לא מוכן",
        isDeliverd: false,
        remarks: "",
        }), this.props.families.map((x)=>x.selectd =false,(x)=> x.select=false)
      );
      
    //  Swal.fire({
    //   icon: "success",
    //   text: "נוסף בהצלחה",
    //   confirmButtonText: "אישור",
    //   confirmButtonColor: "green",
    // });
    e.preventDefault();
     }
     
  };

  onMasterCheckSelect(e) {
    const check = this.props.familyEvents.filter((y)=>y.startDate === this.props.date )
    // Check/ UnCheck All Items
    if(this.state.stringF.localeCompare(this.props.type[0])===0 ){
      this.props.families.filter((y)=>y.food && y.status && getIndexByNameFriend(check, y.id)===-1).map((x) => (x.selectd = e.target.checked));
    }
    else if(this.state.stringH.localeCompare(this.props.type[0])===0){
      this.props.families.filter((y)=>y.hot && y.status && getIndexByNameFriend(check, y.id)===-1).map((x) => (x.selectd = e.target.checked));
    }
   
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      familyListChoose: this.props.families.filter(
        (e) => e.select
      ),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheckSelect(e, item) {
    this.props.families.map((x) => {
      if (x.id === item.id ) {
        x.selectd = e.target.checked;
        const prodIdx = getIndexByName(this.props.families, item.id);
        // this.props.updateRow({
        //   select: this.props.families[prodIdx].select,
        // });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.families.length;
    const totalCheckedItems = this.props.families.filter(
      (e) => e.selectd
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

      familyListChoose: this.props.families.filter((e) => e.select),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      familyListChoose: this.props.families.filter((e) => e.select),
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
  
  


  validateFormBtn = () => {
    if (this.props.families.filter((e) => e.selectd).length > 0) {
      return (
        <button
          id="add-product-btn"
          onClick={ (e) => {
            return this.handleClick(e);
            
          }}
          onMouseUp={async () => {
            return this.props.toggleModal();
          }}
          className="btn btn-primary"
        >
          אישור
        </button>
      );
    }
    return (
      <button className="btn btn-secondary" disabled>
        אישור
      </button>
    );
  };
  
  rowsSearchConfig = () => {
    const check = this.props.familyEvents.filter((y)=>y.startDate === this.props.date )
    if (this.state.term === "" && this.state.stringF.localeCompare(this.props.type[0])===0 ) {
      return this.props.families.filter((x)=>x.food && x.status && getIndexByNameFriend(check, x.id)===-1)
    }  if (this.state.term === "" && this.state.stringH.localeCompare(this.props.type[0])===0 ) {
      return this.props.families.filter((x)=>x.hot && x.status && getIndexByNameFriend(check, x.id)===-1)
    }
    else {
      return this.props.families.filter(
        (x) =>
          x.lastName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.city.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.address.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.language.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 ||
          x.phone.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1
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
      <form>
        <div className={classes.direction}>
          <div className={classes1.tablewrapper}  >
          <div className={classes.search}>
          <input
                id="term"
                type="text"
                className="form-control"
                placeholder="חיפוש"
                onChange={(e) => {
                  this.setState({ term: e.target.value });
                }}
              />
              </div>
            {this.showSearchTerm()}
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes1.header} th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheckSelect(e)}
                    />
                  </th>
                  
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
                  {this.state.stringF.localeCompare(this.props.type[0])===0 &&<th  className={classes1.header} th scope="col">
                   סל מזון
                   
                  </th>}
                  {this.state.stringH.localeCompare(this.props.type[0])===0 &&<th  className={classes1.header} th scope="col">
                   ארוחה חמה
                   
                  </th>}
                
                 
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td>
                        <input key={x.Selectd}
                          type="checkbox"
                          checked={x.selectd}
                          className="form-check-input"
                          id="rowcheck{x.id}"
                          onChange={(e) => this.onItemCheckSelect(e, x)}
                        />
                      </td>
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
                      {(x.status && <td><input class="form-check-input" type="checkbox" id="x.status" value="option3" checked disabled></input></td> )||(!x.status && <td><input class="form-check-input" type="checkbox" id="x.status" value="option3" disabled></input></td> )}
                      {this.state.stringF.localeCompare(this.props.type[0])===0 &&  (x.food && <td><input class="form-check-input" type="checkbox" id="x.food" value="option3" checked disabled></input></td> )}
                      {this.state.stringH.localeCompare(this.props.type[0])===0 &&   (x.hot && <td><input class="form-check-input" type="checkbox" id="x.hot" value="option3" checked disabled></input></td>  )}
                      <td>{x.type}</td>
              
                     
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={this.rowsSearchConfig().length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
            מספר משפחות שנבחרו: {this.rowsSearchConfig().filter((e) => e.selectd).length}
          </div>
          {this.validateFormBtn()}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    driversEvent: state.driversEvent,
    families: state.families,
    type:state.type,
    familyEvents:state.familyEvents,
    
    selectedDate: state.selectedDate,
  };
};

export default connect(mapStateToProps, {
  addEvent,
  toggleModal,
  updateRow,
 addFamilyEvent,
})(AddFamilyEvents);
