import React from "react";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import { toggleModal } from "../actions";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";

const ActionBar = ({ modal, toggleModal, getTerm }) => {
  return (
    <div className="btn-toolbar mt-3 mb-3" role="toolbar">
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
            <button type="submit" className="btn btn-info"   >
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
export default connect(mapStateToProps, { toggleModal })(ActionBar);
