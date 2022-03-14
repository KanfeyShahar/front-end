import React, { useRef, Component  } from "react";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import { toggleModal,toggleModalHelp } from "../actions";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import classes from "./button.module.css";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpDirection"



class ComponentToPrint extends Component  {
  constructor(props) {
    super(props);
    this.state={
      familyEvents:[...this.props.family],
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
        <h1>משפחות באירוע</h1>
        <h2>תאריך חלוקה {new Date(this.props.selected).toLocaleDateString("en-GB")}</h2>
        <br/>
        <br/>
        
        </div>
  <div style={{ maxWidth: "100%" }}>
 
  {this.props.family.filter((y)=>y.direction==="מסלול 1").length>0 && 
  <div><h1>מסלול 1</h1>
  <br/>
  <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 1").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 1").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.remarks}</td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>}
        <br/>
        {this.props.family.filter((y)=>y.direction==="מסלול 2").length>0 &&
       ( <div><h1>מסלול 2</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 2").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 2").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.remarks}</td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 3").length>0 &&
       ( <div><h1>מסלול 3</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 3").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 3").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.remarks}</td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 4").length>0 &&
       ( <div><h1>מסלול 4</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 4").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 4").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.remarks}</td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                      
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 5").length>0 &&
       ( <div><h1>מסלול 5</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 5").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 5").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.remarks}</td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                     
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 6").length>0 &&
       ( <div><h1>מסלול 6</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 6").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 6").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.remarks}</td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 7").length>0 &&
       ( <div><h1>מסלול 7</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 7").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 7").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.remarks}</td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 8").length>0 &&
       ( <div><h1>מסלול 8</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 8").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 8").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.remarks}</td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 9").length>0 &&
       ( <div><h1>מסלול 9</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 9").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 9").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td>{x.remarks}</td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 10").length>0 &&
       ( <div><h1>מסלול 10</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 10").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 10").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td></td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 11").length>0 &&
       ( <div><h1>מסלול 11</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 11").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 11").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td></td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="1מסלול 2").length>0 &&
       ( <div><h1>1מסלול 2</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 12").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "1מסלול 2").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td></td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 13").length>0 &&
       ( <div><h1>מסלול 13</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 13").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 13").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td></td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
        {this.props.family.filter((y)=>y.direction==="מסלול 14").length>0 &&
       ( <div><h1>מסלול 14</h1>
        <br/>
        <h2>מספר משפחות במסלול: {this.props.family.filter((y)=> y.direction === "מסלול 14").length}</h2>
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
                 סל
                  </th>
                  <th className={classes.header} th scope="col">
                   הערת נהג
                  </th>
                  <th className={classes.header} th scope="col">
                 נמסר
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.family.filter((y)=> y.direction === "מסלול 14").map((x)=>(
                    <tr>
                      <td>{x.firstName}</td>
                      <td>{x.lastName}</td>
                      <td>{x.city}</td>
                      <td>{x.address}</td>
                      <td>{x.phone}</td>
                      <td>{x.language}</td>
                      <td>{x.basket_type}</td>
                      <td></td>
                      {(x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" checked disabled></input></td> )||(!x.isDeliverd && <td><input class="form-check-input" type="checkbox" id="x.isDeliverd" value="option3" disabled></input></td> )}
                    
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div></div>)}
      </div>
   </div>
  
    
    );
  }
}


const ActionBar1 = ({ modal, toggleModal, getTerm, family,selected, type,toggleModalHelp, direction}) => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
       <div style={{ display: "none" }}>
       <ComponentToPrint ref={componentRef} family={family} selected={selected}  />
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
  return { modal: state.modal,
    familyEvents: state.familyEvents };
};
export default connect(mapStateToProps, { toggleModal,toggleModalHelp })(ActionBar1);
