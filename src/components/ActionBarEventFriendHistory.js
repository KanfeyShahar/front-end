import React, { useRef, Component  } from "react";
import ButtonAdd from "./ButtonAddDriverEvents";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import { toggleModal,toggleModalHelp } from "../actions";
import AddDriverEvents from "./AddDriverEvents";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import classes from "./button.module.css";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpFriendsEvents"


class ComponentToPrint extends Component  {
  constructor(props) {
    super(props);
    this.state={
      friendEvents:[...this.props.friend],
    };
  }
  render() {
    return (
      <div className={classes1.container}>
        <div className={classes1.header}>
          <p >
      כנפי שחר
          </p>
          </div>
      <div className={classes1.h2}>
        {new Date().toLocaleString("en-GB")}   
        {"  "}
        </div>
        <br/>
        <br/>
        <div style={{color:"black"}}>
        <h1>דוח חברי עמותה באירוע</h1>
        <h2>תאריך חלוקה {new Date(this.props.selected).toLocaleDateString("en-GB")} </h2>
        <br/>
        <br/>
        <h2>מספר חברים באירוע: {this.props.friend.length}</h2>
        </div>
  <div style={{ maxWidth: "100%" }}>
 
        <div className={classes1.tablewrapper}>
          <div className={classes1.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                  משפחה
                  </th>
                  <th className={classes.header} th scope="col">
                   פרטי
                  </th>
                  <th className={classes.header} th scope="col">
                  טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                   תפקיד
                  </th>
                  <th className={classes.header} th scope="col">
                   נהג
                  </th>
                  <th className={classes.header} th scope="col">
                  מסלול
                  </th>
                  <th className={classes.header} th scope="col">
                הערות
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.friend.map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.phone}</td>
                      <td>{x.role_event}</td>
                      {(x.driver && <td><input class="form-check-input" type="checkbox" id="x.driver" value="option3" checked disabled></input></td> )||(!x.driver && <td><input class="form-check-input" type="checkbox" id="x.driver" value="option3" disabled></input></td> )}
                      <td>{x.direction}</td>
                      <td>{x.remarks}</td>
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   </div>
  
    
    );
  }
}

const ActionBar2 = ({ modal, toggleModal, getTerm,friend, selected, type,date,toggleModalHelp }) => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
          <div style={{ display: "none" }}>
       <ComponentToPrint ref={componentRef} friend={friend} selected={selected} />
       </div>
       <button className={classes.button} onClick={handlePrint}>  <FaIcons.FaFileDownload /></button>
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
export default connect(mapStateToProps, { toggleModal,toggleModalHelp })(ActionBar2);
