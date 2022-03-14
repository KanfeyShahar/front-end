import React, { useRef,Component  } from "react";
import { connect } from "react-redux";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import ButtonAdd from "./ButtonAdd";

import { toggleModal,toggleModalDocumentEvent,toggleModalHelp } from "../actions";
import { PDFViewer } from '@react-pdf/renderer';
import AddCounter from "./AddCounter";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import classes from "./button.module.css";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpCounter"


const ActionBar = ({ modal, toggleModal, getTerm,toggleModalHelp}) => {;
 
  return (
   
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
  
    <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
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
    documentEvent:state.documentEvent,
    familyEvents: state.familyEvents, };
};
export default connect(mapStateToProps, { toggleModal,toggleModalDocumentEvent,toggleModalHelp })(ActionBar);

