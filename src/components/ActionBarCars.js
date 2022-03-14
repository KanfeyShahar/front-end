import React, { useRef, Component  } from "react";
import { useReactToPrint } from "react-to-print";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import { toggleModal,toggleModalHelp } from "../actions";
import AddCars from "./AddCars";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpCars"
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
        </div>
        <br/>
        <br/>
        <div style={{color:"black"}}>
        <h1> רכבים פעילים בעמותה</h1>
        <br/>
        </div>
  <div style={{ maxWidth: "100%" }}>
 
        <div className={classes1.tablewrapper}>
          <div className={classes1.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                מספר רכב
                  </th>
                  <th className={classes.header} th scope="col">
                  סוג רכב
                  </th>
                  <th className={classes.header} th scope="col">
                  נפח מנוע
                  </th>
                  <th className={classes.header} th scope="col">
                   שנת רכב
                  </th>
                  <th className={classes.header} th scope="col">
                  ק"מ בפועל
                  </th>
                  <th className={classes.header} th scope="col">
                  שווי בפועל
                  </th>
                  <th className={classes.header} th scope="col">
                  תוקף טסט
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.cars.map((x)=>(
                    <tr>
                      <td>{x.idCars}</td>
                      <td>{x.typeCar}</td>
                      <td>{x.engineCapacity}</td>
                      <td>{x.year}</td>
                      <td>{x.kilometer}</td>
                      <td>{x.cost}</td>
                      <td>{new Date(x.testValidity).toLocaleDateString("en-GB")}</td>
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

const ActionBar = ({ modal, toggleModal, getTerm,cars,toggleModalHelp }) => {
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
       <ComponentToPrint ref={componentRef} cars={cars} />
       </div>
       <button className={classes.button} onClick={handlePrint}>  <FaIcons.FaFileDownload /></button>
    
      <ButtonAdd header="הוספת רכב">
        <AddCars action="add" />
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
