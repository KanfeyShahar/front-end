import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import {
  toggleActiveEventsFamily,
  selectEvent,
  deleteEventFamily,
  updateRowEvents,
} from "../actions";
import * as IoIcons from "react-icons/io";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName, getIndexByPhone } from "../helper-functions";
import { selectRow, updateRowFamilyEvent, updatePhone,getCounter,getCounter1 ,updateCounter1,getInventory} from "../actions";
import { formatDateToString } from "../helper-functions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar1 from "../components/ActionBarCounterInventory";
import Pagination from "./pagination";
import "./switch.css";
import "./row.css";

class InventoryEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [...this.props.show_counter],
      selected: "",
      MasterCheckedDeliverd: false,
      term: "",
      type_center:"",
      type:"",
      currentPage: 1,
      postsPerPage: 20,
    };
  }
  componentDidMount(){
    this.props.getCounter()
    this.props.getCounter1()
    this.props.getInventory()
  }

  sortRowsFirstName() {
    this.setState({
      List: this.props.show_counter.sort((a, b) => {
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
      List: this.props.show_counter.sort((a, b) => {
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
      List: this.props.show_counter.sort((a, b) => {
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

  sortRowsDirection() {
    this.setState({
      List: this.props.show_counter.sort((a, b) => {
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
  sortRowNumber() {
    this.setState({
      List: this.props.show_counter.sort(
        (a, b) => a.direction - b.direction
      ),
    });
  }

 
  getSelectedRows() {
    this.setState({
      List: this.props.show_counter.filter((e) => e.startDate === this.state.selected),
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

  getSelectedRemarks = (x) => {
    const prodIdx = getIndexByName(this.props.show_counter, x);
    Swal.fire({
      title: "הוסף הערות",
      input: "text",
      inputValue: this.props.show_counter[prodIdx].remarks,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length < 0) {
          return "במידה וחסר, הקלד 0";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.show_counter[prodIdx].remarks !== result.value
      ) {
        this.props.updateCounter1({
          id: this.props.show_counter[prodIdx].id,
          id_number: this.props.show_counter[prodIdx].id_number,
          startDate:this.props.show_counter[prodIdx].startDate,
          code:this.props.show_counter[prodIdx].code,
          center:this.props.show_counter[prodIdx].center,
          nameProducts:this.props.show_counter[prodIdx].nameProducts,
          count:this.props.show_counter[prodIdx].count,
          count_actual:this.props.show_counter[prodIdx].count_actual,
          endDate:this.props.show_counter[prodIdx].endDate,
          remarks:result.value
        });
      }
    });
  };
  
  getSelectedCount = (x) => {
    const prodIdx = getIndexByName(this.props.show_counter, x);
    Swal.fire({
      title: "עדכן כמות בפועל",
      input: "number",
      inputValue: this.props.show_counter[prodIdx].count_actual,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "במידה וחסר, הקלד 0";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.show_counter[prodIdx].count_actual !== result.value
      ) {
        this.props.updateCounter1({
          id: this.props.show_counter[prodIdx].id,
          id_number: this.props.show_counter[prodIdx].id_number,
          startDate:this.props.show_counter[prodIdx].startDate,
          code:this.props.show_counter[prodIdx].code,
          center:this.props.show_counter[prodIdx].center,
          nameProducts:this.props.show_counter[prodIdx].nameProducts,
          count:this.props.show_counter[prodIdx].count,
          count_actual:result.value,
          endDate:this.props.show_counter[prodIdx].endDate,
          remarks:this.props.show_counter[prodIdx].remarks,
        });
      }
    });
  };
  
  

  rowsSearchConfig = () => {
    if (this.state.term === "" &&  this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length===0 ) {
      return this.props.show_counter.filter(
        (x) => x.startDate === this.state.selected 
      );
      
    }
    if(this.state.term === "" && this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length>0 ){
      return this.props.show_counter.filter(
        (x) => x.startDate === this.state.selected && this.state.type_center===x.center
      );
    }
      else {
        if(this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length>0){
          return this.props.show_counter.filter(
            (x) =>
            (x.startDate === this.state.selected && x.center === this.state.type_center)&&(    
              JSON.stringify(x.code).toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.nameProducts.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.center.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1)
          )
        }
        if(this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length===0){
          return this.props.show_counter.filter(
            (x) =>
            (x.startDate === this.state.selected)&&(    
              JSON.stringify(x.code).toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.nameProducts.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.endDate.toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1)
          )
        }
       
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
    const options1=  [
      { value:'הדר הכרמל', label: 'הדר הכרמל' },
      { value:'אור הכרמל', label: 'אור הכרמל' },
      { value:'בית ידידיה', label: 'בית ידידיה' },
    ]

    const options = this.props.counter_inventory
      .filter((x) => x.status === false)
      .map((x) => ({
        value: x.startDate,
        label: new Date(x.startDate).toLocaleDateString("en-GB"),
      }));
    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense6}>
          <h1>ספירה תקופתית</h1>
          <div />
          <div className={classes1.newExpense12}>
            <Select
              className="mt-4 col-md-6 col-offset-4"
              options={options}
              placeholder="בחר תאריך ספירה"
              onChange={(e) => {
                this.setState({ selected: e.value },() =>this.setState({type:this.props.counter_inventory.filter((x)=>x.startDate===e.value).map((y)=>y.type)}))
              }}
              value={options.filter((x) =>
                this.state.selected.includes(x.value)
              )}
              autoFocus={true}
            />
          </div>
          
          {this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length>0? 
          (<div className={classes1.newExpense12}>
          <Select className="mt-4 col-md-6 col-offset-4"
          options={options1}
          placeholder="בחר מרכז"
           onChange={ (e) => {
           this.setState({type_center: e.value})
      }}
   value={options1.filter(x=> this.state.type_center === x.value)}
   autoFocus={true}
   /> </div>):""}
        </div>

        <div className={classes.tablewrapper2}>
          <ActionBar1
            date={this.state.selected}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length===0 && <th className={classes.header} th scope="col">
                   מק"ט
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsFirstName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>}
                  {this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length>0 && <th className={classes.header} th scope="col">
                   מק"ט פנימי
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsFirstName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>}
                  <th className={classes.header} th scope="col">
                   שם מוצר
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsLastName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                 { this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length===0 &&<th className={classes.header} th scope="col">
                  תאריך תפוגה
                  </th>}
                  { this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length>0 &&<th className={classes.header} th scope="col">
                  מרכז
                  </th>}
                  <th className={classes.header} th scope="col">
                    כמות במלאי 
                  </th>
                  <th className={classes.header} th scope="col">
                    כמות בפועל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערות
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.rowsSearchConfig()
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((x) => (
                    <tr>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td>{x.code}</td>
                      <td>{x.nameProducts}</td>
                      {this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length===0 && <td>{new Date(x.endDate).toLocaleDateString("en-GB")}</td>}
                      {this.props.counter_inventory.filter((x)=>this.state.selected === x.startDate && x.type ==="ציוד").length>0 && <td>{x.center}</td>}
                      <td>{x.count}</td>
                      <td onDoubleClick={()=>this.getSelectedCount(x.id)}>{x.count_actual}</td>
                      <td onDoubleClick = {()=>this.getSelectedRemarks(x.id)}>{x.remarks}</td>
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
            <button
              className="btn btn-primary"
              onClick={() => this.getSelectedRows()}
            >
              מספר מוצרים: {this.rowsSearchConfig().length}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDate: state.selectedDate,
    counter_inventory:state.counter_inventory,
    show_counter:state.show_counter
  };
};

export default connect(mapStateToProps, {
  selectRow,
  updateRowFamilyEvent,
  updatePhone,
  toggleActiveEventsFamily,
  selectEvent,
  deleteEventFamily,
  updateRowEvents,
  getCounter,
  getCounter1,
  updateCounter1,
  getInventory
})(InventoryEvents);
