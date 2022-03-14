import React, { useRef, Component  } from "react";
import ButtonAdd from "./ButtonAddDriverEvents";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import { toggleModal,toggleModalHelp } from "../actions";
import AddFamilyEvents from "./AddFamilyEvents";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpFamilyEvents"


const ActionBar1 = ({ modal, toggleModal, getTerm,toggleModalHelp, family,selected,date}) => {



  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
    <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
      <ButtonAdd header="בחר משפחות לאירוע">
        <AddFamilyEvents date={date} />
      </ButtonAdd>
      <button className={classes.button}>
        <IoIcons.IoMdAddCircle onClick={toggleModal}  />
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
  return { modal: state.modal,
    familyEvents: state.familyEvents };
};
export default connect(mapStateToProps, { toggleModal,toggleModalHelp })(ActionBar1);
