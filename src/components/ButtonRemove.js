import React from "react";
import { connect } from "react-redux";
import classes from"./ButtonAdd.module.css";
import { toggleModalRemove } from "../actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ButtonRemove = ({ show, header, toggleModalRemove, children }) => {
  return (

    <div className={((show) && classes.mod) || ((!show) && classes.modhidden)}>
      <div className={classes.modcontentwrapper}>
        <div className={classes.modheader}>
          <h2>{header}</h2>
          <button
            style={{
              border: "none",
              borderRadius: "50%",
              fontSize: "1.5rem",
              backgroundColor: "transparent",
              color: "white",
        
            }}
            onClick={toggleModalRemove}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        < div>{children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
    return { show: state.modalI };
  };

  export default connect(mapStateToProps, { toggleModalRemove })(ButtonRemove);