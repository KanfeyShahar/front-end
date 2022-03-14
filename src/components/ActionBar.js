import React, { useRef, Component  } from "react";
import { useReactToPrint } from "react-to-print";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import { toggleModal,toggleModalHelp } from "../actions";
import AddFamily from "./AddFamily";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpFamily"
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
        {new Date().toLocaleDateString("en-GB")}   
        
        {new Date().toLocaleTimeString("en-GB")}
        </div>
        <br/>
        <br/>
        <div style={{color:"black"}}>
        <h1>דוח משפחות פעילות בעמותה</h1>
        <br/>
        </div>
  <div style={{ maxWidth: "100%" }}>
 
        <div className={classes1.tablewrapper}>
          <div className={classes1.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                   ראש משפחה
                  </th>
                  <th className={classes.header} th scope="col">
                    שם משפחה
                  </th>
                  <th className={classes.header} th scope="col">
                   עיר
                  </th>
                  <th className={classes.header} th scope="col">
                    כתובת
                  </th>
                  <th className={classes.header} th scope="col">
                   טלפון
                  </th>
                  <th className={classes.header} th scope="col">
                  שפה
                  </th>
                  <th className={classes.header} th scope="col">
                סל מזון
                  </th>
                  <th className={classes.header} th scope="col">
               ארוחה חמה
                  </th>
                  <th className={classes.header} th scope="col">
               הערות
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      {(x.food && <td><input class="form-check-input" type="checkbox" id="x.food" value="option3" checked disabled></input></td> )||(!x.food && <td><input class="form-check-input" type="checkbox" id="x.food" value="option3" disabled></input></td> )}
                      {(x.hot && <td><input class="form-check-input" type="checkbox" id="x.hot" value="option3" checked disabled></input></td> )||(!x.hot && <td><input class="form-check-input" type="checkbox" id="x.hot" value="option3" disabled></input></td> )}
                      <td>{x.remarks}</td>
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




const ActionBar = ({ modal, toggleModal, getTerm ,toggleModalHelp, family}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
    <div style={{ display: "none" }}>
       <ComponentToPrint ref={componentRef} family={family}  />
       </div>
       <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
       <button className={classes.button} onClick={handlePrint}>  <FaIcons.FaFileDownload /></button>
      <ButtonAdd header="הוספת משפחה">
        <AddFamily action="add" />
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
