import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addEvent, toggleModal, updateRowV, addDriverEvent } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import ActionBar from "./ActionBarProductList";
import {
  saveEventsToLocal,
  getIndexByNameFriend,
  isValidName,
  isValidNumber,
  isValidPhone,
  getIndexByNameInventory,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";
import classes1 from "./header.module.css";
import volunteers from "../pages/volunteers";
import Pagination from "../pages/pagination";

class AddDriverEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volunteersListChoose: [...this.props.volunteers],
      MasterChecked: false,
      MasterCheckedSelect: false,
      selected: false,
      term: "",
      currentPage: 1,
      postsPerPage: 13,
    };
  }
  handleClick = (e) => {
    var array =this.props.driversEvent.filter((x)=>x.startDate===this.props.selectedDate).map(z=>z.serialNumber)
    var max=0;
    for(let i=0; i<this.props.driversEvent.filter((x)=>x.startDate===this.props.selectedDate).length;i++){
      if(array[i]>max){
        max=array[i]
      }
    }
    var Length = max+1
    this.props.volunteers
      .filter((x) => x.selectd)
      .map((x) =>
        this.props.addDriverEvent({
          id: parseInt(10000*Math.random().toFixed(4)),
          serialNumber:Length++,
          number_id: x.id,
          startDate: this.props.selectedDate,
          lastName: x.lastName,
          firstName: x.firstName,
          phone: x.phone,
          role_event: x.role_event,
          driver: x.driver,
          direction: "",
          remarks: "",
          role_event:"",
        }),this.props.volunteers.map((x)=>x.selectd=false))
   

    // Swal.fire({
    //   icon: "success",
    //   text: "נוסף בהצלחה",
    //   confirmButtonText: "אישור",
    //   confirmButtonColor: "green",
    // });
    e.preventDefault();
  };

  onMasterCheckSelect(e) {
    const check = this.props.driversEvent.filter((y)=>y.startDate === this.props.date )
    // Check/ UnCheck All Items
    this.props.volunteers.filter((y)=>getIndexByNameFriend(check, y.id)===-1).map((x) => (x.selectd = e.target.checked));
    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      volunteersListChoose: this.props.volunteers.filter(
        (e) => e.select
      ),
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheckSelect(e, item) {
    this.props.volunteers.map((x) => {
      if (x.id === item.id ) {
        x.selectd = e.target.checked;
        // this.props.updateRow({
        //   select: this.props.families[prodIdx].select,
        // });
      }
      return x;
    });

    //To Control Master Checkbox State
    const totalItems = this.props.volunteers.length;
    const totalCheckedItems = this.props.volunteers.filter(
      (e) => e.selectd
    ).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,

      volunteersListChoose: this.props.volunteers.filter((e) => e.select),
    });
  }
  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      volunteersListChoose: this.props.volunteers.filter((e) => e.select),
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
    const check = this.props.driversEvent.filter((y)=>y.startDate === this.props.date )
    console.warn(this.props.date)
    console.warn(this.props.driversEvent)
    console.warn(check)
    console.warn("volunteers filter===>")
    console.warn(this.props.volunteers.filter((x)=>getIndexByNameFriend(check, x.id)===-1 ))
    if (this.state.term === "") {
      return this.props.volunteers.filter((x)=>getIndexByNameFriend(check, x.id)===-1 && x.status )
    } else {
      return this.props.volunteers.filter(
        (x) =>
        getIndexByNameFriend(check, x.id)===-1  &&(
          x.lastName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.firstName.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.center.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||x.type.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.phone.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1 )
      );
    }
  };

  validateFormBtn = () => {
    if (this.props.volunteers.filter((e) => e.selectd).length > 0) {
      return (
        <button
          id="add-product-btn"
          onClick={(e) => {
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
          <div className={classes1.tablewrapper}>
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
                    מרכז
                  </th>
                  <th className={classes1.header} th scope="col">
                    תפקיד
                  </th>
                  <th className={classes1.header} th scope="col">
                    שפות
                  </th>
                  <th className={classes1.header} th scope="col">
                    {/* <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}
                    /> */}
                    פעיל
                  </th>
                  <th className={classes1.header} th scope="col">
                    סוג חברות
                  </th>
                  <th className={classes1.header} th scope="col">
                    נהג
                  </th>
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
                        {console.log(this.props.volunteers)}
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
                        {x.center}
                      </td>
                      <td onDoubleClick={() => this.getSelectedRole(x.id)}>
                        {x.role}
                      </td>
                      <td onDoubleClick={() => this.getSelectedLanguage(x.id)}>
                        {x.language}
                      </td>

                      {(x.status && <td><input class="form-check-input" type="checkbox" id="x.status" value="option3" checked disabled></input></td> )||(!x.status && <td><input class="form-check-input" type="checkbox" id="x.status" value="option3" disabled></input></td> )}
                      <td>{x.type}</td>
                      {(JSON.stringify(x.driver)=="true") && (<td><input class="form-check-input" type="checkbox" id="aaa" value="true" checked disabled></input></td>)}
                      { (JSON.stringify(x.driver)!=="true") && (<td><input class="form-check-input"  type="checkbox" disabled></input></td>) }
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
            מספר רשומות שנבחרו: {this.rowsSearchConfig().filter((e) => e.selectd).length}
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
    volunteers: state.volunteers,
    families: state.families,
    volunteers: state.volunteers,
    selectedDate: state.selectedDate,
  };
};

export default connect(mapStateToProps, {
  addEvent,
  toggleModal,
  updateRowV,
  addDriverEvent,
})(AddDriverEvents);
