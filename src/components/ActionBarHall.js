import React, { useRef, Component  } from "react";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import { toggleModal,toggleModalHelp } from "../actions";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HekpHall1"


class ComponentToPrint extends Component  {
  constructor(props) {
    super(props);
    this.state={
      familyEvents:[...this.props.hall],
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
        {new Date().toLocaleDateString("en-GB")}   
        
        {new Date().toLocaleTimeString("en-GB")}
        </div>
        <br/>
        <br/>
        <div style={{color:"black"}}>
        <h1>דוח כנסים וחוגים באולם בית ידידיה</h1>
        <h2>תאריך התחלה {new Date(this.props.first).toLocaleDateString("en-GB")}</h2>
        <br/>
        <h2> תאריך סיום {new Date(this.props.end).toLocaleDateString("en-GB")} </h2>
        <br/>
        </div>
  <div style={{ maxWidth: "100%" }}>
 
        <div className={classes1.tablewrapper}>
          <div className={classes1.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                   איש קשר
                  </th>
                  <th className={classes.header} th scope="col">
                   מייל
                  </th>
                  <th className={classes.header} th scope="col">
                   טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                  תאריך
                  </th>
                  <th className={classes.header} th scope="col">
                   שעת התחלה
                  </th>
                  <th className={classes.header} th scope="col">
                  שעת סיום
                  </th>
                  <th className={classes.header} th scope="col">
                הערות
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.hall.map((x)=>(
                    <tr>
                      <td>{x.fullName}</td>
                      <td>{x.email}</td>
                      <td>{x.phone}</td>
                      <td>{new Date(x.start).toLocaleDateString("en-GB")}</td>
                      <td> {new Date(x.start).toLocaleTimeString('en-GB')}</td>
                      <td> {new Date(x.end).toLocaleTimeString('en-GB')}</td>
                      <td>{x.description}</td>
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


const ActionBar = ({ modal, toggleModal,toggleModalHelp, getTerm, hall,first, end, direction}) => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
       <div style={{ display: "none" }}>
       <ComponentToPrint ref={componentRef} hall={hall} first={first} end={end} />
       </div>
       <button className={classes.button} onClick={handlePrint}>  <FaIcons.FaFileDownload /></button>
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
    familyEvents: state.familyEvents };
};
export default connect(mapStateToProps, { toggleModal,toggleModalHelp })(ActionBar);
