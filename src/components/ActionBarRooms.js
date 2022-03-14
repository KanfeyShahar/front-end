import React from "react";
import ButtonAdd2 from "./AddEventCalender";
import { connect } from "react-redux";
import {toggleModalCalender, toggleModalHelp,updateRowResource } from "../actions";
import { getIndexByName } from "../helper-functions";
import RoomsAddNew from "./roomsAddNew";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import Swal from "sweetalert2";
import * as AiIcons from "react-icons/ai";
import classes from "./button.module.css";
import ButtonHelp from "./ButtonHelp";
import HelpEquipments from "./Help/HelpRooms"

const ActionBar = (props,{ modalCalender, toggleModalCalender, toggleModalHelp,getTerm ,modalHelp}) => {


  
 const handleClick = () => {
   let number=0;
    // const prodIdx = getIndexByName(this.props.cars, ChangeTypeCars);
    Swal.fire({
      title: "כתוב מספר חדר, מספרים מ-1 עד 14",
      input: "number",
      inputValue: number,
      confirmButtonText: "אישור",
      confirmButtonColor: "green",
      inputValidator: (value) => {
        if (value.length <= 0 || value>14 || value<1) {
          return "מספר חדר לא בטווח";
        }
      },
    }).then((result) => {
      console.log(result.value)
      const prodIdx =  props.resource.findIndex(arr => arr.id === parseInt(result.value));;
      console.log(prodIdx)
      Swal.fire({
        title: "הקלד שם חדר",
        input: "text",
        inputValue: number,
        confirmButtonText: "אישור",
        confirmButtonColor: "green",
        inputValidator: (value) => {
          if (value.length <= 0) {
            return "חייב שם חדר   ";
          }
        },
      }).then((result1)=>{
        if (
          result1.value 
        ) {
          console.log(result1.value)
          props.updateRowResource({
            id:props.resource[prodIdx].id,
            resourceId:props.resource[prodIdx].resourceId,
            resourceTitle: result1.value,
          });
        }
      })

    });
  };




  return (
    <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
     <div class="btn-group" role="group" aria-label="First group">
   
     <button className={classes.button}>
        <BiIcons.BiHelpCircle onClick={props.toggleModalHelp}/>
      </button>
      <ButtonAdd2 header="הוספת הזמנה חדשה">
        <RoomsAddNew  action="add" />
      </ButtonAdd2>
      <button className={classes.button}>
        <IoIcons.IoMdAddCircle onClick={props.toggleModalCalender} />
      </button>
      
      <ButtonHelp header="עזרה">
        <HelpEquipments action="add" />
      </ButtonHelp>
      <button className={classes.button}>
        <AiIcons.AiFillEdit onClick={()=>handleClick()}/>
      </button>
      </div>
      
    </div>
   
  );
};
const mapStateToProps = (state) => {
  return { modalCalender: state.modalCalender,
    modalHelp:state.modalHelp,
    resource:state.resource  };
};
export default connect(mapStateToProps, { toggleModalCalender,toggleModalHelp,updateRowResource })(ActionBar);
