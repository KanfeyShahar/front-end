import React,{useState} from "react";
import ButtonAdd from "./ButtonAdd";
import { connect } from "react-redux";
import AddProduct from "./AddProduct";
import { toggleModal,toggleModalHelp } from "../actions";
import Cart from "../pages/Cart/Cart";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import classes from "./button.module.css";
import CartButton from "../pages/Cart/Layout/CartButton";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpCart"
import * as BiIcons from "react-icons/bi";


const ActionBar = ({ modal, toggleModal,getTerm,toggleModalHelp}) => {
    const[cartIsShown, setCartIsShown] = useState(false)
    const showCartHandler =() => {
      setCartIsShown(true);
    }
  
    const hideCartHandle = () => {
      setCartIsShown(false);
    };
  
  return (
    <div>
        <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
      <div class="btn-group" role="group" aria-label="First group">
      <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={toggleModalHelp}/>
      </button>
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
      <ButtonAdd header="הוסף מוצר לא קיים">
        <AddProduct action="add" />
      </ButtonAdd>
      <button className={classes.button}>
        <IoIcons.IoMdAddCircle onClick={toggleModal} />
      </button>
     
        <CartButton onClick={showCartHandler}/>
       { cartIsShown  && <Cart onClose={hideCartHandle}/>} 
     
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
      </div>
    
  );
};
const mapStateToProps = (state) => {
  return { modal: state.modal,
    modalChange: state.modalChange };
};
export default connect(mapStateToProps, { toggleModal,toggleModalHelp })(ActionBar);
