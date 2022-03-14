import React, { useRef, Component  } from "react";
import ButtonAdd from "./ButtonAddDriverEvents";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import { toggleModal, updateRowListBasketProduct,addListBasket,toggleModalHelp } from "../actions";
import AddFamilyEvents from "./AddFamilyEvents";
import AddBasketEvents from './AddBasketEvents';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import classes from "./button.module.css";
import {getIndexByNameListProduct} from "../helper-functions/index"
import { render } from "@testing-library/react";
import classes1 from "./report.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpBasket"

class ComponentToPrint extends Component  {
  constructor(props) {
    super(props);
    this.state={
      basketEvents:[...this.props.basket],
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
        
        </div>
        <br/>
        <br/>
        <div style={{color:"black"}}>
        <h1>דוח סלי מזון</h1>
        <h2>תאריך חלוקה {new Date(this.props.selected).toLocaleDateString("en-GB")}</h2>
        <br/>
        <br/>
        <h2>מספר סלי מזון באירוע זה: {this.props.basket.length}</h2>
        </div>
  <div style={{ maxWidth: "100%" }}>
 
        <div className={classes1.tablewrapper}>
          <div className={classes1.direction}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className={classes.header} th scope="col">
                 מוצר
                  </th>
                  <th className={classes.header} th scope="col">
                    יחידת מידה
                  </th>
                  <th className={classes.header} th scope="col">
                   תאריך תפוגה
                  </th>
                  <th className={classes.header} th scope="col">
                  א
                  </th>
                  <th className={classes.header} th scope="col">
                  ב
                  </th>
                  <th className={classes.header} th scope="col">
                    ג
                  </th>
                  <th className={classes.header} th scope="col">
                    ד
                  </th>
                  <th className={classes.header} th scope="col">
                    ה
                  </th>
                  <th className={classes.header} th scope="col">
                 הערות
                  </th>
                  <th className={classes.header} th scope="col">
                סך הכל
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.props.basket.map((x)=>(
                    <tr>
                      <td>{x.nameProducts}</td>
                      <td>{x.size}</td>
                      <td>{new Date(x.endDate).toLocaleDateString("en-GB")}</td>
                      <td>{x.count_real1}</td>
                      <td>{x.count_real2}</td>
                      <td>{x.count_real3}</td>
                      <td>{x.count_real4}</td>
                      <td>{x.count_real5}</td>
                      <td></td>
                      <td>{x.sum}</td>
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

const ActionBar = ({ modal, toggleModal, getTerm ,selected,basket,toggleModalHelp}) => {
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  
 return  (
  
  <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group" role="group" aria-label="First group">
       <div style={{ display: "none" }}>
       <ComponentToPrint ref={componentRef} basket={basket} selected={selected} />
       </div>
       <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
       <button className={classes.button} onClick={handlePrint}>  <FaIcons.FaFileDownload /></button>
      

  <div>  <ButtonAdd header="בחר מוצרים לסל מזון">
  < AddBasketEvents date={selected}  />
</ButtonAdd>
<button className={classes.button}>
  <IoIcons.IoMdAddCircle onClick= {toggleModal}/>
</button></div></div>
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
    productsInventory:state.productsInventory,
    basketProducts:state.basketProducts};
};
export default connect(mapStateToProps, { toggleModal,toggleModalHelp,getIndexByNameListProduct, updateRowListBasketProduct,addListBasket })(ActionBar);
