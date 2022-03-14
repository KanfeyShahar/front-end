import React, { useRef, Component  } from "react";
import { useReactToPrint } from "react-to-print";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import { toggleModal,toggleModalHelp } from "../actions";
import AddVolunteer from "./AddVolunteer";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpFriends"
import * as BiIcons from "react-icons/bi";

class ComponentToPrint extends Component  {
  constructor(props) {
    super(props);
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
        
        {"   "}
        </div>
        <br/>
        <br/>
        <div style={{color:"black"}}>
        <h1>דוח חברי עמותה פעילים</h1>
        </div>
  <div style={{ maxWidth: "100%" }}>
 
        <div className={classes1.tablewrapper}>
          <div className={classes1.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                   תעודת זהות
                  </th>
                  <th className={classes.header} th scope="col">
                    תאריך לידה
                  </th>
                  <th className={classes.header} th scope="col">
                  פרטי
                  </th>
                  <th className={classes.header} th scope="col">
                   משפחה
                  </th>
                  <th className={classes.header} th scope="col">
                   טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                 סוג חברות
                  </th>
                  <th className={classes.header} th scope="col">
                 מרכז
                  </th>
                  <th className={classes.header} th scope="col">
                   תפקיד
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.friend.map((x)=>(
                    <tr>
                      <td>{x.id}</td>
                      <td>{new Date(x.date_birthday).toLocaleDateString("en-GB")}</td>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.phone}</td>
                      <td>{x.type}</td>
                      <td>{x.center}</td>
                      <td>{x.role}</td>
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

const ActionBar = ({ modal, toggleModal,toggleModalHelp, getTerm,friend }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
    <div style={{ display: "none" }}>
       <ComponentToPrint ref={componentRef} friend={friend} />
       </div>
       <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
       <button className={classes.button} onClick={handlePrint}>  <FaIcons.FaFileDownload /></button>
      <ButtonAdd header="הוספת חבר עמותה">
        <AddVolunteer action="add" />
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
