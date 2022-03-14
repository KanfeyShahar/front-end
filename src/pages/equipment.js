import React, { Component } from "react";
import Select from 'react-select'
import { connect } from "react-redux";
import { toggleActiveCars,getEquipment} from "../actions";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import { getIndexByName } from "../helper-functions";
import {updateEquipment } from "../actions";
import classes from "./header.module.css";
import classes1 from "./family.module.css";
import ActionBar from "../components/ActionBaEquipment";
import Pagination from "./pagination";
import './switch.css'
import './row.css'

class Equipments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipmentsList: [...this.props.equipments],
      MasterChecked: false,
      term: "",
      currentPage: 1,
      postsPerPage: 20,
      type_center:"",
    };
  }

  componentDidMount(){
    this.props.getEquipment()
  }

  

  sortRowsName() {
    this.setState({
      equipmentsList: this.props.equipments.sort((a, b) => {
        let nameA = a.name_equipment.toLowerCase();
        let nameB = b.name_equipment.toLowerCase();
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
  sortRowsCount() {
    this.setState({
      equipmentsList: this.props.equipments.sort(
        (a, b) => a.count - b.count
      ),
    });
  }
 
  
  getSelectedName = (ChangeName) => {
    const prodIdx = getIndexByName(this.props.equipments, ChangeName.id);
    Swal.fire({
      title: "עדכן שם מוצר",
      input: "text",
      inputValue: this.props.equipments[prodIdx].name_equipment,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד שם ציוד   ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.equipments[prodIdx].name_equipment !== result.value
      ) {
        this.props.updateEquipment({
        id: this.props.equipments[prodIdx].id,
        name_equipment: result.value,
         center:this.props.equipments[prodIdx].center,
         count:this.props.equipments[prodIdx].count,
         remark:this.props.equipments[prodIdx].remark,
        });
      }
    });
  };

  getSelectedRemark = (ChangeName) => {
    const prodIdx = getIndexByName(this.props.equipments, ChangeName.id);
    Swal.fire({
      title: "עדכן הערות",
      input: "text",
      inputValue: this.props.equipments[prodIdx].remark,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
    }).then((result) => {
      if (
        result.value &&
        this.props.equipments[prodIdx].remark !== result.value
      ) {
        this.props.updateEquipment({
          id: this.props.equipments[prodIdx].id,
          name_equipment: this.props.equipments[prodIdx].name_equipment,
         center:this.props.equipments[prodIdx].center,
         count:this.props.equipments[prodIdx].count,
         remark:result.value,
        });
      }
    });
  };



  getSelectedCount = (ChangeName) => {
    const prodIdx = getIndexByName(this.props.equipments, ChangeName.id);
    Swal.fire({
      title: "עדכן כמות",
      input: "number",
      inputValue: this.props.equipments[prodIdx].count,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0) {
          return "חייב להקליד כמות, במידה והכמות הינה 0 יש להקליד 0  ";
        }
      },
    }).then((result) => {
      if (
        result.value &&
        this.props.equipments[prodIdx].count !== result.value
      ) {
        this.props.updateEquipment({
          id: this.props.equipments[prodIdx].id,
        name_equipment: this.props.equipments[prodIdx].name_equipment,
         center:this.props.equipments[prodIdx].center,
         count:result.value,
         remark:this.props.equipments[prodIdx].remark,
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
    if (this.state.term === "" && this.state.type_center ==="כל המרכזים") {
      return this.props.equipments
    }
    if (this.state.term === "" ) {
      return this.props.equipments.filter((x)=>x.center === this.state.type_center)
    }
    
    else {
      return this.props.equipments.filter(
        (x) =>
        ((x)=>x.center === this.state.type_center) &&(
          x.name_equipment.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1 ||
          x.remark.toLowerCase().indexOf(this.state.term.toLowerCase()) !==
            -1)
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
    const options1=  [
      { value:'הדר הכרמל', label: 'הדר הכרמל' },
      { value:'אור הכרמל', label: 'אור הכרמל' },
      { value:'בית ידידיה', label: 'בית ידידיה' },
      { value:'כל המרכזים', label: 'כל המרכזים' },
    ]
    return (
      <div style={{ maxWidth: "100%" }}>
        <div className={classes1.newexpense6}>
        <h1>ניהול ציוד</h1>
          <div />
          <div className={classes1.newExpense12}>
          <Select className="mt-4 col-md-6 col-offset-4"
         options={options1}
         placeholder="בחר מרכז"
          onChange={ (e) => {
          this.setState({type_center: e.value})
     }}
  value={options1.filter(x=> this.state.type_center === x.value)}
  autoFocus={true}
  /> 
        </div>
</div>
        <div className={classes.tablewrapper}>
          <ActionBar equipment={this.rowsSearchConfig()}
            getTerm={(term) => this.forceUpdate(this.setState({ term: term }))}
          />
          {this.showSearchTerm()}
          <div className={classes.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col"> מק"ט פנימי</th>
                  <th className={classes.header} th scope="col">
                  שם המוצר
                    <button
                      className={classes.button}
                      onClick={() => this.sortRowsName()}
                    >
                      <FontAwesomeIcon icon={faSort} />
                    </button>
                  </th>
                  <th className={classes.header} th scope="col">
                  מרכז
                  </th>
                  <th className={classes.header} th scope="col">
                  כמות
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
                      <td>{x.id}</td>
                      {/* <td><NotAvailiableProductButton PhonePerson={x.id}/>{x.id}</td> */}
                      <td onDoubleClick={() => this.getSelectedName(x)}>
                        {x.name_equipment}
                      </td>
                      <td >
                        {x.center}
                      </td>
                      <td onDoubleClick={() => this.getSelectedCount(x)}>
                        {x.count}
                      </td>
                      <td onDoubleClick={() => this.getSelectedRemark(x)}>
                        {x.remark}
                      </td>
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    equipments:state.equipments,
    activeCars:state.activeCars,
  };
};

export default connect(mapStateToProps, {  updateEquipment,getEquipment })(
  Equipments
);
