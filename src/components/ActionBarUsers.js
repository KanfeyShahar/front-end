import React from "react";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import * as BiIcons from "react-icons/bi";
import { toggleModal,toggleModalHelp } from "../actions";
import AddUsers from "./addUsers";
import * as IoIcons from "react-icons/io";
import classes from "./button.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpUsers"


const ActionBar = ({ modal, toggleModal, getTerm,toggleModalHelp }) => {
  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group" role="group" aria-label="First group">
        <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
      <ButtonAdd header="הוספת משתמש">
        <AddUsers action="add" />
      </ButtonAdd>
      <button className={classes.button}>
        <IoIcons.IoMdAddCircle onClick={toggleModal} />
      </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getTerm(document.getElementById("search-term").value);
        }}
      >
        <div className="input-group">
          <div className="input-group-prepend"></div>
          <input id="search-term" type="text" className="form-control" />
          <div className="input-group-append">
            <button type="submit" className="btn btn-info">
              חיפוש
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { modal: state.modal };
};
export default connect(mapStateToProps, { toggleModal,toggleModalHelp })(ActionBar);
