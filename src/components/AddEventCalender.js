import React from "react";
import { connect } from "react-redux";
import classes from"./ButtonAdd.module.css";
import { toggleModalCalender } from "../actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ButtonAdd2 = ({ show, header, toggleModalCalender, children }) => {
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
            onClick={toggleModalCalender}
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
    return { show: state.modalCalender };
  };

  export default connect(mapStateToProps, { toggleModalCalender })(ButtonAdd2);