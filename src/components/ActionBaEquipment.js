import React, { useRef, Component  } from "react";
import { useReactToPrint } from "react-to-print";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import { toggleModal, toggleModalHelp } from "../actions";
import AddEquipment from "./AddEquipment";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpEquipments"
import classes1 from "./report.module.css";

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
        <h1> דוח ציוד  </h1>
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
                  מרכז
                  </th>
                  <th className={classes.header} th scope="col">
                   כמות
                  </th>
                  <th className={classes.header} th scope="col">
                    הערות
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.equipment.map((x)=>(
                    <tr>
                      <td>{x.name_equipment}</td>
                      <td>{x.center}</td>
                      <td>{x.count}</td>
                      <td>{x.remark}</td>
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


const ActionBar = ({ modal, toggleModal, toggleModalHelp,getTerm ,modalHelp,equipment}) => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
     <div class="btn-group" role="group" aria-label="First group">
     <div style={{ display: "none" }}>
       <ComponentToPrint ref={componentRef} equipment={equipment} />
       </div>
       <button className={classes.button} onClick={handlePrint}>  <FaIcons.FaFileDownload /></button>
     <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonAdd header="הוספת ציוד">
        <AddEquipment action="add" />
      </ButtonAdd>
      <button className={classes.button}>
        <IoIcons.IoMdAddCircle onClick={toggleModal} />
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
    modalHelp:state.modalHelp };
};
export default connect(mapStateToProps, { toggleModal,toggleModalHelp })(ActionBar);
