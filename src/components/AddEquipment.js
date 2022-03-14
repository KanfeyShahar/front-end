import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addEquipments, toggleModal } from "../actions";
import {
  saveEquipmentsToLocal,
  getElementsValue,
  isValidName,
  isValidNumber,
  isValidPhone,
} from "../helper-functions";
import Swal from "sweetalert2";
import classes from "./AddFamily.module.css";

class AddEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_equipment: "",
      center: "",
      count: "",
      remark: "",
    };
  }
  handleClick = () => {
    if (
      this.props.equipments.filter(
        (p) =>
          p.name_equipment === getElementsValue("name_equipment") &&
          p.center === this.state.center
      ).length === 0
    ) {

      const newEquipment = { 
        id:10000*Math.random().toFixed(4),
        name_equipment:getElementsValue("name_equipment"),
        center: this.state.center,
        count:parseInt(getElementsValue("count")),
        remark:this.state.remark,}
      this.props.addEquipments(newEquipment);
      // Swal.fire({
      //   icon: "success",
      //   text: "נוסף בהצלחה",
      //   confirmButtonText: "אישור",
      //   confirmButtonColor: "green",
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: "ציוד זה קיים במרכז, נא לעדכן את הכמות בטבלה",
        confirmButtonText: "אישור",
        confirmButtonColor: "red",
      });
    }
    this.setState({
      name_equipment: "",
      center: "",
      count: "",
      remark: "",
    });
  };
  validatename_equipment = (name_equipment) => {
    if (isValidName(name_equipment)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        שדה חובה
      </small>
    );
  };
  validatecount = (count) => {
    if (isValidNumber(count)) {
      return;
    }
    return (
      <small id="emailHelp" className="form-text">
        שדה חובה
      </small>
    );
  };

  validateFormBtn = (name_equipment, count) => {
    if (
      isValidName(name_equipment) &&
      isValidName(count) &&
      (this.state.center.includes("הדר הכרמל") ||this.state.center.includes("אור הכרמל") || this.state.center.includes("בית ידידיה")  )
    ) {
      return (
        <button
          id="add-product-btn"
          onClick={() => {
            return this.handleClick();
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
    const options2 = [
      { value: "בית ידידיה", label: "בית ידידיה" },
      { value: "הדר הכרמל", label: "הדר הכרמל" },
      { value: "אור הכרמל", label: "אור הכרמל" },
    ];

    const { language } = this.state;
    return (
      <form>
        <div>
          <div class="form-group">
            <labal className={classes.newexpense}></labal>
            <div className={classes.row}>
              <div className={classes.col11}>
                <label>שם ציוד</label>
                <div className="col">
                  <input
                    id="name_equipment"
                    type="text"
                    className="form-control"
                    placeholder="****"
                    onChange={(e) => {
                      this.setState({ name_equipment: e.target.value });
                    }}
                    value={this.state.name_equipment}
                  />
                  {this.validatename_equipment(this.state.name_equipment)}
                </div>
              </div>
              <div className={classes.col4}>
                <div className="col">
                  <label>כמות</label>
                  <input
                    id="count"
                    type="number"
                    className="form-control"
                    placeholder="****"
                    onChange={(e) => {
                      this.setState({count: e.target.value });
                    }}
                    value={this.state.count}
                  />
                  {this.validatecount(this.state.count)}
                </div>
              </div>
              <div className={classes.col10}>
                <div className="col">
                  <label>מרכז</label>
                  <Select
                    id="center"
                    options={options2}
                    onChange={(e) => {
                      this.setState({ center: e.value });
                    }}
                    placeholder="שדה חובה-מרכז"
                    isSearchable
                    autoFocus
                    value={options2.filter((x) =>
                      this.state.center.includes(x.value)
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label className={classes.newexpense}></label>
            <div className={classes.row10}>
                <labal>הערות</labal>
                <div className="col">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    placeholder=""
                    onChange={(e) => {
                      this.setState({ remark: e.target.value });
                    }}
                    value={this.state.remark}
                  ></textarea>
            </div>
          </div>
</div>
          <div></div>

          {this.validateFormBtn(
            this.state.name_equipment,
            this.state.count
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  saveEquipmentsToLocal(state.equipments);
  return {
    modal: state.modal,
    equipments: state.equipments,
  };
};

export default connect(mapStateToProps, {
  addEquipments,
  toggleModal,
})(AddEquipment);
