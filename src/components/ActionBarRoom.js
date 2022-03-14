import React from "react";
import ButtonAdd2 from "./AddEventCalender";
import { connect } from "react-redux";
import {toggleModalCalender, toggleModalHelp } from "../actions";
import CalenderAddNew from "./calenderAddNew";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpHall"

const ActionBar = ({ modalCalender, toggleModalCalender, toggleModalHelp,getTerm ,modalHelp}) => {
  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
     <div class="btn-group" role="group" aria-label="First group">
     <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonAdd2 header="הוספת הזמנה חדשה">
        <CalenderAddNew action="add" />
      </ButtonAdd2>
      <button className={classes.button}>
        <IoIcons.IoMdAddCircle onClick={toggleModalCalender} />
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
      </div>
    </div>
   
  );
};
const mapStateToProps = (state) => {
  return { modalCalender: state.modalCalender,
    modalHelp:state.modalHelp };
};
export default connect(mapStateToProps, { toggleModalCalender,toggleModalHelp })(ActionBar);
