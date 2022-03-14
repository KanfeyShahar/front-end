import React, { useRef, Component  } from "react";
import { useReactToPrint } from "react-to-print";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import { toggleModal,toggleModalHelp } from "../actions";
import AddInventory from "./AddInventory";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import classes from "./button.module.css";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpHistoryCounter"

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
        <h1>דוח מלאי</h1>
        <br/>
        תאריך התחלה {new Date(this.props.first).toLocaleDateString("en-GB")}
        <br/>
        תאריך סיום {new Date(this.props.end).toLocaleDateString("en-GB")}
        <br/>
        </div>
  <div style={{ maxWidth: "100%" }}>
 
        <div className={classes1.tablewrapper}>
          <div className={classes1.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                   שם מוצר
                  </th>
                  <th className={classes.header} th scope="col">
                    יחידות מידה
                  </th>
                  <th className={classes.header} th scope="col">
                   סוג
                  </th>
                  <th className={classes.header} th scope="col">
                    יצרן
                  </th>
                  <th className={classes.header} th scope="col">
                  כמות במלאי
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.inventory.map((x)=>(
                    <tr>
                      <td>{x.name}</td>
                      <td>{x.size}</td>
                      <td>{x.type}</td>
                      <td>{x.manufacture}</td>
                      <td>{x.price}</td>
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



const ActionBar = ({ modal, toggleModal, getTerm,inventory,first,end ,toggleModalHelp}) => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
     <div class="btn-group" role="group" aria-label="First group">
        
    <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
        <div style={{ display: "none" }}>
       <ComponentToPrint ref={componentRef} inventory={inventory} first={first} end={end}/>
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
export default connect(mapStateToProps, { toggleModal,toggleModalHelp })(ActionBar);
