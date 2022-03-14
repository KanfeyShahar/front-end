import React from "react";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import { toggleModal,toggleModalRemove,toggleModalHelp } from "../actions";
import AddMovements from "./AddMovements";
import RemoveMovements from "./removeMovements";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import ButtonRemove from "./ButtonRemove";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpMovements"
import * as BiIcons from "react-icons/bi";

const ActionBar = ({ modal,modalV, toggleModal,toggleModalRemove, getTerm ,toggleModalHelp}) => {
  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
       <div class="btn-group" role="group" aria-label="First group">
       <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
      <ButtonRemove header="החסרת מוצר מהמלאי ">
        <RemoveMovements action="add" />
      </ButtonRemove>
      <ButtonAdd header="הוספת מוצר למלאי ">
        <AddMovements action="add" />
      </ButtonAdd>
      
      <button className={classes.button}>
        <IoIcons.IoMdAddCircle onClick={toggleModal} />
      </button>
    
      <button className={classes.button}>
        <IoIcons.IoMdRemoveCircle onClick={toggleModalRemove} />
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
  return { modalI: state.modalI,
    modal: state.modal };
};
export default connect(mapStateToProps, { toggleModal,toggleModalRemove,toggleModalHelp })(ActionBar);
