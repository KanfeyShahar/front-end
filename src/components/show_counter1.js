import React, { useRef, Component  } from "react";
import ButtonAdd from "./ButtonAddDriverEvents";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import { toggleModal } from "../actions";
import AddDriverEvents from "./AddDriverEvents";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
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
        {new Date().toLocaleString("en-GB")}   
        {"  "}
        </div>
        <br/>
        <br/>
        <div style={{color:"black"}}>
        <h1>דוח ספירת מלאי</h1>
        <h2>תאריך {new Date(this.props.selected).toLocaleDateString("en-GB")} </h2>
        <br/>
        </div>
  <div style={{ maxWidth: "100%" }}>
 
        <div className={classes1.tablewrapper}>
          <div className={classes1.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                  מק"ט
                  </th>
                  <th className={classes.header} th scope="col">
                   שם מוצר
                  </th>
                  <th className={classes.header} th scope="col">
                  תאריך תפוגה
                  </th>
                  <th className={classes.header} th scope="col">
                  כמות במלאי
                  </th>
                  <th className={classes.header} th scope="col">
                  כמות בפועל
                  </th>
                  <th className={classes.header} th scope="col">
                הערות
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.counter.map((x)=>(
                    <tr>
                      <td>{x.code}</td>
                      <td>{x.nameProducts}</td>
                      <td>{x.endDate}</td>
                      <td>{x.count}</td>
                      <td>{x.count_actual}</td>
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


const Show_counter = ({ counter, selected, type,date }) => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <div >
    <div class="btn-group" role="group" aria-label="First group">
          <div style={{ display: "none" }}>
       <ComponentToPrint ref={componentRef} counter={counter} selected={selected} type={type}  />
       </div>
       <button className={classes.button} onClick={handlePrint}>  <FaIcons.FaFileDownload /></button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { modal: state.modal };
};
export default connect(mapStateToProps)(Show_counter);
