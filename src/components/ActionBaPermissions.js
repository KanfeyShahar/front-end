import React from "react";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import { toggleModal, toggleModalHelp } from "../actions";
import AddPermissions from "./addPermissions";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpPermissions"

const ActionBar = ({ modal, toggleModal, toggleModalHelp,getTerm ,modalHelp}) => {
  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
     <div class="btn-group" role="group" aria-label="First group">
     <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
      <ButtonAdd header="הוספת הרשאה">
        <AddPermissions action="add" />
      </ButtonAdd>
      <button className={classes.button}>
        <IoIcons.IoMdAddCircle onClick={toggleModal} />
      </button>
      </div>
    </div>
   
  );
};
const mapStateToProps = (state) => {
  return { modal: state.modal,
    modalHelp:state.modalHelp };
};
export default connect(mapStateToProps, { toggleModal,toggleModalHelp })(ActionBar);
